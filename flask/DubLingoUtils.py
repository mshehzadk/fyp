## Description: This file contains the utility functions for the DubLingo application.
import json
import wave
import os
import numpy as np
import requests
import base64
import io
import re
import shutil
from difflib import Differ
from pydub import AudioSegment
from googletrans import Translator
from moviepy.editor import VideoFileClip, AudioFileClip
import multiprocessing

# Function to separate the vocals and music from a video
def music_vocals_separation(url,video_path,output_dir,source_wav_vocals_filename,source_wav_music_filename):
    # Create a POST request to send the video file
    files = {'video': open(video_path, 'rb')}
    # Run the loop unitl the response is not correct or without errors
    succeed=False
    while not succeed:
        try:
            response = requests.post(url+'vocals_music_separation', files=files, timeout=100000)
            succeed=response.ok
            data = response.json()
            music_b64 = data['music']
            vocals_b64 = data['vocals']

            music_bytes = base64.b64decode(music_b64)
            vocals_bytes = base64.b64decode(vocals_b64)

            music_file = io.BytesIO(music_bytes)
            vocals_file = io.BytesIO(vocals_bytes)


            # Convert bytes to AudioSegment
            music_audio = AudioSegment.from_file(io.BytesIO(music_bytes))
            vocals_audio = AudioSegment.from_file(io.BytesIO(vocals_bytes))

            # Save AudioSegments as WAV files
            music_audio.export(output_dir+source_wav_music_filename, format='wav')
            vocals_audio.export(output_dir+source_wav_vocals_filename, format='wav')

            print('Audio tracks saved!')
        except requests.Timeout:
            print('The request timed out.')
        except requests.RequestException as e:
            print(f'An error occurred: {e}')

# Function to transcribe the vocals from a WAV file
def Transcription(url,source_wav_vocals_filename,source_json_filename,output_dir):

    def convert_response_to_json(response_content):
        # Extract the transcription content from the response
        transcription_content = json.loads(response_content)['result']

        # Remove the escape characters from the transcription string
        transcription_content = transcription_content.replace('\\n', '\n')

        # Split the content into individual lines
        if '{"transcription": "' in transcription_content:
            transcription_content = transcription_content.replace('{"transcription": "', '')
        lines = transcription_content.split('\n\n')

        # Initialize an empty list to store the formatted results
        results = []

        # Iterate through each line in the SRT content
        for line in lines:
            # Skip empty lines
            if not line:
                continue

            # Split the line into components using regex
            match = re.match(r'(\d+)\n(\d+:\d+:\d+,\d+) --> (\d+:\d+:\d+,\d+)\n\[(\w+_\d+)\]: (.+)', line)

            # If the regex matches, extract components
            if match:
                sequence, start_time, end_time, speaker, text = match.groups()

                # Format the result as a dictionary
                result_dict = {
                    'sentence_id': int(sequence),
                    'startTime': start_time,
                    'endTime': end_time,
                    'speaker': speaker,
                    'transcription': text
                }

                # Append the result to the list
                results.append(result_dict)

        return results



    def transcribe_audio(audio_file_path,url):
        url = url+"transcribe"

        # Create a dictionary to hold the file parameter
        files = {'audio': ('audio.wav', open(audio_file_path, 'rb'), 'audio/wav')}

        # run the loop until response is not postive and correct
        succeed=False
        while not succeed:
            try:
                response = requests.post(url, files=files, timeout=100000)
                succeed=True
                # Return the response
                return response
            except requests.Timeout:
                print('The request timed out.')
            except requests.RequestException as e:
                print(f'An error occurred: {e}')


    audio_file_path=output_dir+source_wav_vocals_filename
    response = transcribe_audio(audio_file_path,url)
    formatted_results = convert_response_to_json(response.text)
    with open(output_dir+source_json_filename, 'w', encoding='utf-8') as output_json_file:
        json.dump(formatted_results, output_json_file, ensure_ascii=False, indent=2)

    print('Transcription saved!')

