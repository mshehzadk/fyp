import Link from "next/link";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";


export default function Header() {
    const [addTranscriptionModal, setAddTranscriptionModal] = useState(false);
    const [speakerName, setSpeakerName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [transcription, setTranscription] = useState("");
    const addTranscription = () => {
        setAddTranscriptionModal(true);
    }

    const SaveChanges = () => {
        setAddTranscriptionModal(false);
    }
    return (
        <>
            <div className="flex justify-between items-center bg-slate-800 px-3 py-3">
                <p className="text-white font-bold">
                    Urdu Transcription
                </p>
                <button className="bg-white mx-5 flex" onClick={addTranscription}>
                    Add Transcription <AiOutlinePlus className="ml-2" size={18} />
                </button>
            </div>
            {
                addTranscriptionModal &&
                <div>
                    <div>
                        <div className="flex"></div>
                        <input className="font-bold text-xl" placeholder="Enter Speaker Name" value={speakerName} onChange={(e: any) => setSpeakerName(e.target.value)}></input>
                        <input className="m-2" placeholder="Start Time" value={startTime} onChange={(e: any) => setStartTime(e.target.value)}></input>
                        <input className="m-2" placeholder="End Time" value={endTime} onChange={(e: any) => setEndTime(e.target.value)}></input>
                    </div>
                    <div className="flex">
                        <input placeholder="Trnascription" value={transcription} onChange={(e: any) => setTranscription(e.target.value)}></input>
                    </div>
                    <div>
                        <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2" onClick={SaveChanges}>
                            Save
                        </button>
                    </div>
                </div>
            }
        </>
    )
}