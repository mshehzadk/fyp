/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoMdDownload } from "react-icons/io";
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
        a.setAttribute('download', 'test.mp4');
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

    }

    return (
    <div className=" bg-black pb-10">
          <header className="bg-gradient-to-r from-pink-900 to-purple-800 rounded-lg text-white py-3 mt-6 mb-6 mx-auto" style={{ width: "80%" }}>
            <div className="container mx-auto text-center">
              <h1 className="text-2xl font-bold mb-3">ARABIC DUBBED VIDEO</h1>
            </div>
          </header>





        <div className="w-screen flex flex-col justify-center items-center py-0 bg-black">
            <div className={`mt-4 mb-10 flex items-center justify-center pb-5"`} style={{ width: "80%", margin: "0 auto" }}>
                <div className="flex flex-col lg:flex-row">

                    {/* Left Image */}
                    <div className="w-2/4 lg:w-1/2 border-2 border-black hidden lg:block mr-1" style={{ width: "400px", height: "400px" }}>
                        <img
                        src="https://wallpapercave.com/wp/wp5886498.jpg"
                        alt="Left Image"
                        className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Video Container */}
                    <div className="w-full lg:w-1/2 border-2 border-white" style={{ width: "100%", height: "auto", maxHeight: "400px" }}>
                        {isLoading ? (
                        
                            <div className="flex pt-10 justify-center items-center">
                                {/* You can keep the loading indicator or remove it based on your preference */}
                                Loading..........
                            </div>
                        ) : (
                            <video className="w-full h-full lg:w-[100%] lg:h-[100%] bg-black" src={videoSrc} controls />
                        )}
                    </div>

                    {/* Right Image */}
                    <div className="w-2/4 lg:w-1/2 border-2 border-black hidden lg:block ml-1" style={{ width: "400px", height: "400px" }}>
                        <img
                        src="https://wallpapercave.com/wp/wp5886498.jpg"
                        alt="Right Image"
                        className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-center mt-5" style={{ maxWidth: "80%", margin: "0 auto" }}>
                <Link href="/arabicTranslation" className="flex-1 pr-2">
                    <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center w-50%">
                    <FaArrowLeft className="mr-2" />
                    Arabic Translation
                    </div>
                </Link>
                {!isLoading && (
                    <button type="button" onClick={Download} className="flex-1 pl-2">
                    <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center w-full">
                        <IoMdDownload className="inline-block mr-2" />
                        Download Video
                    </div>
                    </button>
                )}
                </div>
            </div>

    </div>
    )
}