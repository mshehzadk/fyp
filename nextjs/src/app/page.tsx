'use client';

import VideoPlayerControls from "./components/VideoPlayerControls";
import { useEffect, useRef, useState } from "react";

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
    <>
      <header className="bg-slate-400 text-white py-3 text-center relative  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-orange-400 duration-300">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-0 ">DEMO VIDEO</h1>
        </div>
        {/* Left Margin */}
        <div className="h-full w-full lg:w-60 absolute top-0 left-0">
          <div className="h-full w-full bg-gradient-to-r from-slate-700 to-transparent"></div>
        </div>
        {/* Right Margin */}
        <div className="h-full w-full lg:w-60 absolute top-0 right-0">
          <div className="h-full w-full bg-gradient-to-l from-slate-700 to-transparent"></div>
        </div>
      </header>


      <div className="flex flex-col items-center justify-center min-h-screen p-0 relative">
        {/* Left Margin */}
        <div className="h-full w-full lg:w-60 absolute top-0 left-0">
          <div className="h-full w-full bg-gradient-to-r from-slate-700 to-transparent"></div>
        </div>
        {/* Right Margin */}
        <div className="h-full w-full lg:w-60 absolute top-0 right-0">
          <div className="h-full w-full bg-gradient-to-l from-slate-700 to-transparent"></div>
        </div>

        <main className="flex min-h-screen flex-col items-center justify-between lg:px-24">
          <div className="w-full lg:w-[90%] max-w-6xl mx-auto rounded-xl overflow-hidden relative border border-black-700">
            {videoRef ? (
              <div>
                <div className="lg:top-4 lg:right-4 z-10 absolute border border-gray-300 p-4 rounded-md">
                  <VideoPlayerControls
                    progress={videoProgress}
                    isPaused={isPaused}
                    onPlayPause={togglePlayPause}
                  />
                </div>
                <video className="w-full h-90 rounded-xl border-t border-b border-black-700" ref={videoRef} loop autoPlay>
                  <source src="/video.mp4" />
                </video>
              </div>
            ) : (<div className="">Loading</div>)}
          </div>
        </main>

      </div>
    </>
  );
}