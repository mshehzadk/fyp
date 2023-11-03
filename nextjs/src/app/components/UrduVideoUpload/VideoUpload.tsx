'user client';

import {useState} from "react";


export default function VideoUpload() {
  const [file, setFile]= useState<File>();
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

  e.preventDefault();
  if (!file) return alert('File not exist.')
  console.log(file)

  try {
    const data = new FormData();
    data.set('file', file);
      
    const res = await fetch('/api/users/VideoUpload', {
        method: 'POST',
        body: data,
      })
      // Handle the error
      if (!res.ok) {
        throw new Error(await res.text());}
  } 
  catch (e : any){ // Handle the error
        console.log(e.message);
    }
}

  

  return (
    <div>
      <h1>Video Upload</h1>
      <form onSubmit={onSubmit}>
        <input type="file" 
               name="file"
              onChange={(e) => setFile(e.target.files?.[0]) } 
              />
        <input type="submit" value="Upload" />
      </form>
    </div>
  )
}