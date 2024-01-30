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

  return (
    <div>
      <div className="flex">
        <div className="w-1/2 text-right overflow-y-auto max-h-[67vh] bg-black border-b-2">
        <Urdutranscriptionlist />
        </div>
        <div className="w-1/2 text-right">
            <div className="flex justify-between items-center bg-slate-800 px-3 py-4">
                        <p className="text-white  font-bold ">
                            Urdu Video
                        </p>
            </div>
          {videoRef ? (
            <video ref={videoRef} controls muted className="w-full ">
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div>Loading.......</div>
          )}
        </div>
      </div>
        <div className="flex mt-6 space-x-4">
          <Link href="/urduvideo" className="flex-1">
              <div className="bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center transform hover:scale-103s hover:border-blue-500 border border-transparent hover:border-2 focus:outline-none focus:ring focus:border-blue-300s">
              <FaArrowLeft className="mr-2" />
              Urdu Video
              </div>
          </Link>
          {data && (
              <Link href="/arabicTranslation" className="flex-1">
              <div className= " bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-centertransform hover:scale-103s hover:border-blue-500 border border-transparent hover:border-2 focus:outline-none focus:ring focus:border-blue-300s">
                  Arabic Translation
                  <FaArrowRight className="ml-2" />
              </div>
              </Link>
          )}
        </div>
    </div>
  );
}
