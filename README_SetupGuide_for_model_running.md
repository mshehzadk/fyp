README.md for model setup

DubLingo: Running AI Models (Google Colab)
This guide explains how to run the pre-trained AI models for transcription, voice cloning, and source separation using Google Colab. These models power the core functionalities of DubLingo's backend.
Requirements:
A Google account
Internet access
Instructions:
Access Google Colab: Go to https://colab.research.google.com/ and sign in with your Google account (free or pro version works).


Open Notebooks: In Colab, open two separate notebooks:


Transcription Model: This notebook handles Urdu speech-to-text conversion.
XTTS (Voice Cloning & Source Separation): This notebook performs both voice cloning and audio source separation (vocals from background music).
Obtain ngrok Tokens (x2): Before running either notebook, you'll need two ngrok tokens. These tokens allow the backend to access the model endpoints running in Colab. Follow these steps:


Visit https://ngrok.com/ and create a free account (or use an existing one).
Download the ngrok client for your operating system.
In your terminal, run ngrok http 5000 twice to generate two unique tunnel URLs (these will start with "https://..."). These are your ngrok tokens.
Run Notebooks and Restart:


For each notebook:
Open the notebook in Colab.
Run all code cells (usually by pressing "Shift + Enter" for all cells).
After running the first cell, click "Runtime" -> "Restart Runtime" to ensure proper setup.
XTTS Notebook:
In the XTTS notebook, you'll also need to agree to the terms and conditions of the TTS library before proceeding when you install the TTS library.
Get Inference Links: Once both notebooks have finished running all cells, you'll receive links for API inference endpoints. These are the URLs the backend will use to interact with the models.


Update Backend Code:


In your local project directory, navigate to the code -> flask -> server.py file.
Locate the variables whisper_url and spleeter_url.
Replace the default values of these variables with the respective inference links you obtained from the Colab notebooks (one URL for each variable).
Local Setup:


With the ngrok tokens integrated into server.py, you can now set up the entire DubLingo project on your local machine following the existing instructions (not covered in this specific guide).
Important Notes:
The provided instructions assume the notebook filenames are "Transcription Model" and "XTTS". If these differ, adjust the names accordingly.
ngrok tunnels might expire after a certain period or inactivity. You might need to regenerate tokens if the URLs become invalid.
This guide focuses on running models in Colab for development purposes. In production, a different approach for deploying and managing models might be used.
Additional Information:
Consider exploring alternative cloud platforms or containerization for model deployment in production environments.
