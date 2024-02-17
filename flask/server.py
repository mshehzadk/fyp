from flask_cors import CORS
from flask import Flask, jsonify, request, send_file
import json
import os
from time import sleep
import multiprocessing
import DubLingoUtils as dl


spleeter_url='https://e059-34-73-128-74.ngrok-free.app/'    # replace with your URL
whisperX_url='https://f8d0-34-125-230-202.ngrok-free.app/'  # replace with your URL
voice_clone_url=spleeter_url  # replace with your URL
output_dir='./data/'
# Replace this with the actual path to your video file
video_path = output_dir+'video.mp4'
target_json_filename='arabicTranslation.json'
source_json_filename='urduTranscription.json'
source_wav_vocals_filename='vocals.wav'
source_wav_music_filename='music.wav'
output_video_path=output_dir+'arabicVideo.mp4'
target_language='ar'

app = Flask(__name__) 
CORS(app)


@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'I am alive'})

@app.route('/api/home', methods=['GET'])
def home():
    return jsonify({'message': 'You are at home'})

def generateTranscription():
    if not dl.check_path_exist(output_dir+source_json_filename):
        args=[spleeter_url,whisperX_url,video_path,output_dir,source_json_filename,source_wav_music_filename,source_wav_vocals_filename]
        # separate music and vocals and transcribe vocals
        my_process = multiprocessing.Process(target=dl.process_urdu_video, args=args)
        # Start the process
        my_process.start()

@app.route('/uploadUrduVideo', methods=['POST'])
def upload_file():
    # #check if path exist
    # if dl.check_path_exist(output_dir):
    #     # Remove existing files from data directory
    #     dl.delete_all_files_in_folder(output_dir)
    # Create a new directory for the current session
    dl.create_folder(output_dir)
    # Check if the post request has the file part
    if 'file' not in request.files:
        return 'No file part in the request', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        file.save(video_path)
        generateTranscription()
        return 'File uploaded successfully', 200

# Check file existence and return response
@app.route('/api/fileExistence', methods=['POST'])
def checkFileExistence():
    data = request.json
    # Check if the file exists
    if 'filename' not in data:
        if dl.check_path_exist(output_video_path):
            return jsonify({'exists': '3'})
        elif dl.check_path_exist(output_dir+target_json_filename):
            return jsonify({'exists': '2'})
        elif dl.check_path_exist(output_dir+source_json_filename):
            return jsonify({'exists': '1'})
    
    filename = data['fileName']
    file_path =  output_d+filename
    
    if os.path.exists(file_path):
        return jsonify({'exists': True})
    else:
        return jsonify({'exists': False})
    

# Send data from JSON file to the client
@app.route('/api/urduTranscription', methods=['GET'])
def get_urduTranscription():
    # filename='urduTranscription.json'
    filename=source_json_filename
    # # Check if the file exists
    # if not dl.check_path_exist(output_dir+filename):
    #     dl.music_vocals_separation(spleeter_url,video_path,output_dir,source_wav_vocals_filename,source_wav_music_filename)
    #     dl.Transcription(whisperX_url,source_wav_vocals_filename,filename,output_dir)
    #
    while(not dl.check_path_exist(output_dir+filename)):{}
    with open(output_dir+filename, 'r', encoding='utf8') as f:
        data = json.load(f)
    return jsonify(data)

