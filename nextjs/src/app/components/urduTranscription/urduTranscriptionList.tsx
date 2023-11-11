/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function urduTranscriptionList() {
    const [transcription, setTranscription] = useState<JSON>();
    try {
        useEffect(() => {
            fetch('http://localhost:8080/api/urduTranscription').then((response) => {
                response.json().then((data) => {
                    setTranscription(data);
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
        <div>
            {transcription && Array.isArray(transcription) && transcription.map((item: any, index: number) => (
                <div key={index} className="p-4 border border-slate-300 my-3 flex gap-2">
                    <div>
                        <div className="flex">
                            <div className="font-bold text-xl" >{item.speaker}</div>
                            <div className="m-2" >{item.startTime}</div>
                            <div className="m-2" >{item.startTime}</div>
                        </div>
                        <div className="flex">
                            <div>{item.transcription}</div>
                        </div>
                    </div>
                    <div className="flex">
                        <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2">Edit</button>
                        <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2">Delete</button>
                    </div>
                </div>
            ))}
            {!transcription && <div>Loading......</div>}
        </div>


    )
}