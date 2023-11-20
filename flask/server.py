from flask_cors import CORS
from flask import Flask, jsonify, request
import json
import os

UPLOAD_FOLDER = './data'

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
        filename = 'video.mp4'
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        return 'File uploaded successfully', 200

# Send data from JSON file to the client
@app.route('/api/urduTranscription', methods=['GET'])
def get_urduTranscription():
    filename='urduTranscription.json'
    with open(os.path.join(UPLOAD_FOLDER, filename), 'r', encoding='utf8') as f:
        data = json.load(f)
    return jsonify(data)

# Add new transcription to JSON files
@app.route('/add_transcription', methods=['POST'])
def add_transcription():
    filename='urduTranscription.json'
    data = request.get_json()

    # Load existing data
    with open(os.path.join(UPLOAD_FOLDER, filename), 'r', encoding='utf8') as json_file:
        transcriptions = json.load(json_file)

    # Add new transcription
    transcriptions.append(data)

    # Sort transcriptions by start time
    transcriptions.sort(key=lambda x: x['startTime'])

    # Write back to file
    with open(os.path.join(UPLOAD_FOLDER, filename), 'w', encoding='utf8') as json_file:
        json.dump(transcriptions, json_file, ensure_ascii=False)

    return 'Transcription added successfully', 200

# Delete transcription from JSON files
@app.route('/delete_transcription', methods=['POST'])
def delete_transcription():
    filename='urduTranscription.json'
    index = request.get_json().get('index')

    # Load existing data
    with open(os.path.join(UPLOAD_FOLDER, filename), 'r', encoding='utf8') as json_file:
        transcriptions = json.load(json_file)

    # Check if index is valid
    if index < 0 or index >= len(transcriptions):
        return 'Invalid index', 400

    # Remove transcription at index
    del transcriptions[index]

    # Write back to file
    with open(os.path.join(UPLOAD_FOLDER, filename), 'w', encoding='utf8') as json_file:
        json.dump(transcriptions, json_file, ensure_ascii=False)

    return 'Transcription deleted successfully', 200

# Update transcription in JSON files
@app.route('/update_transcription', methods=['POST'])
def update_transcription():
    filename='urduTranscription.json'
    data = request.get_json()
    index = data.get('index')
    new_transcription = data.get('transcription')
    speaker = data.get('speaker')
    startTime=data.get('startTime')
    endTime=data.get('endTime')

    # Load existing data
    with open(os.path.join(UPLOAD_FOLDER, filename), 'r', encoding='utf8') as json_file:
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
    with open(os.path.join(UPLOAD_FOLDER, filename), 'w', encoding='utf8') as json_file:
        json.dump(transcriptions, json_file, ensure_ascii=False)

    return 'Transcription updated successfully', 200

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True,port=8080)


