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
    <main data-theme='light' className="flex min-h-screen flex-col items-center justify-between py-6 px-24">
        <h1 className="text-black font-semibold text-2xl decoration-sky-700  mb-4 underline underline-offset-[8px]  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:decoration-orange-400 duration-300">Demo Video</h1>
      <div className="relative w-[80%] max-w-6xl mx-auto my-8 rounded-xl overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <VideoPlayerControls
            progress={videoProgress}
            isPaused={isPaused}
            onPlayPause={togglePlayPause}
          />
        </div>
        <video className="w-full" ref={videoRef} loop muted autoPlay>
          <source src="/video.mp4" />
        </video>
      </div>
    </main>
  );
}
