import { useState } from "react";
import Link from "next/link"; // Import the Link component for going to next page button

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isVideoUploaded, setVideoUploaded]= useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form refresh
    if (!file) return alert('No file selected.');

    setIsUploading(true); // Set the isUploading state to true when the upload starts

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

      // Create a local URL for the file to use in the video player
      setVideoUrl(URL.createObjectURL(file));
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsUploading(false); // Set the isUploading state to false when the upload is complete
      setVideoUploaded(true); // Set the isVideoUploaded state to true when the upload is complete
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setVideoUrl(null); // Clear the previous video URL
      setVideoUploaded(false); // Set false to receive a new video
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <div style={{display: "flex"}}>
            <div style={{textAlign:'left', flex: '1'}}>
            <input type="file"
              name="file"
              accept="video/mp4"
              onChange={onFileChange}
            />
            </div>
            {file && <div style={{ textAlign: 'right', flex: '1' }}>
              <input type="submit" value="Upload" />
            </div>}
            </div>
        </form>
      </div>
      <div>
        {isUploading ? (
          <div>Loading...</div> // This is where your spinner would go
        ) : videoUrl ? (
          <video controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>
      <div>
        {isVideoUploaded ? (
          <Link href="/urduTranscription">
            <p
                className={`'bg-white text-gray-800 rounded-[18px]'`}
            >
                Home
            </p>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
