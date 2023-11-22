/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

export default function arabicTranslation() {
    const [data, setData] = useState<JSON>();
    const [editTrigger, setEditTrigger] = useState(false);
    const [addTranslationModal, setAddTranslationModal] = useState(false);
    const [speakerName, setSpeakerName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [translation, setTranslation] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const [dateFormat, setDateFormat] = useState(true);

    try {
        useEffect(() => {
            fetch('http://localhost:8080/api/arabicTranslation').then((response) => {
                response.json().then((data) => {
                    setData(data);
                })
            })

        }, []);
    }
    catch (error: any) {
        console.log(error);
    }

    const editTheRow = (speaker: String, startTime: String, endTime: String, Translation: String, index: number) => {
        setAddTranslationModal(false);
        setSpeakerName(speaker.toString());
        setStartTime(startTime.toString());
        setEndTime(endTime.toString());
        setTranslation(Translation.toString());
        setEditIndex(index);
        setEditTrigger(true);

    }

    const saveEdit = async (event: any) => {
        event.preventDefault();
        if (speakerName === "" || startTime === "" || endTime === "" || translation === "") {
            alert("Please fill all the fields");
            return;
        }
        // Check if the value is a valid time string
        const pattern = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;
        if (!pattern.test(startTime) || !pattern.test(endTime)) {
            alert("Please enter a valid time string in the format HH:MM:SS");
            return;
        }
        const response = await fetch('http://localhost:8080/update_Translation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                speaker: speakerName,
                startTime: startTime,
                endTime: endTime,
                translation: translation,
                index: editIndex
            })
        });


        fetch('http://localhost:8080/api/arabicTranslation').then((response) => {
            response.json().then((data) => {
                setData(data);
            })
        })


        if (response.ok) {
            console.log('Data sent successfully');

            setAddTranslationModal(false);
            setDateFormat(true);
        } else {
            console.error('Error sending data');
        }


        setEditTrigger(false);
        setEditIndex(-1);
    }

    const DeleteTranslation = async (index: number) => {

        setEditIndex(index);
        const response = await fetch('http://localhost:8080/delete_translation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                index: index
            })
        });

        fetch('http://localhost:8080/api/arabicTranslation').then((response) => {
            response.json().then((data) => {
                setData(data);
            })
        })


        setEditIndex(-1);

    }

    const addTranslation = () => {
        setSpeakerName("");
        setStartTime("");
        setEndTime("");
        setTranslation("");
        setEditTrigger(false);
        setAddTranslationModal(true);
    }

    const SaveNew = async (event: any) => {
        event.preventDefault();
        if (speakerName === "" || startTime === "" || endTime === "" || translation === "") {
            alert("Please fill all the fields");
            return;
        }
        // Check if the value is a valid time string
        const pattern = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;
        if (!pattern.test(startTime) || !pattern.test(endTime)) {
            alert("Please enter a valid time string in the format HH:MM:SS");
            return;
        }
        const response = await fetch('http://localhost:8080/add_translation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                speaker: speakerName,
                startTime: startTime,
                endTime: endTime,
                translation: translation
            })
        });

        fetch('http://localhost:8080/api/arabicTranslation').then((response) => {
            response.json().then((data) => {
                setData(data);
            })
        })


        if (response.ok) {
            console.log('Data sent successfully');

            setAddTranslationModal(false);
            setDateFormat(true);
        } else {
            console.error('Error sending data');
        }
    }

    const IgnoreChanges = () => {
        setAddTranslationModal(false);
    }

    const TimeUpdate = (event: any, type: string) => {
        event.preventDefault();
        const value = event.target.value;
        const pattern = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;
        if (!pattern.test(value)) {
            setDateFormat(false);
        }
        else {
            setDateFormat(true);
        }

        if (type === 's') {
            setStartTime(event.target.value);
        }
        else if (type === 'e') {
            setEndTime(event.target.value);
        }
    }

    return (
        <div>
            <div>
                <>
                    <div className="flex justify-between items-center bg-slate-800 px-3 py-3">
                        <p className="text-white font-bold">
                            Arabic Translation
                        </p>
                        <button className="bg-white mx-5 flex" onClick={addTranslation}>
                            Add Translation <AiOutlinePlus className="ml-2" size={18} />
                        </button>
                    </div>
                    {
                        addTranslationModal &&
                        <div>
                            <div>
                                <div className="flex"></div>
                                <input className="font-bold text-xl" placeholder="Enter Speaker Name" value={speakerName} onChange={(e: any) => setSpeakerName(e.target.value)}></input>
                                <input className="m-2" placeholder="Start Time" value={startTime} onChange={(e: any) => TimeUpdate(e, 's')}></input>
                                <input className="m-2" placeholder="End Time" value={endTime} onChange={(e: any) => TimeUpdate(e, 'e')}></input>
                                {!dateFormat && <div className="text-red-500">Please enter a valid time string in the format HH:MM:SS</div>}
                            </div>
                            <div className="flex">
                                <input placeholder="Trnascription" value={translation} onChange={(e: any) => setTranslation(e.target.value)}></input>
                            </div>
                            <div>
                                <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2" onClick={(e) => SaveNew(e)}>
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
                                    <input className="m-2"
                                        value={startTime}
                                        onChange={(e: any) => TimeUpdate(e, 's')}>

                                    </input>
                                    <input className="m-2"
                                        value={endTime}
                                        onChange={(e: any) => TimeUpdate(e, 'e')}>

                                    </input>
                                    {!dateFormat && <div className="text-red-500">Please enter a valid time string in the format HH:MM:SS</div>}
                                </div>
                                <div className="flex">
                                    <input value={translation} onChange={(e: any) => setTranslation(e.target.value)}></input>
                                </div>
                            </div>
                            :
                            <div onDoubleClick={() => editTheRow(item.speaker, item.startTime, item.endTime, item.translation, index)}>
                                <div className="flex">
                                    <div className="font-bold text-xl">{item.speaker}</div>
                                    <div className="m-2" >{item.startTime}</div>
                                    <div className="m-2" >{item.endTime}</div>
                                </div>
                                <div className="flex">
                                    <div>{item.translation}</div>
                                </div>
                            </div>
                        }
                        <div className="flex">
                            {editTrigger && editIndex === index ?

                                <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2"
                                    onClick={(e) => saveEdit(e)}
                                >Save</button>
                                :
                                <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2"
                                    onClick={() => editTheRow(item.speaker, item.startTime, item.endTime, item.translation, index)}
                                >Edit</button>
                            }
                            {!(editTrigger) &&
                                <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2" onClick={() => DeleteTranslation(index)}>
                                    Delete
                                </button>}

                        </div>
                    </div>
                ))}

                {!data && <div>Loading......</div>}
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
        </div >
    )
}