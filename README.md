# DubLingo: Automated Urdu to Arabic Dubbing

# Demo Video


# Note: This README have two parts
# First Part focus on Local Setup
# Second Part focus on Model Setup 

## README_SetupGuide_for_local_setup.md

DubLingo is a project that automates the dubbing of Urdu videos into Arabic, making content more accessible to Arabic audiences. It utilizes a Next.js frontend and a Flask backend powered by AI.

### Prerequisites

- Node.js and npm (or yarn) installed on your system (for Next.js frontend)
- Python 3.x installed on your system (for Flask backend)

### Setup

#### 1. Next.js Frontend (Windows)

Open a terminal window and navigate to the `nextjs` subfolder.

If it's your first time running the frontend, install dependencies by running:

```bash
npm install
```

or

```bash
yarn install
```

Start the development server to run the frontend:

```bash
npm run dev
```

This will start the server on port 5000 (`http://localhost:5000`) by default.

#### 2. Flask Backend (Windows)

Open another terminal window and navigate to the `flask` subfolder.

Create a virtual environment (recommended):

```bash
python -m venv venv
```

Replace `venv` with your desired virtual environment name. Activate the virtual environment:

```bash
source venv/Scripts/activate  # For Windows
```

Install dependencies listed in `requirements.txt`:

```bash
pip install -r requirements.txt
```

Run the backend server:

```bash
python server.py
```

This will start the server on port 8080 (`http://localhost:8080`) by default.

### Usage

1. Open `http://localhost:5000` in your web browser. This should display the DubLingo homepage.
2. If you have an existing account, log in. Otherwise, sign up for a new account.
3. After successful login, you'll be redirected to the homepage.
4. Click the "Try Now" button in the top right corner.
5. Select and upload your Urdu video file.
6. You can then navigate between the "Transcription", "Translation", and "Dubbed Video" pages to review and edit (if needed) the generated transcript, translation, and dubbed video, respectively.
7. Wait for the video processing to complete. The dubbed video will be displayed on the "Dubbed Video" page once ready.
8. You can then choose to view or download the dubbed video.

### Notes

- The provided port numbers (5000 for frontend and 8080 for backend) are defaults. These might be different in your setup. Refer to any console output for the actual ports used.
- This is a README for development purposes. In production, a different deployment approach like containerization or cloud platforms might be used.

### Additional Information

This guide is specific to Windows. For macOS or Linux setups, consult the relevant package managers and commands.

## README_SetupGuide_for_model_running.md

This guide explains how to run the pre-trained AI models for transcription, voice cloning, and source separation using Google Colab. These models power the core functionalities of DubLingo's backend.

### Requirements

- A Google account
- Internet access

### Instructions

#### Access Google Colab

Go to `https://colab.research.google.com/` and sign in with your Google account (free or pro version works).

#### Open Notebooks

In Colab, open two separate notebooks:

- **Transcription Model**: This notebook handles Urdu speech-to-text conversion.
- **XTTS (Voice Cloning & Source Separation)**: This notebook performs both voice cloning and audio source separation (vocals from background music).

#### Obtain ngrok Tokens (x2)

Before running either notebook, you'll need two ngrok tokens. These tokens allow the backend to access the model endpoints running in Colab. Follow these steps:

1. Visit `https://ngrok.com/` and create a free account (or use an existing one).
2. Download the ngrok client for your operating system.
3. In your terminal, run `ngrok http 5000` twice to generate two unique tunnel URLs (these will start with `"https://..."`). These are your ngrok tokens.

#### Run Notebooks and Restart

For each notebook:

1. Open the notebook in Colab.
2. Run all code cells (usually by pressing "Shift + Enter" for all cells).
3. After running the first cell, click "Runtime" -> "Restart Runtime" to ensure proper setup.

**XTTS Notebook**:
In the XTTS notebook, you'll also need to agree to the terms and conditions of the TTS library before proceeding when you install the TTS library.

#### Get Inference Links

Once both notebooks have finished running all cells, you'll receive links for API inference endpoints. These are the URLs the backend will use to interact with the models.

#### Update Backend Code

1. In your local project directory, navigate to the `code -> flask -> server.py` file.
2. Locate the variables `whisper_url` and `spleeter_url`.
3. Replace the default values of these variables with the respective inference links you obtained from the Colab notebooks (one URL for each variable).

#### Local Setup

With the ngrok tokens integrated into `server.py`, you can now set up the entire DubLingo project on your local machine following the existing instructions (not covered in this specific guide).

### Important Notes

- The provided instructions assume the notebook filenames are "Transcription Model" and "XTTS". If these differ, adjust the names accordingly.
- ngrok tunnels might expire after a certain period or inactivity. You might need to regenerate tokens if the URLs become invalid.
- This guide focuses on running models in Colab for development purposes. In production, a different approach for deploying and managing models might be used.

### Additional Information

Consider exploring alternative cloud platforms or containerization for model deployment in production environments.