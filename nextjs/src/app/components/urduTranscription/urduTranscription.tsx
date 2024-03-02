/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Urdutranscriptionlist from "./urduTranscriptionList";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
}

export default function UrduTranscription() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      fetch('http://localhost:8080/api/fileExistence', {method: 'POST',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({'fileName':'urduTranscription.json'})})
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Failed to fetch data');
        })
        .then((data) => {setIsLoading(!data.exists);})
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  const generateTranslation = async () => {
    const response = await fetch('http://localhost:8080/generateTranslation');
  }

  return (
  <div className="w-full h-full p-0" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1410.jpg')" }}>
    <div className="container mx-auto px-4 mt-5 ">
      {isLoading ? (
         <LoadingSpinner />
      ) : (
        <>
        <div className="flex flex-col lg:flex-row lg:max-h-[67vh] ">
          <div className="lg:w-1/2 lg:mr-4 bg-gray-700 border rounded-md border-gray-400 lg:overflow-y-auto md:overflow-y-auto overflow-y-hidden">
            <Urdutranscriptionlist />
          </div>

          <div className="lg:w-1/2 lg:ml-4 bg-gray-900 p-3 lg:p-4 border rounded-md border-gray-500">
            <p className="text-white font-bold mb-2">Urdu Video</p>
            <div className="relative" style={{ paddingTop: "56.25%" }}>
              {videoRef && (
                <video ref={videoRef} controls muted className="absolute top-0 left-0 w-full h-full bg-black">
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      

      <div className="flex mt-6 space-x-4">
      <div className="w-1/2">
          <Link href="/urduvideo" className="flex-1">
            <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center transform hover:scale-103s hover:border-blue-500 border border-transparent hover:border-2 focus:outline-none focus:ring focus:border-blue-300s">
              <FaArrowLeft className="mr-2" />
              Upload Video
            </div>
          </Link>
        </div>
        {!isLoading && (
        <div className="w-1/2">
          <Link href="/arabicTranslation" onClick={() => generateTranslation()} className="flex-1">
            <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center transform hover:scale-103s hover:border-blue-500 border border-transparent hover:border-2 focus:outline-none focus:ring focus:border-blue-300s">
              Translation
              <FaArrowRight className="ml-2" />
            </div>
          </Link>
        </div>
        )}
      </div>
      </>
      )}
    </div>
  </div>  
  );
}
