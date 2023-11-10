'use Client'
/* eslint-disable react-hooks/rules-of-hooks */
import { useRef } from "react";

export default function urduTranscription() {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="Transcription Video" style={{display:'flex'}}>
            <div className="Transcription" style={{flex:'1',textAlign: 'right'}}>
                <div>
                    <button className="btn">Click Me</button>
                </div>
                <div className="Transcriptions">

                </div>
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