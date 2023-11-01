import { useState } from 'react';

function VideoUpload() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('video', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setUploadProgress(progress);
          },
        });

        if (response.ok) {
          console.log('Video uploaded successfully.');
        } else {
          console.error('Failed to upload video.');
        }
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && (
        <div>
          Uploading: {uploadProgress.toFixed(2)}%
          <progress value={uploadProgress} max="100"></progress>
        </div>
      )}
      {file && <VideoPlayer file={file} />}
    </div>
  );
}

export default VideoUpload;