# Add new transcription to JSON files
@app.route('/add_transcription', methods=['POST'])
def add_transcription():
    # filename='urduTranscription.json'
    filename=source_json_filename
    filenameArabic=target_json_filename
    data = request.get_json()

    # Load existing data
    with open(output_dir+filename, 'r', encoding='utf8') as json_file:
        transcriptions = json.load(json_file)

    # get Max sentence_id
    max_id = dl.max_sentence_id(output_dir+filename)

    # Add to new data the max sentence_id
    data['sentence_id'] = max_id+1

    # Add new transcription
    transcriptions.append(data)

    # Sort transcriptions by start time
    transcriptions.sort(key=lambda x: x['startTime'])


    # Write back to file
    with open(output_dir+filename, 'w', encoding='utf8') as json_file:
        json.dump(transcriptions, json_file, ensure_ascii=False)

    # Check if transaltion exists
    if dl.check_path_exist(output_dir+filenameArabic):
        # Load existing data
        with open(output_dir+filenameArabic, 'r', encoding='utf8') as json_file:
            Translations = json.load(json_file)
        # Translate the new transcription
        translation = dl.translate_text(data['transcription'],target_language)
        # Make transaltion data
        dataA = {'speaker': data['speaker'],
                'startTime': data['startTime'],
                'endTime': data['endTime'],
                'translation': translation,
                'sentence_id': max_id+1}
        # Add new Translation
        Translations.append(dataA)
        # Sort Translations by start time
        Translations.sort(key=lambda x: x['startTime'])
        # Write back to file
        with open(output_dir+filenameArabic, 'w', encoding='utf8') as json_file:
            json.dump(Translations, json_file, ensure_ascii=False)

    return 'Transcription added successfully', 200

# Delete transcription from JSON files
@app.route('/delete_transcription', methods=['POST'])
def delete_transcription():
    # filename='urduTranscription.json'
    filename=source_json_filename
    index = request.get_json().get('index')

    # Load existing data
    with open(output_dir+filename, 'r', encoding='utf8') as json_file:
        transcriptions = json.load(json_file)

    # Check if index is valid
    if index < 0 or index >= len(transcriptions):
        return 'Invalid index', 400

    # Remove transcription at index
    del transcriptions[index]

    # Write back to file
    with open(output_dir+filename, 'w', encoding='utf8') as json_file:
        json.dump(transcriptions, json_file, ensure_ascii=False)

    # Delete translation at index if translation exists
    if dl.check_path_exist(output_dir+target_json_filename):
        # filename='arabicTranslation.json'
        filename=target_json_filename
        with open(output_dir+filename, 'r', encoding='utf8') as json_file:
            Translations = json.load(json_file)
        # Remove Translation at index
        del Translations[index]
        # Write back to file
        with open(output_dir+filename, 'w', encoding='utf8') as json_file:
            json.dump(Translations, json_file, ensure_ascii=False)

    return 'Transcription deleted successfully', 200

# Update transcription in JSON files
@app.route('/update_transcription', methods=['POST'])
def update_transcription():
    # filename='urduTranscription.json'
    filename=source_json_filename
    data = request.get_json()
    index = data.get('index')
    new_transcription = data.get('transcription')
    speaker = data.get('speaker')
    startTime=data.get('startTime')
    endTime=data.get('endTime')

    # Load existing data
    with open(output_dir+filename, 'r', encoding='utf8') as json_file:
        transcriptions = json.load(json_file)

    # Check if index is valid
    if index < 0 or index >= len(transcriptions):
        return 'Invalid index', 400

    # Update transcription at index
    if speaker:
        transcriptions[index]['speaker'] = speaker
    if startTime:
        transcriptions[index]['startTime'] = startTime
    if endTime:
        transcriptions[index]['endTime'] = endTime
    if new_transcription:
        transcriptions[index]['transcription'] = new_transcription



    # Sort transcriptions by start time
    transcriptions.sort(key=lambda x: x['startTime'])
    # Write back to file
    with open(output_dir+filename, 'w', encoding='utf8') as json_file:
        json.dump(transcriptions, json_file, ensure_ascii=False)

    # Update translation at index if translation exists
    if dl.check_path_exist(output_dir+target_json_filename):
        # filename='arabicTranslation.json'
        filename=target_json_filename
        with open(output_dir+filename, 'r', encoding='utf8') as json_file:
            Translations = json.load(json_file)
        # Update Translation at index
        if speaker:
            Translations[index]['speaker'] = speaker
        if startTime:
            Translations[index]['startTime'] = startTime
        if endTime:
            Translations[index]['endTime'] = endTime
        if new_transcription:
            Translations[index]['translation'] = dl.translate_text(new_transcription,target_language)
        # Sort Translations by start time
        Translations.sort(key=lambda x: x['startTime'])
        # Write back to file
        with open(output_dir+filename, 'w', encoding='utf8') as json_file:
            json.dump(Translations, json_file, ensure_ascii=False)

    return 'Transcription updated successfully', 200