# Function to translate the transcribed text
def translate_text(text, target_language):
        translator = Translator()
        translation = translator.translate(text, dest=target_language)
        return translation.text

# Function to translate the transcribed text
def translation(output_dir,source_json_filename,target_json_filename,target_language):
    def translate_text(text, target_language):
        translator = Translator()
        translation = translator.translate(text, dest=target_language)
        return translation.text

    def translate_json(input_json_path, output_json_path,target_langauge):
        with open(input_json_path, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)

        translated_data = []

        for sentence in data:
            translated_text = translate_text(sentence['transcription'],target_langauge)
            translated_sentence = {
                'speaker': sentence['speaker'],
                'startTime': sentence['startTime'],
                'endTime': sentence['endTime'],
                'translation': translated_text,
                'sentence_id': sentence['sentence_id']
            }
            translated_data.append(translated_sentence)

        with open(output_dir+target_json_filename, 'w', encoding='utf-8') as json_file:
            json.dump(translated_data, json_file, ensure_ascii=False, indent=2)


    translate_json(output_dir+source_json_filename, output_dir+target_json_filename,target_language)
    while not os.path.exists(output_dir+target_json_filename):
        translation(output_dir,source_json_filename,target_json_filename,target_language)

    print('Translation saved!')

# Function to get speaker-wise audio
def get_speaker_wise_audio(audio_file,json_file,output_dir):

  def time_in_milliSecond(time_str):
    hours, minutes, seconds_milliseconds = time_str.split(":")
    seconds, milliseconds = seconds_milliseconds.split(",")
    milliseconds=milliseconds[0]+milliseconds[1]
    total_milliseconds = int(hours) * 60 * 60 * 1000 + int(minutes) * 60 * 1000 + int(seconds) * 1000 + int(milliseconds)
    return total_milliseconds

  def split_audio_by_speaker(audio_file, json_file):
      """Splits an audio file into speaker-wise chunks based on a JSON file.

      Args:
          audio_file (str): Path to the audio file to split.
          json_file (str): Path to the JSON file containing speaker information.

      Returns:
          list: A list of speaker-wise audio chunks.
      """

      # Load the JSON file
      with open(json_file,encoding='utf8') as f:
          data = json.load(f)

      # Create a dictionary to store the audio chunks
      chunks = {}


      # Open the audio file
      wav = wave.open(audio_file, 'rb')
      # Iterate over the JSON data
      for entry in data:
          # Get the speaker ID and start/end times
          speaker_id = entry["speaker"]

          # # Read in MilliSeoncds
          frame_rate = wav.getframerate()

          # Convert start and end times from milliseconds to frames
          start_time_ms = int(time_in_milliSecond(entry["startTime"]))  # Example: start time in milliseconds
          end_time_ms = int(time_in_milliSecond(entry["endTime"]))    # Example: end time in milliseconds

          start_frame = int(start_time_ms / 1000 * frame_rate)
          end_frame = int(end_time_ms / 1000 * frame_rate)

          # Move the file pointer to the start frame
          wav.setpos(start_frame)

          # Read frames between start_frame and end_frame
          frames = wav.readframes(end_frame - start_frame)


          # Add the audio chunk to the dictionary
          if speaker_id not in chunks:
              chunks[speaker_id] = []
          chunks[speaker_id].append(frames)

      # Close the audio file
      wav.close()
      # Return the list of speaker-wise audio chunks
      return chunks


  chunks = split_audio_by_speaker(audio_file, json_file)

  # Print the speaker-wise audio chunks
  for speaker_id, frames in chunks.items():
      combined_frames = b"".join([chunk for chunk in frames])

      # Create the output file with speaker ID
      output = f"{output_dir}{speaker_id}.wav"

      # Open the original audio file to get parameters
      with wave.open(audio_file, "rb") as original_wav:
          params = original_wav.getparams()

      # Write the combined frames to the output file
      with wave.open(output, "wb") as out_wav:
          out_wav.setparams(params)
          out_wav.writeframes(combined_frames)

