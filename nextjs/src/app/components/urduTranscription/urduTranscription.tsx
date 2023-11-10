/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";

export default function urduTranscription() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [transcription, setTranscription] = useState<string>('');
    try {
        useEffect(() => {
            fetch('http://localhost:8080/api/urduTranscription').then((response) => {
                response.json().then((data) => {
                    setTranscription(data);
                    console.log(data);
    
                })
            })
        
        }, []);
    }
    catch (error:any) {
        console.log(error);
    }



    return (
        <div className="Transcription Video" style={{ display: 'flex' }}>
            <div className="Transcription" style={{ flex: '1', textAlign: 'right' }}>
                <p>Zahid</p>

            </div>
            <div className="Video" style={{ flex: '1', textAlign: 'right' }}>
                {(videoRef ?
                    <video ref={videoRef} controls muted>
                        <source src='/video.mp4' type="video/mp4" />
                        Your browser does not support the video tag.
                    </video> :
                    <div>Loading......</div>)}
            </div>
        </div>

    )
}