# Generate Transaltion
@app.route('/generateTranslation',methods=['GET'])
def generate_arabicTranslation():
    if not dl.check_path_exist(output_dir+target_json_filename):
        args=[output_dir,source_json_filename,target_json_filename,target_language]
        print('Zahid')
        # separate music and vocals and transcribe vocals
        my_process = multiprocessing.Process(target=dl.translation, args=args)
        # Start the process
        my_process.start()
    return 'Success', 200

# Send data from JSON file to the client
@app.route('/api/arabicTranslation', methods=['GET'])
def get_arabicTranslation():
    # filename='arabicTranslation.json'
    filename=target_json_filename
    # Check if the file exists
    # if not dl.check_path_exist(output_dir+filename):
    #     dl.translation(output_dir,source_json_filename,target_json_filename,target_language)
    while(not dl.check_path_exist(output_dir+filename)):{}
    with open(output_dir+filename, 'r', encoding='utf8') as f:
        data = json.load(f)
    return jsonify(data)

# Add new Translation to JSON files
@app.route('/add_Translation', methods=['POST'])
def add_Translation():
    # filename='arabicTranslation.json'
    filename=target_json_filename
    # filenameUrdu='urduTranscription.json'
    filenameUrdu=source_json_filename
    data = request.get_json()
    new_Translation = data.get('translation')
    speaker = data.get('speaker')
    startTime=data.get('startTime')
    endTime=data.get('endTime')


    # Load existing data
    with open(output_dir+filename, 'r', encoding='utf8') as json_file:
        Translations = json.load(json_file)

    # Load existing data
    with open(output_dir+filenameUrdu, 'r', encoding='utf8') as json_file:
        Transcriptions = json.load(json_file)

    # get Max sentence_id
    max_id = dl.max_sentence_id(output_dir+filename)
    # Add to new data the max sentence_id
    data['sentence_id'] = max_id+1

    # Add new Translation
    Translations.append(data)

    # Translate the new translation
    new_Translation=dl.translate_text(new_Translation,target_language='en')
    # Add new Transcription
    new_transcription = {'speaker': speaker, 'startTime': startTime, 'endTime': endTime, 'transcription': new_Translation, 'sentence_id': max_id+1}

    Transcriptions.append(new_transcription)

    # Sort Translations by start time
    Translations.sort(key=lambda x: x['startTime'])

    # Sort Transcriptions by start time
    Transcriptions.sort(key=lambda x: x['startTime'])

    # Write back to file
    with open(output_dir+filename, 'w', encoding='utf8') as json_file:
        json.dump(Translations, json_file, ensure_ascii=False)

    # Write back to file
    with open(output_dir+filenameUrdu, 'w', encoding='utf8') as json_file:
        json.dump(Transcriptions, json_file, ensure_ascii=False)

    return 'Translation added successfully', 200

# Delete Translation from JSON files
@app.route('/delete_Translation', methods=['POST'])
def delete_Translation():
    # filename='arabicTranslation.json'
    filename=target_json_filename
    # filenameUrdu='urduTranscription.json'
    filenameUrdu=source_json_filename
    index = request.get_json().get('index')

    # Load existing data
    with open(output_dir+filename, 'r', encoding='utf8') as json_file:
        Translations = json.load(json_file)

    # Load existing data
    with open(output_dir+filenameUrdu, 'r', encoding='utf8') as json_file:
        Transcriptions = json.load(json_file)

    # Check if index is valid
    if index < 0 or (index >= len(Translations) and index >= len(Transcriptions)):
        return 'Invalid index', 400

    # Remove Translation at index
    del Translations[index]

    # Remove Transcription at index
    del Transcriptions[index]

    # Write back to file
    with open(output_dir+filename, 'w', encoding='utf8') as json_file:
        json.dump(Translations, json_file, ensure_ascii=False)

    # Write back to file
    with open(output_dir+filenameUrdu, 'w', encoding='utf8') as json_file:
        json.dump(Transcriptions, json_file, ensure_ascii=False)

    return 'Translation deleted successfully', 200