# Function to generate and save audio
def generate_and_save_audio(json_file,output_dir,url):
    def generate_audio(text, speaker_name, sentence_id,url,output_dir):
        with open(output_dir+speaker_name+'.wav', 'rb') as f:
            # Send the file
            # Data to be sent in the JSON format
            data = {"arabic_text": text}

            # Specify the Content-Type header as application/json
            headers = {"Content-Type": "application/json"}
            files = {'audio': f}
            # Run Loop until response is not correct
            succeed=False
            while not succeed:
                try:
                    response = requests.post(url+'CloneVoice', files=files, data=data, timeout=100000)
                    print(response)
                    audio_path = f"{output_dir}{speaker_name}_{sentence_id}.wav"
                    # Save the received video file
                    with open(audio_path, 'wb') as file:
                        file.write(response.content)
                    succeed=True
                except requests.Timeout:
                    print('The request timed out.')
                except requests.RequestException as e:
                    print(f'An error occurred: {e}')


    with open(json_file, 'r', encoding='utf8') as json_file:
        data = json.load(json_file)
    for entry in data:
        speaker_name = entry["speaker"]
        sentence_id = entry["sentence_id"]
        text = entry["translation"]

        # Generate audio for the current sentence
        # args = (text, speaker_name, sentence_id,url,output_dir)
        # my_process = multiprocessing.Process(target=generate_audio, args=args)
        # my_process.start()
        generate_audio(text, speaker_name, sentence_id,url,output_dir)


###########################################################################
# Otimizing the above function of clonig voices
def generated_voices(url,output_dir,target_json_filename):
    # make a request to the TTS service by sending the json file and get the audio files
    with open(output_dir+target_json_filename, 'r', encoding='utf8') as json_file:
        json_data=json.load(json_file)
        succeed=False
        while not succeed:
            try: 
                # Set headers (content-type: application/json)
                headers = {'Content-Type': 'application/json'}
                response = requests.post(url+'CloneVoices',json=json_data ,headers=headers, timeout=100000)
                print(response)
                data = response.json()

                with open(output_dir+target_json_filename, 'r', encoding='utf-8') as output_json_file:
                    dataEntries=json.load(output_json_file)

                    for entry in dataEntries:
                        speaker_name = entry["speaker"]
                        sentence_id = entry["sentence_id"]
                        audio_path = f"{output_dir}{speaker_name}_{sentence_id}.wav"
                        audio_name=f"{speaker_name}_{sentence_id}"
                        # Save the received video file
                        audio_b64 = data[audio_name]

                        audio_bytes = base64.b64decode(audio_b64)

                        # Convert bytes to AudioSegment
                        audio = AudioSegment.from_file(io.BytesIO(audio_bytes))
                        # Save AudioSegments as WAV files
                        audio.export(audio_path, format='wav')
                succeed=response.ok
            except requests.Timeout:
                print('The request timed out.')
            except requests.RequestException as e:
                print(f'An error occurred: {e}')
