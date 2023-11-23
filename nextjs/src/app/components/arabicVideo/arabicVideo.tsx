/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoMdDownload } from "react-icons/io";

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
        a.setAttribute('download', 'test.video');
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center py-0">
            <div className="w-[80%] h-[70%] bg-base-100 shadow-xl rounded-xl border border-gray-200 mb-12" >
                {isLoading ?
                    <div className="flex justify-center items-center w-full h-full rounded-2xl shadow-2xl">
                        <div className="justify-center loading loading-balls w-[30%] h-[30%]"></div>
                    </div> :
                    <video className="w-full h-full rounded-2xl shadow-2xl" src={videoSrc} controls />
                }
            </div>
            <div className="flex flex-row justify-between w-[80%] mt-5 ">
                <Link className="btn sm:btn-sm md:btn-md lg:btn-md btn-info transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md border border-gray-200" href='/arabicTranslation'>
                    <div>Arabic Translation</div>
                </Link>
                {!isLoading &&
                    <button type="button" className="btn sm:btn-sm md:btn-md lg:btn-md btn-info transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 shadow-md border border-gray-200" onClick={Download}>
                        <IoMdDownload className="inline-block mr-2" />
                        Download Video
                    </button>
                }
            </div>
        </div>

    )
}