# Update Translation in JSON files
@app.route('/update_Translation', methods=['POST'])
def update_Translation():
    # filename='arabicTranslation.json'
    filename=target_json_filename
    # filenameUrdu='urduTranscription.json'
    filenameUrdu=source_json_filename
    data = request.get_json()
    index = data.get('index')
    new_Translation = data.get('translation')
    speaker = data.get('speaker')
    startTime=data.get('startTime')
    endTime=data.get('endTime')

    # Load existing data
    with open(output_dir+filename, 'r', encoding='utf8') as json_file:
        Translations = json.load(json_file)

    # Load existing data
    with open(output_dir+filenameUrdu, 'r', encoding='utf8') as json_file:
        Transcriptions = json.load(json_file)

    # Check if index is valid
    if index < 0 or index >= len(Translations):
        return 'Invalid index', 400

    # Update Translation at index
    if speaker:
        Translations[index]['speaker'] = speaker
        Transcriptions[index]['speaker'] = speaker
    if startTime:
        Translations[index]['startTime'] = startTime
        Transcriptions[index]['startTime'] = startTime
    if endTime:
        Translations[index]['endTime'] = endTime
        Transcriptions[index]['endTime'] = endTime
    if new_Translation:
        if Translations[index]['translation'] != new_Translation:
            Translations[index]['translation'] = new_Translation
            Transcriptions[index]['transcription'] = dl.translate_text(new_Translation,target_language='en')


    # Sort Translations by start time
    Translations.sort(key=lambda x: x['startTime'])

    # Sort Transcriptions by start time
    Transcriptions.sort(key=lambda x: x['startTime'])

    # Write back to file
    with open(output_dir+filename, 'w', encoding='utf8') as json_file:
        json.dump(Translations, json_file, ensure_ascii=False)

    # Write back to file
    with open(output_dir+filenameUrdu, 'w', encoding='utf8') as json_file:
        json.dump(Transcriptions, json_file, ensure_ascii=False)

    return 'Translation updated successfully', 200


# Generate Arabic Video
@app.route('/generateTargetVideo',methods=['GET'])
def generate_targetVideo():
    if not dl.check_path_exist(output_video_path):
        args=[voice_clone_url,target_json_filename,video_path,output_dir,output_video_path,source_wav_music_filename,source_wav_vocals_filename]
        # separate music and vocals and transcribe vocals
        my_process = multiprocessing.Process(target=dl.process_arabic_video, args=args)
        # Start the process
        my_process.start()
    return 'Success', 200
# Send Arabic video to the client
@app.route('/get_arabicVideo')
def get_video():
    # filename='arabicVideo.mp4'
    filename=output_video_path
    # # Check if the file exists
    # if not dl.check_path_exist(filename):
    #     dl.get_speaker_wise_audio(output_dir+source_wav_vocals_filename,output_dir+target_json_filename,output_dir)
    #     dl.generate_and_save_audio(output_dir+target_json_filename,output_dir,voice_clone_url)
    #     dl.combined_audio_music(output_dir+target_json_filename,output_dir+source_wav_music_filename,output_dir)
    #     dl.replace_audio(video_path, output_dir+source_wav_music_filename, output_video_path)
    while(not dl.check_path_exist(filename)):{}
    return send_file(filename, mimetype='video/mp4')

if __name__ == '__main__':
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    app.run(debug=True,port=8080)