###########################################################################
# Function to merge audio files
def combined_audio_music(json_file,audio_file,output_dir):

    def overwrite_frames(original_wav_path, overlay_wav_path, start_time_mm, end_time_mm, output_path):
        # Load the original and overlay WAV files
        original_audio = AudioSegment.from_file(original_wav_path, format="wav")
        overlay_audio = AudioSegment.from_file(overlay_wav_path, format="wav")

        # Convert start and end times from minutes to milliseconds
        start_time_ms = int(start_time_mm)
        end_time_ms = int(end_time_mm)

        # Ensure the overlay audio duration is at least as long as the specified time range
        overlay_audio_time=end_time_mm-start_time_mm+50
        audio_time=len(overlay_audio)
        # Overlay time is great than 1 s in ms
        if audio_time>=overlay_audio_time and overlay_audio_time<=1000:
            overlay_audio = overlay_audio[:overlay_audio_time+150]
        # Check if the audio is longer than the maximum duration
        audio_duration_ms = len(overlay_audio)
        if abs(audio_duration_ms-overlay_audio_time)>1000:
            # Calculate the speed change factor
            speed_change = audio_duration_ms/overlay_audio_time
            speed_change=speed_change-0.1
            if speed_change>1.0:
                # Speed up the audio
                overlay_audio = overlay_audio.speedup(playback_speed=speed_change)
            # elif speed_change<1.0:
            #     # Slow down the audio
            #     overlay_audio = overlay_audio.slowdown(playback_speed=speed_change,crossfade=200)

        # Overwrite frames in the original audio with frames from the overlay audio
        combined_audio = original_audio.overlay(overlay_audio, position=start_time_ms)

        # Export the combined audio to a new file
        combined_audio.export(output_path, format="wav")

    def time_in_milliSecond(time_str):
        hours, minutes, seconds_milliseconds = time_str.split(":")
        seconds, milliseconds = seconds_milliseconds.split(",")
        milliseconds=milliseconds[0]+milliseconds[1]+milliseconds[2]
        total_milliseconds = int(hours) * 60 * 60 * 1000 + int(minutes) * 60 * 1000 + int(seconds) * 1000 + int(milliseconds)
        return total_milliseconds


    with open(json_file, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)


    # Iterate sentences
    for sentence in data:
        # Load sentence audio clip
        audio_name = f"{output_dir}{sentence['speaker']}_{sentence['sentence_id']}.wav"
        clip = wave.open(audio_name, "rb")

        # Convert timestamps to ms
        start = time_in_milliSecond(sentence["startTime"])
        end = time_in_milliSecond(sentence["endTime"])
        # if sentence["sentence_id"] != 1:
        #     start=start-50

        overwrite_frames(audio_file, audio_name, start, end, audio_file)

# Function to replace audio with generated audio
def replace_audio(input_video_path, audio_wav_path, output_video_path):
    # Load video clip
    video_clip = VideoFileClip(input_video_path)

    # Load audio clip
    audio_clip = AudioFileClip(audio_wav_path)

    # Replace video audio with the provided audio clip
    video_clip = video_clip.set_audio(audio_clip)

    # Write the result to the output file
    video_clip.write_videofile(output_video_path, codec="libx264", audio_codec="aac")

    # Close the clips
    video_clip.close()
    audio_clip.close()

# Function to check if a path exists
def check_path_exist(path):
    return os.path.exists(path)

# Function to delete all files in a folder
def delete_all_files_in_folder(folder_path):
    try:
        for file_name in os.listdir(folder_path):
            file_path = os.path.join(folder_path, file_name)
            if os.path.isfile(file_path):
                os.remove(file_path)
                print(f"File {file_path} deleted successfully.")
        os.rmdir(folder_path)
        print("All files deleted in the folder.")
    except FileNotFoundError:
        print(f"Folder {folder_path} not found.")
    except Exception as e:
        print(f"Error deleting files in folder {folder_path}: {e}")

# Function to delete a file
def delete_file(file_path):
    try:
        os.remove(file_path)
        print(f"File {file_path} deleted successfully.")
    except FileNotFoundError:
        print(f"File {file_path} not found.")
    except Exception as e:
        print(f"Error deleting file {file_path}: {e}")

# Function to create a folder
def create_folder(folder_path):
    try:
        os.makedirs(folder_path)
        print(f"Folder {folder_path} created successfully.")
    except FileExistsError:
        print(f"Folder {folder_path} already exists.")
    except Exception as e:
        print(f"Error creating folder {folder_path}: {e}")

# Function to replace audio with generated audio
def replace_audio(input_video_path, audio_wav_path, output_video_path):
    # Load video clip
    video_clip = VideoFileClip(input_video_path)

    # Load audio clip
    audio_clip = AudioFileClip(audio_wav_path)

    # Replace video audio with the provided audio clip
    video_clip = video_clip.set_audio(audio_clip)

    # Write the result to the output file
    video_clip.write_videofile(output_video_path, codec="libx264", audio_codec="aac")

    # Close the clips
    video_clip.close()
    audio_clip.close()

