import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isVideoUploaded, setVideoUploaded] = useState<boolean>(false);
  const [showUploadForm, setShowUploadForm] = useState<boolean>(true);

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
      setShowUploadForm(false);
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

  const uploadMore = () => {
    setShowUploadForm(true);
    setVideoUploaded(false);
  };

  return (
    <>
      <div className="videoupload mx-auto p-2 bg-black  shadow-md w-full ">
          <header className="bg-gradient-to-r from-pink-900 to-purple-900 rounded-lg text-white py-3 mt-6 mb-6 mx-auto" style={{ width: "80%" }}>
            <div className="container mx-auto text-center">
              <h1 className="text-2xl font-bold mb-3">URDU VIDEO TO ARABIC VIDEOS</h1>
            </div>
          </header>



          {showUploadForm && (
          <div className="flex justify-center items-center my-10">
            <div className="bg-gradient-to-r from-pink-900 to-purple-900 text-white shadow-md rounded-lg p-8 x">
              <h2 className="text-3xl font-bold mb-8 text-center">Upload Video</h2>
              <form onSubmit={onSubmit} className="flex flex-col items-center justify-center text-white">
                <input
                  type="file"
                  name="file"
                  accept="video/mp4"
                  onChange={onFileChange}
                  className="w-full py-4 px-6 mb-6 border rounded focus:outline-none focus:border-blue-500"
                />
                {file && (
                  <div>
                    {isVideoUploaded ? (
                      <button type="button" className="py-2 px-4 bg-gray-400 rounded cursor-not-allowed" disabled>
                        Uploaded
                      </button>
                    ) : (
                      <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 border-black border hover:border-2 transition ease-in-out delay-150 hover:scale-100 duration-300">
                        Upload
                      </button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}


          <div className="flex flex-col lg:flex-row justify-between mb-6 mx-auto" style={{ width: "80%" }}>
            {isVideoUploaded && (
              <button onClick={uploadMore} className="flex-1 mb-4 lg:mb-0 lg:mr-4">
                <div className="bg-slate-500 text-white py-2 px-10 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center transform hover:scale-103s hover:border-blue-500 border border-transparent hover:border-2 focus:outline-none focus:ring focus:border-blue-300s">
                  Upload New
                </div>
              </button>
            )}
            {isVideoUploaded ? (
              <Link href="/urduTranscription" className="flex-1">
                <div className="bg-slate-500 text-white py-2 px-10 rounded-md text-center hover:bg-blue-400 transition-all duration-300 flex items-center justify-center transform hover:scale-103s hover:border-blue-500 border border-transparent hover:border-2 focus:outline-none focus:ring focus:border-blue-300s">
                  Urdu Transcription
                  <FaArrowRight className="ml-2" />
                </div>
              </Link>
            ) : null}
          </div>

          <div className={`mt-4 flex items-center justify-center mb-0 ${isVideoUploaded ? '' : 'hidden'}`} style={{ width: "80%", margin: "0 auto" }}>
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
                {isUploading ? (
                  <div>Loading...</div>
                ) : videoUrl ? (
                  <div className="video-container" style={{ width: "100%", height: "100%" }}>
                    <video controls className="w-full h-full">
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : null}
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


      </div>
    </>
  );
}
