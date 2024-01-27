/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoMdDownload } from "react-icons/io";
import { HashLoader } from "react-spinners";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

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
        <>
        <div className="videoupload mx-auto p-2 bg-gray-400  shadow-md w-full">
          <header className="bg-slate-400 text-white py-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-orange-400 duration-300">
            <div className="container mx-auto text-center">
              <h1 className="text-2xl font-bold mb-4">ARABIC VIDEO</h1>
            </div> 
          </header>
        </div>


        <div className="w-screen h-screen flex flex-col justify-center items-center py-0">
    <div className="mb-2">
        {isLoading ? (
            <div className="flex justify-center items-center">
                {/* You can keep the loading indicator or remove it based on your preference */}
                <HashLoader color="#007cf4" />
            </div>
        ) : (
            <video className="w-full h-full lg:w-[100%] lg:h-[100%]" src={videoSrc} controls />
        )}
    </div>
    <div className="flex w-[80%] mt-2">
        <Link href="/arabicTranslation" className="flex-1 pr-2">
            <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center w-50%">
                <FaArrowLeft className="mr-2" />
                Arabic Translation
            </div>
        </Link>
        {!isLoading && (
            <button type="button" className="flex-1 pl-2" onClick={Download}>
                <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center w-full">
                    <IoMdDownload className="inline-block mr-2" />
                    Download Video
                </div>
            </button>
        )}
    </div>
</div>









  
    </>
    )
}