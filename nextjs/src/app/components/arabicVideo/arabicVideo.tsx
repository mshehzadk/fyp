import { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdDownload } from "react-icons/io";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 border-t-transparent"></div>
    </div>
  );
};

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
    <div className="video w-full h-full pb-20 pt-2" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1410.jpg')" }}>
      <header className="bg-gray-900 rounded-tl-lg rounded-tr-lg border border-gray-500 text-white py-3 mt-5 mb-0 mx-auto" style={{ width: "80%" }}>
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold mb-3">DUBBED VIDEO</h1>
        </div>
      </header>

      <div className="w-full flex flex-col justify-center items-center mb-25">
        <div className="mt-4 flex items-center justify-center pb-5" style={{ width: "80%", margin: "0 auto" }}>
          <div className="flex flex-col lg:flex-row w-full">
            {/* Video Container */}
            <div className="w-full border border-gray-500 bg-black mb-0 items-center align-middle" style={{ height: "auto", maxHeight: "450px", minHeight: "250px", overflow: "hidden" }}>
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  {/* Loading Indicator */}
                  <LoadingSpinner />
                </div>
              ) : (
                <video className="w-full h-full" src={videoSrc} controls />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between w-full mt-40 " style={{ maxWidth: "80%", margin: "0 auto" }}>
          <Link href="/arabicTranslation" className="flex-1  mb-4 lg:mb-0 lg:mr-4 ">
            <div className="bg-slate-500 text-white py-2 px-10 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center w-50%">
              <FaArrowLeft className="mr-2" />
              Arabic Translation
            </div>
          </Link>
          {!isLoading && (
            <button type="button" onClick={Download} className="flex-1 ">
              <div className="bg-slate-500 text-white py-2 px-10 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center w-full">
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
