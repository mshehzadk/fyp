/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoMdDownload } from "react-icons/io";
import { HashLoader } from "react-spinners";
import { FaArrowLeft } from "react-icons/fa";

export default function arabicVideo() {
    const [isLoading, setIsLoading] = useState(true);
    const [videoSrc, setVideoSrc] = useState<string>("");

    useEffect(() => {
        fetch('http://localhost:8080/get_arabicVideo')
            .then(response => response.blob())
            .then(blob => {
                const videoUrl = URL.createObjectURL(blob);
                setVideoSrc(videoUrl);
                setIsLoading(false);
            });
    }, []);

    const Download = () => {
        const url = videoSrc;
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.setAttribute('download', 'test.mp4');
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

    }

    return (
        <div className="w-[80%] h-screen flex flex-col items-center pt-10">
            <div className="w-[80%] h-[70%] bg-base-100 shadow-xl rounded-xl border border-gray-200 mb-6" >
                {isLoading ?
                    <div className="flex justify-center items-center w-full h-full rounded-2xl shadow-2xl">
                        <HashLoader color="#007cf4" />
                    </div> :
                    <video className="w-full h-full rounded-2xl shadow-2xl" src={videoSrc} controls />
                }
            </div>
            <div className="flex w-[80%]">
                <Link href='/arabicTranslation' className="flex-1 lg:flex-1 pr-2">
                    <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center w-50%">
                        <FaArrowLeft className="mr-2" />
                        Arabic Translation
                    </div>
                </Link>
                {!isLoading &&
                    <button
                        type="button"
                        className="flex-1 lg:flex-1 pl-2 "
                        onClick={Download}
                    >
                        <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center w-full">
                        <IoMdDownload className="inline-block mr-2" />
                        Download Video
                        </div>
                    </button>
                }
            </div>

        </div>

    )
}