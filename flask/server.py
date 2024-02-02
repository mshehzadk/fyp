from flask_cors import CORS
from flask import Flask, jsonify, request, send_file
import json
import os
from time import sleep
import DubLingoUtils as dl


spleeter_url='https://18b6-34-30-19-188.ngrok-free.app/'    # replace with your URL
whisperX_url='https://4cd1-34-135-217-204.ngrok-free.app/'  # replace with your URL
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

@app.route('/uploadUrduVideo', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part in the request', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        file.save(video_path)
        return 'File uploaded successfully', 200

# Send data from JSON file to the client
@app.route('/api/urduTranscription', methods=['GET'])
def get_urduTranscription():
    # filename='urduTranscription.json'
    filename=source_json_filename
    with open(output_dir+filename, 'r', encoding='utf8') as f:
        data = json.load(f)
    return jsonify(data)

# Add new transcription to JSON files
@app.route('/add_transcription', methods=['POST'])
def add_transcription():
    # filename='urduTranscription.json'
    filename=source_json_filename
    data = request.get_json()

    # Load existing data
    with open(output_dir+filename, 'r', encoding='utf8') as json_file:
        transcriptions = json.load(json_file)

    # Add new transcription
    transcriptions.append(data)

    # Sort transcriptions by start time
    transcriptions.sort(key=lambda x: x['startTime'])

    # Write back to file
    with open(output_dir+filename, 'w', encoding='utf8') as json_file:
        json.dump(transcriptions, json_file, ensure_ascii=False)

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

    return 'Transcription updated successfully', 200


# Send data from JSON file to the client
@app.route('/api/arabicTranslation', methods=['GET'])
def get_arabicTranslation():
    # filename='arabicTranslation.json'
    filename=target_json_filename
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

    # Add new Translation
    Translations.append(data)

    # Add new Transcription
    new_transcription = {'speaker': speaker, 'startTime': startTime, 'endTime': endTime, 'transcription': new_Translation}

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
        Translations[index]['translation'] = new_Translation


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

# Send Arabic video to the client
@app.route('/get_arabicVideo')
def get_video():
    # filename='arabicVideo.mp4'
    filename=output_video_path
    return send_file(filename, mimetype='video/mp4')

if __name__ == '__main__':
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    app.run(debug=True,port=8080)


