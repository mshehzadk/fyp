/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Urdutranscriptionlist from "./urduTranscriptionList";
import Link from "next/link";

export default function urduTranscription() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [data, setData] = useState<any>(null);

    try {
        useEffect(() => {
            fetch('http://localhost:8080/api/urduTranscription').then((response) => {
                response.json().then((data) => {
                    setData(data);
                })
            })

        }, []);
    }
    catch (error: any) {
        console.log(error);
    }

    return (
        <div>
            <div className="Transcription Video" style={{ display: 'flex' }}>
                <div className="Transcription" style={{ flex: '1', textAlign: 'right' }}>
                    <Urdutranscriptionlist />
                </div>
                <div className="Video" style={{ flex: '1', textAlign: 'right' }}>
                    {(videoRef ?
                        <video ref={videoRef} controls muted>
                            <source src='/video.mp4' type="video/mp4" />
                            Your browser does not support the video tag.
                        </video> :
                        <div>Loading.......</div>)}
                </div>
            </div>
            <div  style={{display: 'flex'}}>
                <Link href='/urduvideo' style={{ flex: '1', textAlign: 'right' }}>
                    <div>Urdu Video</div>
                </Link>
                {data && 
                <Link href='/arabicTranslation' style={{ flex: '1', textAlign: 'left' }}>
                    <div>Arabic Translation</div>
                </Link>
                }
            </div>
        </div>

    )
}