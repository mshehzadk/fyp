/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Urdutranscriptionlist from "../urduTranscription/urduTranscriptionList";
import Link from "next/link";

export default function arabicTranslation() {
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
            <div className="Transcription Translation" style={{ display: 'flex' }}>
                <div className="Transcription" style={{ flex: '1', textAlign: 'right' }}>
                    <Urdutranscriptionlist />
                </div>
                <div className="Translation" style={{ flex: '1', textAlign: 'right' }}>
                    <Urdutranscriptionlist />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <Link href='/urduTranscription' style={{ flex: '1', textAlign: 'right' }}>
                    <div>Urdu Transcription</div>
                </Link>
                {data && 
                <Link href='/arabicVideo' style={{ flex: '1', textAlign: 'left' }}>
                    <div>Arabic Video</div>
                </Link>
                }
            </div>
        </div>

    )
}