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


if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True,port=8080)


