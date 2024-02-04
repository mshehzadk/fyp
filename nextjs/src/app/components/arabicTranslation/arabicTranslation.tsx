/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function ArabicTranslation() {
    const [urduTranscription, setUrduTranscription] = useState<JSON>();
    const [data, setData] = useState<JSON>();
    const [editTrigger, setEditTrigger] = useState(false);
    const [addTranslationModal, setAddTranslationModal] = useState(false);
    const [speakerName, setSpeakerName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [translation, setTranslation] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const [dateFormat, setDateFormat] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const transcriptionRef = useRef<HTMLDivElement>(null);
    const translationRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (containerRef.current && transcriptionRef.current && translationRef.current) {
            const scrollLeft = containerRef.current.scrollLeft;
            transcriptionRef.current.scrollLeft = scrollLeft;
            translationRef.current.scrollLeft = scrollLeft;
        }
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseArabic = await fetch('http://localhost:8080/api/arabicTranslation');
                const dataArabic = await responseArabic.json();
                setData(dataArabic);

                const responseUrdu = await fetch('http://localhost:8080/api/urduTranscription');
                const dataUrdu = await responseUrdu.json();
                setUrduTranscription(dataUrdu);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const editTheRow = (speaker: string, startTime: string, endTime: string, Translation: string, index: number) => {
        setAddTranslationModal(false);
        setSpeakerName(speaker.toString());
        setStartTime(startTime.toString());
        setEndTime(endTime.toString());
        setTranslation(Translation.toString());
        setEditIndex(index);
        setEditTrigger(true);
    };

    const saveEdit = async (event: any) => {
        event.preventDefault();
        if (speakerName === "" || startTime === "" || endTime === "" || translation === "") {
            alert("Please fill all the fields");
            return;
        }
        // Check if the value is a valid time string
        const pattern = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9],[0-9][0-9][0-9]$/;
        if (!pattern.test(startTime) || !pattern.test(endTime)) {
            alert("Please enter a valid time string in the format HH:MM:SS,MSS");
            return;
        }

        try {
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

            const responseArabic = await fetch('http://localhost:8080/api/arabicTranslation');
            const dataArabic = await responseArabic.json();
            setData(dataArabic);

            const responseUrdu = await fetch('http://localhost:8080/api/urduTranscription');
            const dataUrdu = await responseUrdu.json();
            setUrduTranscription(dataUrdu);

            if (response.ok) {
                console.log('Data sent successfully');
                setAddTranslationModal(false);
                setDateFormat(true);
            } else {
                console.error('Error sending data');
            }

            setEditTrigger(false);
            setEditIndex(-1);
        } catch (error) {
            console.error('Error updating translation:', error);
        }
    };

    const DeleteTranslation = async (index: number) => {
        setEditIndex(index);
        try {
            const response = await fetch('http://localhost:8080/delete_Translation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    index: index
                })
            });

            const responseArabic = await fetch('http://localhost:8080/api/arabicTranslation');
            const dataArabic = await responseArabic.json();
            setData(dataArabic);

            const responseUrdu = await fetch('http://localhost:8080/api/urduTranscription');
            const dataUrdu = await responseUrdu.json();
            setUrduTranscription(dataUrdu);

            setEditIndex(-1);
        } catch (error) {
            console.error('Error deleting translation:', error);
        }
    };

    const addTranslation = () => {
        setSpeakerName("");
        setStartTime("");
        setEndTime("");
        setTranslation("");
        setEditTrigger(false);
        setAddTranslationModal(true);
    };

    const SaveNew = async (event: any) => {
        event.preventDefault();
        if (speakerName === "" || startTime === "" || endTime === "" || translation === "") {
            alert("Please fill all the fields");
            return;
        }
        // Check if the value is a valid time string
        const pattern = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9],[0-9][0-9][0-9]$/;
        if (!pattern.test(startTime) || !pattern.test(endTime)) {
            alert("Please enter a valid time string in the format HH:MM:SS,MSS");
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/add_Translation', {
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

            const responseArabic = await fetch('http://localhost:8080/api/arabicTranslation');
            const dataArabic = await responseArabic.json();
            setData(dataArabic);

            const responseUrdu = await fetch('http://localhost:8080/api/urduTranscription');
            const dataUrdu = await responseUrdu.json();
            setUrduTranscription(dataUrdu);

            if (response.ok) {
                console.log('Data sent successfully');
                setAddTranslationModal(false);
                setDateFormat(true);
            } else {
                console.error('Error sending data');
            }
        } catch (error) {
            console.error('Error adding translation:', error);
        }
    };

    const IgnoreChanges = () => {
        setAddTranslationModal(false);
    };

    const TimeUpdate = (event: any, type: string) => {
        event.preventDefault();
        const value = event.target.value;
        const pattern = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9],[0-9][0-9][0-9]$/;
        if (!pattern.test(value)) {
            setDateFormat(false);
        } else {
            setDateFormat(true);
        }

        if (type === 's') {
            setStartTime(event.target.value);
        } else if (type === 'e') {
            setEndTime(event.target.value);
        }
    };

    const generateTragetVideo = async () => {
        const response = await fetch('http://localhost:8080/generateTargetVideo');
    }
    return (
        <div className="container mx-auto p-4 overflow-hidden" ref={containerRef} onScroll={handleScroll}>
            <div className="flex">
                <div ref={transcriptionRef} className="urduTranscription w-1/2 pr-3 overflow-auto max-h-[70vh] bg-black border-b-2 border-t-2">
                    <div className="bg-slate-800 px-3 py-3">
                        <p className="text-white font-bold">
                            Urdu Transcription
                        </p>
                    </div>
                    {urduTranscription && Array.isArray(urduTranscription) && urduTranscription.map((item: any, index: number) => (
                        <div key={index} className="p-4 border border-slate-300 my-5 flex gap-2 bg-cyan-400">
                            <div className="flex">
                                <div className="font-bold text-xl">{item.speaker}</div>
                                <div className="m-2" >{item.startTime}</div>
                                <div className="m-2" >{item.endTime}</div>
                            </div>
                            <div className="flex">
                                <div>{item.transcription}</div>
                            </div>
                        </div>
                    ))}
                    {!urduTranscription && <div>Loading......</div>}
                </div>
                <div ref={translationRef} className="arabicTranslation w-1/2 pl-3 overflow-auto max-h-[70vh] bg-black border-b-2 border-t-2">
                    <>
                        <div className="bg-slate-800 flex justify-between items-center px-3 py-3">
                            <p className="text-white font-bold">
                                Arabic Translation
                            </p>
                            <button
                                className="bg-white mx-5 flex"
                                onClick={addTranslation}
                            >
                                Add Translation <AiOutlinePlus className="ml-2" size={18} />
                            </button>
                        </div>
                        {addTranslationModal &&
                            <div className="bg-cyan-400">
                                <div>
                                    <div className="flex"></div>
                                    <input className="font-bold text-xl" placeholder="Enter Speaker Name" value={speakerName} onChange={(e: any) => setSpeakerName(e.target.value)}></input>
                                    <input className="m-2" placeholder="Start Time" value={startTime} onChange={(e: any) => TimeUpdate(e, 's')}></input>
                                    <input className="m-2" placeholder="End Time" value={endTime} onChange={(e: any) => TimeUpdate(e, 'e')}></input>
                                    {!dateFormat && <div className="text-red-500">Please enter a valid time string in the format HH:MM:SS,MSS</div>}
                                </div>
                                <div className="flex">
                                    <input placeholder="Trnascription" value={translation} onChange={(e: any) => setTranslation(e.target.value)}></input>
                                </div>
                                <div>
                                    <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2" onClick={(e) => SaveNew(e)}>
                                        Save
                                    </button>
                                    <button className="bg-slate-800 text-white px-3 py-2 rounded-md m-2" onClick={IgnoreChanges}>
                                        Ignore
                                    </button>
                                </div>
                            </div>
                        }

                        
                        
                        
                        
                        
                        {data && Array.isArray(data) && data.map((item: any, index: number) => (
                            <div key={index} className="p-4 border border-slate-300 my-5 flex gap-2 bg-cyan-400">
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
                                            {!dateFormat && <div className="text-red-500">Please enter a valid time string in the format HH:MM:SS,MSS</div>}
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
                                <div className="flex ml-auto">
                                    {editTrigger && editIndex === index ?
                                        <button className="bg-red-800 text-white px-4 py-2 rounded-md m-2 hover:bg-slate-700 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
                                            onClick={(e) => saveEdit(e)}
                                        >Save</button>
                                        :
                                        <button className="bg-slate-800 text-white px-4 py-2 rounded-md m-2 hover:bg-slate-700 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
                                            onClick={() => editTheRow(item.speaker, item.startTime, item.endTime, item.translation, index)}
                                        >Edit</button>
                                    }
                                    {!editTrigger &&
                                        <button className="bg-slate-800 text-white px-4 py-2 rounded-md m-2 hover:bg-slate-700 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300" onClick={() => DeleteTranslation(index)}>
                                            Delete
                                        </button>}
                                </div>
                            </div>
                        ))}

                        {!data && <div>Loading......</div>}
                    </>
                </div>
            </div>

            <div className="flex mt-6 space-x-4">
                <div className="w-1/2">
                    <Link href='/urduTranscription' className="flex-1 text-right">
                        <div className=" bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center transform hover:scale-103s hover:border-blue-500 border border-transparent hover:border-2 focus:outline-none focus:ring focus:border-blue-300s">
                            <FaArrowLeft className="mr-2" />
                            Urdu Transcription
                        </div>
                    </Link>
                </div>
                {data &&
                    <div className="w-1/2">
                        <Link href='/arabicVideo' onClick={() => generateTragetVideo()} className="flex-1 text-left">
                            <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center transform hover:scale-103s hover:border-blue-500 border border-transparent hover:border-2 focus:outline-none focus:ring focus:border-blue-300s">
                                Arabic Video
                                <FaArrowRight className="ml-2" />
                            </div>
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}
