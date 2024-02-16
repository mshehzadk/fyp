/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Urdutranscriptionlist from "./urduTranscriptionList";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';


export default function UrduTranscription() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    try {
      fetch('http://localhost:8080/api/urduTranscription')
        .then((response) => response.json())
        .then((data) => setData(data));
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  const generateTranslation = async () => {
    const response = await fetch('http://localhost:8080/generateTranslation');
  }

  return (
  
    <div className="container mx-auto px-4 mt-5">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="spinner-border w-16 h-16 border-4 border-blue-500 rounded-full"></div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:max-h-[67vh] ">
          <div className="lg:w-1/2 lg:mr-4 bg-gray-700 border-2 rounded-md border-black lg:overflow-y-auto md:overflow-y-auto overflow-y-hidden">
            <Urdutranscriptionlist />
          </div>

          <div className="lg:w-1/2 lg:ml-4 bg-gray-700 p-3 lg:p-4 border-2 rounded-md border-black">
            <p className="text-white font-bold mb-2">Urdu Video</p>
            <div className="relative" style={{ paddingTop: "56.25%" }}>
              {videoRef && (
                <video ref={videoRef} controls muted className="absolute top-0 left-0 w-full h-full">
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex mt-6 space-x-4">
        <Link href="/urduvideo" className="flex-1">
          <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center transform hover:scale-103s hover:border-blue-500 border border-transparent hover:border-2 focus:outline-none focus:ring focus:border-blue-300s">
            <FaArrowLeft className="mr-2" />
            Urdu Video
          </div>
        </Link>
        {data && (
          <Link href="/arabicTranslation" onClick={() => generateTranslation()} className="flex-1">
            <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center transform hover:scale-103s hover:border-blue-500 border border-transparent hover:border-2 focus:outline-none focus:ring focus:border-blue-300s">
              Arabic Translation
              <FaArrowRight className="ml-2" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
