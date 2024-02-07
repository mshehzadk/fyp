import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from 'react-icons/fa';
import { HashLoader } from "react-spinners";

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isVideoUploaded, setVideoUploaded] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert('No file selected.');

    setIsUploading(true);

    try {
      const data = new FormData();
      data.set('file', file);

      const resForNextApi = await fetch('/api/users/VideoUpload', {
        method: 'POST',
        body: data,
      });

      const resquestForFlask = await fetch('http://localhost:8080/uploadUrduVideo', {
        method: 'POST',
        body: data,
      });

      if (!resForNextApi.ok && !resquestForFlask.ok) {
        throw new Error(await resForNextApi.text());
      }

      setVideoUrl(URL.createObjectURL(file));
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsUploading(false);
      setVideoUploaded(true);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setVideoUrl(null);
      setVideoUploaded(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center p-2 w-full">
        <header className="w-[80%] rounded-lg bg-blue-400 text-white my-3 py-3 text-center relative shadow-md shadow-black  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-black duration-300">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4 animate-flip-up animate-once animate-duration-[2000ms]">URDU VIDEO TO ARABIC VIDEOS</h1>
            <p className="text-lg animate-flip-down animate-once animate-duration-[2000ms]">DUB VIDEOS FROM URDU TO ARABIC TO YOUR HEARTS CONTENT</p>
          </div> 
        </header>

        <form onSubmit={onSubmit} className="flex items-center w-[80%] justify-between border-black border rounded-lg bg-clip-border border-dashed">
          <div className="flex pr-4">
            <input
              type="file"
              name="file"
              accept="video/mp4"
              onChange={onFileChange}
              className="w-full py-2 px-4 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          {file && (
            <div>
              {isVideoUploaded ? (
                <button type="button" className="py-2 px-2 mx-4 bg-green-600 rounded cursor-not-allowed animate-fade-right animate-once animate-duration-[1000ms]" disabled>
                  Uploaded
                </button>
              ) : (
                <button type="submit" className="py-2 px-2 mx-4 bg-blue-400 text-white rounded hover:bg-black animate-fade animate-once animate-duration-[3000ms]">
                  Upload
                </button>
              )}
            </div>
          )}
        </form>
        <div className="mt-1 w-[80%]">
          {isVideoUploaded ? (
            <Link href="/urduTranscription">
              <p className={`bg-black text-white py-2 px-4 my-2 rounded-md text-center flex items-center justify-center p-3 hover:bg-blue-400 transition-all duration-300 transform hover:scale-103s shadow-md shadow-blue-400 animate-pulse animate-once animate-duration-[3000ms] animate-ease-out`}>
                Urdu Transcription
                <FaArrowRight className="ml-2" />
              </p>
            </Link>
          ) : null}
        </div>
        <div className={`mt-4 flex flex-col w-full h-full items-center justify-center ${isVideoUploaded ? '' : 'hidden'}`}>
          <div className="flex flex-col items-center w-full">

            {/* Video Container */}
            <div className="flex flex-col items-center w-[80%] h-[40%] bg-base-100 shadow-xl shadow-black rounded-xl border-4 border-gray-200 mb-6 animate-fade-up animate-once animate-duration-2000">
              {isUploading ? (
                <div><HashLoader color="#007cf4" /></div>
              ) : videoUrl ? (
                <div className="video-container">
                  <video controls className="w-full h-full">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : null}
            </div>


          </div>
        </div>
      </div>
    </>
  );
}