# Function to max sentence id
def max_sentence_id(json_file):
    with open(json_file, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
    max_id = 0
    for entry in data:
        if entry["sentence_id"] > max_id:
            max_id = entry["sentence_id"]
    return max_id

# Function to make copy of music file
def copy_music_file(music_file_path, output_dir):
    if not os.path.exists(output_dir+'musicCopy.wav'):
        try:
            # Load audio clip
            audio_clip = AudioFileClip(output_dir+music_file_path)
            # Write the result to the output file
            audio_clip.write_audiofile(output_dir+"musicCopy.wav")
            # Close the clips
            audio_clip.close()
        except Exception as e:
            print(f"Error copying music file: {e}")
    else:
        try:
            # Load audio clip
            audio_clip = AudioFileClip(output_dir+"musicCopy.wav")
            # Write the result to the output file
            audio_clip.write_audiofile(output_dir+music_file_path)
            # Close the clips
            audio_clip.close()
        except Exception as e:
            print(f"Error copying music file: {e}")

# Function to make copy of json file
def copy_json_file(json_file_path, copy_json_file_path):
    try:
        shutil.copy(json_file_path, copy_json_file_path)
        print(f"File {json_file_path} copied successfully.")
    except FileNotFoundError:
        print(f"File {json_file_path} not found.")
    except Exception as e:
        print(f"Error copying file {json_file_path}: {e}")

# Function to compare JSON files
def compare_json_files(original_file, copy_file):
    with open(original_file, 'r', encoding='utf-8') as f1, open(copy_file, 'r', encoding='utf-8') as f2:
        original_data = json.load(f1)
        copy_data = json.load(f2)

    # Compare the contents
    d = Differ()
    for i, (orig_item, copy_item) in enumerate(zip(original_data, copy_data), start=1):
        orig_json = json.dumps(orig_item, indent=4, sort_keys=True)
        copy_json = json.dumps(copy_item, indent=4, sort_keys=True)
        diff = list(d.compare(orig_json.splitlines(), copy_json.splitlines()))
        if any(line.startswith('-') or line.startswith('+') for line in diff):
            print("Differences found:")
            return True
    return False

# Function to delete unwanted files
def delete_all_generated_files(directory, exceptions):    
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if filename.endswith(".wav") and filename not in exceptions:
            os.remove(filepath)
        elif filename == "arabicVideo.mp4":
            os.remove(filepath)

def process_urdu_video(spleeter_url,whisperX_url,video_path,output_dir,filename,source_wav_music_filename,source_wav_vocals_filename):
    music_vocals_separation(spleeter_url,video_path,output_dir,source_wav_vocals_filename,source_wav_music_filename)
    Transcription(whisperX_url,source_wav_vocals_filename,filename,output_dir)


def process_arabic_video(voice_clone_url,target_json_filename,video_path,output_dir,output_video_path,source_wav_music_filename,source_wav_vocals_filename,copy_json_file_path):
    # get_speaker_wise_audio(output_dir+source_wav_vocals_filename,output_dir+target_json_filename,output_dir)
    # generate_and_save_audio(output_dir+target_json_filename,output_dir,voice_clone_url)
    copy_music_file(source_wav_music_filename, output_dir)
    # generated_voices(voice_clone_url,output_dir,target_json_filename)
    combined_audio_music(output_dir+target_json_filename,output_dir+source_wav_music_filename,output_dir)
    replace_audio(video_path, output_dir+source_wav_music_filename, output_video_path)
    if check_path_exist(output_dir+copy_json_file_path):
        delete_file(output_dir+copy_json_file_path)
    copy_json_file(output_dir+target_json_filename, output_dir+copy_json_file_path)
    print("Process Completed")