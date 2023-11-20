/* eslint-disable react-hooks/rules-of-hooks */
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { set } from "mongoose";
import { AiOutlinePlus } from "react-icons/ai";


export default function urduTranscriptionList() {
    const [data, setData] = useState<JSON>();
    const [editTrigger, setEditTrigger] = useState(false);
    const [addTranscriptionModal, setAddTranscriptionModal] = useState(false);
    const [speakerName, setSpeakerName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [transcription, setTranscription] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
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

    const editTheRow = (speaker: String, startTime: String, endTime: String, transcription: String, index: number) => {
        setAddTranscriptionModal(false);
        setSpeakerName(speaker.toString());
        setStartTime(startTime.toString());
        setEndTime(endTime.toString());
        setTranscription(transcription.toString());
        setEditIndex(index);
        setEditTrigger(true);

    }

    const saveEdit = () => {
        setEditTrigger(false);
        setEditIndex(-1);
    }
    
    const DeleteTranscription = async (index:number) => {

        setEditIndex(index);
        const response = await fetch('http://localhost:8080/delete_transcription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                index: index
            })
        });
        setData(undefined);

        fetch('http://localhost:8080/api/urduTranscription').then((response) => {
                response.json().then((data) => {
                    setData(data);
                })
            })


        setEditIndex(-1);
    
    }

    const addTranscription = () => {
        setSpeakerName("");
        setStartTime("");
        setEndTime("");
        setTranscription("");
        setEditTrigger(false);
        setAddTranscriptionModal(true);
    }

    const SaveChanges = async (event : any) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8080/add_transcription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                speaker: speakerName,
                startTime: startTime,
                endTime: endTime,
                transcription: transcription
            })
        });

        setData(undefined);

        fetch('http://localhost:8080/api/urduTranscription').then((response) => {
            response.json().then((data) => {
                setData(data);
            })
        })


        if (response.ok) {
            console.log('Data sent successfully');

            setAddTranscriptionModal(false);
        } else {
            console.error('Error sending data');
        }
    }

    const IgnoreChanges = () => {
        setAddTranscriptionModal(false);
    }


    return (
        <div>
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
                            <input className="font-bold text-xl" placeholder="Enter Speaker Name" value={speakerName} onChange={(e: any) => setSpeakerName(e.target.value)} required></input>
                            <input className="m-2" type="time" placeholder="Start Time" value={startTime} onChange={(e: any) => setStartTime(e.target.value)} required></input>
                            <input className="m-2" placeholder="End Time" value={endTime} onChange={(e: any) => setEndTime(e.target.value)} required></input>
                        </div>
                        <div className="flex">
                            <input placeholder="Trnascription" value={transcription} onChange={(e: any) => setTranscription(e.target.value)}></input>
                        </div>
                        <div>
                            <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2" onClick={(e) => SaveChanges(e)}>
                                Save
                            </button>
                            <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2" onClick={IgnoreChanges}>
                                Ingore
                            </button>
                        </div>
                    </div>
                }
            </>

            {data && Array.isArray(data) && data.map((item: any, index: number) => (
                <div key={index} className="p-4 border border-slate-300 my-5 flex gap-2">
                    {editTrigger && editIndex === index ?
                        <div>
                            <div>
                                <div className="flex"></div>
                                <input className="font-bold text-xl" value={speakerName} onChange={(e: any) => setSpeakerName(e.target.value)}></input>
                                <input className="m-2" value={startTime} onChange={(e: any) => setStartTime(e.target.value)}></input>
                                <input className="m-2" value={endTime} onChange={(e: any) => setEndTime(e.target.value)}></input>
                            </div>
                            <div className="flex">
                                <input value={transcription} onChange={(e: any) => setTranscription(e.target.value)}></input>
                            </div>
                        </div>
                        :
                        <div onDoubleClick={() => editTheRow(item.speaker, item.startTime, item.endTime, item.transcription, index)}>
                            <div className="flex">
                                <div className="font-bold text-xl">{item.speaker}</div>
                                <div className="m-2" >{item.startTime}</div>
                                <div className="m-2" >{item.endTime}</div>
                            </div>
                            <div className="flex">
                                <div>{item.transcription}</div>
                            </div>
                        </div>
                    }
                    <div className="flex">
                        {editTrigger && editIndex === index ?

                            <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2"
                                onClick={() => saveEdit()}
                            >Save</button>
                            :
                            <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2"
                                onClick={() => editTheRow(item.speaker, item.startTime, item.endTime, item.transcription, index)}
                            >Edit</button>
                        }
                        {!(editTrigger) && 
                        <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2" onClick={()=> DeleteTranscription(index)}>
                            Delete
                        </button>}

                    </div>
                </div>
            ))}

            {!data && <div>Loading......</div>}
        </div>


    )
}