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
    const [dateFormat, setDateFormat] = useState(true);

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

    const saveEdit = async (event: any) => {
        event.preventDefault();
        if (speakerName === "" || startTime === "" || endTime === "" || transcription === "") {
            alert("Please fill all the fields");
            return;
        }
        // Check if the value is a valid time string
        const pattern = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;
        if (!pattern.test(startTime) || !pattern.test(endTime)) {
            alert("Please enter a valid time string in the format HH:MM:SS");
            return;
        }
        const response = await fetch('http://localhost:8080/update_transcription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                speaker: speakerName,
                startTime: startTime,
                endTime: endTime,
                transcription: transcription,
                index: editIndex
            })
        });


        fetch('http://localhost:8080/api/urduTranscription').then((response) => {
            response.json().then((data) => {
                setData(data);
            })
        })


        if (response.ok) {
            console.log('Data sent successfully');

            setAddTranscriptionModal(false);
            setDateFormat(true);
        } else {
            console.error('Error sending data');
        }


        setEditTrigger(false);
        setEditIndex(-1);
    }

    const DeleteTranscription = async (index: number) => {

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

    const SaveNew = async (event: any) => {
        event.preventDefault();
        if (speakerName === "" || startTime === "" || endTime === "" || transcription === "") {
            alert("Please fill all the fields");
            return;
        }
        // Check if the value is a valid time string
        const pattern = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;
        if (!pattern.test(startTime) || !pattern.test(endTime)) {
            alert("Please enter a valid time string in the format HH:MM:SS");
            return;
        }
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

        fetch('http://localhost:8080/api/urduTranscription').then((response) => {
            response.json().then((data) => {
                setData(data);
            })
        })


        if (response.ok) {
            console.log('Data sent successfully');

            setAddTranscriptionModal(false);
            setDateFormat(true);
        } else {
            console.error('Error sending data');
        }
    }

    const IgnoreChanges = () => {
        setAddTranscriptionModal(false);
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
            <>
            <div className="flex justify-between items-center bg-slate-800 px-4 py-2">
                <p className="text-white font-bold text-lg">Urdu Transcription</p>
                <button
                    className="bg-white px-4 py-2 flex items-center text-slate-800 hover:bg-slate-700 hover:text-white transition-all duration-300"
                    onClick={addTranscription}>
                    <span className="mr-2 text-blue-500 hover:underline cursor-pointer">
                    Add Transcription
                    </span>
                    <AiOutlinePlus size={18} />
                </button>
                </div>

                {
                    addTranscriptionModal &&
                    <div className="max-w-md mx-auto p-4 border rounded-md shadow-md bg-cyan-400">
                        <div className="mb-4">
                            <input
                                className="w-full px-4 py-2 border-b-2 border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 font-bold text-xl"
                                placeholder="Enter Speaker Name"
                                value={speakerName}
                                onChange={(e: any) => setSpeakerName(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="flex-grow">
                                <input
                                    className="w-full px-4 py-2 border-b-2 border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                    placeholder="Start Time 00:00:00"
                                    value={startTime}
                                    onChange={(e: any) => TimeUpdate(e, 's')}
                                />
                            </div>
                            <div className="flex-grow ml-2">
                                <input
                                    className="w-full px-4 py-2 border-b-2 border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                    placeholder="End Time 00:00:00"
                                    value={endTime}
                                    onChange={(e: any) => TimeUpdate(e, 'e')}
                                />
                            </div>
                        </div>
                        {!dateFormat && <div className="text-red-500 mb-4">Please enter a valid time string in the format HH:MM:SS</div>}
                        <div className="mb-4">
                            <textarea
                                className="w-full px-4 py-2 border-b-2 border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                placeholder="Transcription"
                                value={transcription}
                                onChange={(e: any) => setTranscription(e.target.value)}
                                rows={3}  // Set the number of visible rows
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md m-2 focus:outline-none hover:bg-blue-600" onClick={(e) => SaveNew(e)}>
                                Save
                            </button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-md m-2 focus:outline-none hover:bg-gray-600" onClick={IgnoreChanges}>
                                Ignore
                            </button>
                        </div>
                    </div>
                }
            </>

            {data && Array.isArray(data) && data.map((item: any, index: number) => (
                <div key={index} className="p-2 border border-slate-300 my-5 flex gap-2 bg-cyan-400">
                    {editTrigger && editIndex === index ?
                        <div className="w-full">
                            <div className="mb-4">
                                <input
                                    className="w-full px-4 py-2 border-b-2 border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 font-bold text-xl"
                                    value={speakerName}
                                    onChange={(e: any) => setSpeakerName(e.target.value)}
                                    placeholder="Enter Speaker Name"
                                />
                            </div>
                            <div className="flex items-center mb-4">
                                <div className="flex-grow">
                                    <input
                                        className="w-full px-4 py-2 border-b-2 border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                        value={startTime}
                                        onChange={(e: any) => TimeUpdate(e, 's')}
                                        placeholder="Start Time 00:00:00"
                                    />
                                </div>
                                <div className="flex-grow ml-2">
                                    <input
                                        className="w-full px-4 py-2 border-b-2 border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                        value={endTime}
                                        onChange={(e: any) => TimeUpdate(e, 'e')}
                                        placeholder="End Time 00:00:00"
                                    />
                                </div>
                            </div>
                            {!dateFormat && <div className="text-red-500 mb-4">Please enter a valid time string in the format HH:MM:SS</div>}
                            <div className="mb-4">
                                <textarea
                                    className="w-full px-4 py-2 border-b-2 border-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                                    placeholder="Transcription"
                                    value={transcription}
                                    onChange={(e: any) => setTranscription(e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </div>
                        :
                        <div onDoubleClick={() => editTheRow(item.speaker, item.startTime, item.endTime, item.transcription, index)}>
                            <div className="flex">
                                <div className="font-bold text-xl">{item.speaker}</div>
                                <div className="m-2">{item.startTime}</div>
                                <div className="m-2">{item.endTime}</div>
                            </div>
                            <div className="flex">
                                <div>{item.transcription}</div>
                            </div>
                        </div>
                    }
                    <div className="flex ml-auto">
                        {editTrigger && editIndex === index ?
                            <button
                                className="bg-red-800 text-white px-4 py-2 rounded-md m-2 hover:bg-slate-700 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
                                onClick={(e) => saveEdit(e)}
                            >
                                Save
                            </button>
                            :
                            <>
                                <button
                                    className="bg-slate-800 text-white px-4 py-2 rounded-md m-2 hover:bg-slate-700 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
                                    onClick={() => editTheRow(item.speaker, item.startTime, item.endTime, item.transcription, index)}
                                >
                                    Edit
                                </button>
                                {!editTrigger &&
                                    <button
                                        className="bg-slate-800 text-white px-4 py-2 rounded-md m-2 hover:bg-slate-700 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
                                        onClick={() => DeleteTranscription(index)}
                                    >
                                        Delete
                                    </button>}
                            </>
                        }
                    </div>
                </div>
                ))
            }




            {!data && <div>Loading......</div>}
        </div>


    )
}