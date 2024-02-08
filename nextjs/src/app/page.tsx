'use client';

import VideoPlayerControls from "./components/VideoPlayerControls";
import { useEffect, useRef, useState } from "react";
import { HashLoader } from "react-spinners";

export default function Home() {
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>();
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setVideoDuration(video.duration);
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const currentTime = videoRef.current?.currentTime;
    if (videoDuration != null && currentTime != null) {
      let loadingTimeout = setTimeout(() => {
        if (videoProgress == currentTime / videoDuration) {
          setVideoProgress((prev) => prev + 0.000001);
        } else {
          setVideoProgress(currentTime / videoDuration);
        }
      }, 10);

      return () => {
        clearTimeout(loadingTimeout);
      };
    }
  }, [videoProgress, videoDuration, isPaused]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      setIsPaused(!video.paused);
      video.paused ? video.play() : video.pause();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <header className="w-[80%] rounded-lg bg-black text-white my-3 py-3 text-center relative shadow-lg shadow-black  transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-black duration-300">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-0 animate-flip-up animate-once animate-duration-[2000ms]">DEMO VIDEO</h1>
        </div>
      </header>
      <div className="flex w-[80%] h-full shadow-xl shadow-black rounded-xl mb-6 animate-fade-up animate-once animate-duration-2000">

        <main className="flex flex-auto h-full items-center">
          <div className="w-full h-full max-w-6xl mx-auto rounded-xl overflow-hidden relative">
            {videoRef ? (
              <div className="w-full h-full">
                <div className="lg:top-4 lg:right-4 z-20 absolute border-4 border-gray-300 p-4 rounded-lg">
                  <VideoPlayerControls
                    progress={videoProgress}
                    isPaused={isPaused}
                    onPlayPause={togglePlayPause}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <video ref={videoRef} loop autoPlay muted>
                    <source src="/video.mp4" />
                  </video>
                </div>
              </div>
            ) : (<div className="w-full h-full">
              <HashLoader color="#007cf4" />
            </div>)}
          </div>
        </main>

      </div>
    </div>
  );
}