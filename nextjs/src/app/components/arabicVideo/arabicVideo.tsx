/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function urduTranscription() {
    const videoRef = useRef<HTMLVideoElement>(null);
    return (
        <div>
            <div className="ArabicVideo" >
                    {(videoRef ?
                        <video ref={videoRef} controls muted>
                            <source src='/video.mp4' type="video/mp4" />
                            Your browser does not support the video tag.
                        </video> :
                        <div>Loading.......</div>)}
                
            </div>
            <div  style={{display: 'flex'}}>
                <Link href='/urduvideo' style={{ flex: '1', textAlign: 'right' }}>
                    <div>Urdu Video</div>
                </Link>
                <Link href='/arabicVideo' style={{ flex: '1', textAlign: 'left' }}>
                    <div>   Arabic Video</div>
                </Link>
            </div>
        </div>

    )
}