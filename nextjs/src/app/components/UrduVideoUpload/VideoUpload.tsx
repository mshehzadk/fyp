import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className="container mx-auto mt-0 p-2 bg-gray-100 rounded-lg shadow-md">
      <header className=" bg-slate-400 text-white py-5">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">ARABIC VIDEO TO URDU VIDEOS</h1>
          <p className="text-lg">DUB VIDEOS FROM ARABIC TO URDU TO YOUR HEATS CONTENT</p>
        </div>
      </header>

      <form onSubmit={onSubmit} className="flex items-center justify-between">
        <div className="flex-1 pr-4">
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
              <button type="button" className="py-2 px-4 bg-gray-400 rounded cursor-not-allowed" disabled>
                Uploaded
              </button>
            ) : (
              <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                Upload
              </button>
            )}
          </div>
        )}
      </form>

      <div className="mt-4">
        {isUploading ? (
          <div>Loading...</div>
        ) : videoUrl ? (
          <video controls className="w-full">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>

      <div className="mt-4">
          {isVideoUploaded ? (
            <Link href="/urduTranscription">
              <p className={`bg-white text-gray-800 rounded-md p-3 hover:bg-slate-400 transition-all duration-300 transform hover:scale-103s  hover:border-blue-500 border border-transparent hover:border-2 focus:outline-none focus:ring focus:border-blue-300s`}>
                Urdu Transcription
              </p>
            </Link>
          ) : null}
        </div>
    </div>
  );
}