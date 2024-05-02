DubLingo: Automated Urdu to Arabic Dubbing
This project automates the dubbing of Urdu videos into Arabic, making content more accessible to Arabic audiences. It utilizes a Next.js frontend and a Flask backend powered by AI.
Prerequisites:
Node.js and npm (or yarn) installed on your system (for Next.js frontend)
Python 3.x installed on your system (for Flask backend)
Setup:
1. Next.js Frontend (Windows):
Open a terminal window and navigate to the nextjs subfolder.
If it's your first time running the frontend, install dependencies by running:
Bash Command
npm install
(or yarn install)
Start the development server to run the frontend:
Bash Command
npm run dev
This will start the server on port 5000 (http://localhost:5000) by default.
2. Flask Backend (Windows):
Open another terminal window and navigate to the flask subfolder.
Create a virtual environment (recommended):
Bash Command
python -m venv venv
Replace venv with your desired virtual environment name. Activate the virtual environment:
Bash Command
source venv/Scripts/activate  # For Windows
Install dependencies listed in requirements.txt:
Bash Command
pip install -r requirements.txt
Run the backend server:
Bash Command
python server.py
This will start the server on port 8080 (http://localhost:8080) by default.
Usage:
Open http://localhost:5000 in your web browser. This should display the DubLingo homepage.
If you have an existing account, log in. Otherwise, sign up for a new account.
After successful login, you'll be redirected to the homepage.
Click the "Try Now" button in the top right corner.
Select and upload your Urdu video file.
You can then navigate between the "Transcription", "Translation", and "Dubbed Video" pages to review and edit (if needed) the generated transcript, translation, and dubbed video, respectively.
Wait for the video processing to complete. The dubbed video will be displayed on the "Dubbed Video" page once ready.
You can then choose to view or download the dubbed video.
Notes:
The provided port numbers (5000 for frontend and 8080 for backend) are defaults. These might be different in your setup. Refer to any console output for the actual ports used.
This is a README for development purposes. In production, a different deployment approach like containerization or cloud platforms might be used.
Additional Information:
This guide is specific to Windows. For macOS or Linux setups, consult the relevant package managers and commands.
