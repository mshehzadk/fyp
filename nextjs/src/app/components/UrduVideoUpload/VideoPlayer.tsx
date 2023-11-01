function VideoPlayer({ file }) {
    const objectURL = URL.createObjectURL(file);
  
    return (
      <div>
        <video controls>
          <source src={objectURL} type="video/mp4" />
        </video>
      </div>
    );
  }
  
  export default VideoPlayer;
  