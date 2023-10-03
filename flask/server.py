from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__) 
CORS(app)


@app.route('/', methods=['GET'])
def index():
    return jsonify({'message': 'I am alive'})

@app.route('/api/home', methods=['GET'])
def home():
    return jsonify({'message': 'You are at home'})

if __name__ == '__main__':
    app.run(debug=True,port=8080)