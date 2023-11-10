'use Client'
/* eslint-disable react-hooks/rules-of-hooks */
import { useRef } from "react";
import fs from 'fs';
import path from 'path';
import { NextRequest } from "next/server";

export default async function urduTranscription() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const getTranscription = async () => {
        // Fetch the JSON data from the Flask server
        const response = await fetch('http://localhost:5000/api/data');
        const data = await response.json();

        // Write the JSON data to a file in the public folder
        const filePath = path.join(process.cwd(), 'public', 'urduTranscription.json');
        fs.writeFileSync(filePath, JSON.stringify(data));
        console.log('Data written to file');
        console.log(data);
    }
    // Call the function to get the transcription data
    getTranscription();

    return (
        <div className="Transcription Video" style={{display:'flex'}}>
            <div className="Transcription" style={{flex:'1',textAlign: 'right'}}>
                <p>Zahid</p>

            </div>
            <div className="Video" style={{flex:'1',textAlign: 'right'}}>
                {( videoRef ? 
                <video ref={videoRef} controls muted>
                    <source src='/video.mp4' type="video/mp4" />
                    Your browser does not support the video tag.
                </video> :
                <div>Loading......</div>)}
            </div>
        </div>

    )
}