/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import Urdutranscriptionlist from "../urduTranscription/urduTranscriptionList";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function arabicTranslation() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>(null);

  const handleScroll = () => {
    if (leftColumnRef.current && rightColumnRef.current) {
      const scrollLeft = leftColumnRef.current.scrollTop;
      rightColumnRef.current.scrollTop = scrollLeft;
    }
  };

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

  return (
    <div className="container mx-auto p-4 overflow-hidden">
      <div className="flex">
        <div
          className="w-1/2 pr-3 overflow-auto max-h-[60vh]"
          onScroll={handleScroll}
          ref={leftColumnRef}
        >
          <Urdutranscriptionlist />
        </div>
        <div
          className="w-1/2 pl-3 overflow-auto max-h-[60vh] "
          onScroll={handleScroll}
          ref={rightColumnRef}
        >
          <Urdutranscriptionlist />
        </div>
      </div>

      <div className="flex mt-4 space-x-4">
        <div className="w-1/2">
          <Link href='/urduTranscription' className="flex-1 text-right">
            <div className=" bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center">
              <FaArrowLeft className="mr-2" />
              Urdu Transcription
            </div>
          </Link>
        </div>
        {data && 
          <div className="w-1/2">
            <Link href='/arabicVideo' className="flex-1 text-left">
              <div className= "bg-slate-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center">
                Arabic Video
                <FaArrowRight className="ml-2" />
              </div>
            </Link>
          </div>
        }
      </div>
    </div>
  )
}
