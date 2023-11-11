/* eslint-disable react-hooks/rules-of-hooks */
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { set } from "mongoose";

export default function urduTranscriptionList() {
    const [data, setData] = useState<JSON>();
    const [editTrigger, setEditSpeaker] = useState(false);
    const [speakerName, setSpeakerName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [transcription, setTranscription] = useState("");
    const [index, setIndex] = useState(0);
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

    const handleEdit = (speaker: String,startTime:String, endTime: String, transcription: String, index: number ) => {
        setEditSpeaker(true);
    }
    return (
        <div>
            {data && Array.isArray(data) && data.map((item: any, index: number) => (
                <div key={index} className="p-4 border border-slate-300 my-5 flex gap-2">
                    <div>
                        <div className="flex">
                            <div className="font-bold text-xl">{item.speaker}</div>
                            <div className="m-2" >{item.startTime}</div>
                            <div className="m-2" >{item.startTime}</div>
                        </div>
                        <div className="flex">
                            <div>{item.transcription}</div>
                        </div>
                    </div>
                    <div className="flex">
                        <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2"
                         onClick={() => handleEdit(item.speaker,item.startTime,item.endTime,item.transcription,index)}
                         >Edit</button>
                        <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2">Delete</button>
                    </div>
                </div>
            ))}
            {!data && <div>Loading......</div>}
        </div>


    )
}