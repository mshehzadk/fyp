/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Urdutranscriptionlist from "./urduTranscriptionList";
import Headertranscription from "./header";

export default function urduTranscription() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [transcription, setTranscription] = useState<JSON>();
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
    catch (error: any) {
        console.log(error);
    }

   function handleEdit() {
    console.log("Edit");
   }

    return (
        <div className="Transcription Video" style={{ display: 'flex' }}>
            <div className="Transcription" style={{ flex: '1', textAlign: 'right' }}>
                <Headertranscription />
                <Urdutranscriptionlist />
                <div>
                    {transcription && Array.isArray(transcription) && transcription.map((item: any, index: number) => (
                        <div key={index} className="p-4 border border-salte-300 my-3 flex justify-between gap-5">
                            <div>
                                <div className="flex justify-between">
                                    <input className="font-bold text-xl" value={item.speaker} onChange={handleEdit}></input>
                                    <input className="m-2" value={item.startTime}></input>
                                    <input className="m-2" value={item.endTime} ></input>
                                </div>
                                <div>
                                    <input value={item.transcription}></input>
                                </div>
                            </div>
                            <div>
                                <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2">Edit</button>
                                <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2">Delete</button>
                            </div>
                        </div>
                    ))}
                    {!transcription && <div>Loading......</div>}
                </div>

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