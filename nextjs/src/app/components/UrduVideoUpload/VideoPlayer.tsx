function VideoPlayer({ id }: { id: string }) {
    return (
      <video
        src={`../video.mp4`}
        width="800px"
        height="auto"
        controls
        autoPlay
        id="video-player"
      />
    );
  }
  
  export default VideoPlayer;