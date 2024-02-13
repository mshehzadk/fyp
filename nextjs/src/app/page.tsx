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
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-0 relative bg-black mt-1">


        <main className="flex flex-col lg:flex-row items-center justify-between lg:px-20 ">
          <div className="order-2 lg:order-1 w-full lg:w-[50%] lg:max-w-[50%] relative border-4 border-blue-900 bg-gradient-to-r from-purple-900 via-blue-900 to-blue-400  p-8 rounded-lg shadow-lg mb-10 lg:mb-0 lg:mt-0" style={{ marginTop: "-6rem" }}>
            <header className="text-white py-1 text-center mb-8">
              <h1 className="text-5xl font-bold mb-0 tracking-wide">DEMO VIDEO</h1>
            </header>
            <video className="w-full h-auto lg:h-[400px] rounded-tl-xl rounded-bl-xl lg:rounded-tr-xl lg:rounded-br-xl border-t border-r border-b border-black-700" ref={videoRef} loop muted autoPlay controls style={{ width: '800px', height: '400px', border: '4px solid white' }}>
              <source src="/video.mp4" />
            </video>
            <div className="lg:hidden z-10 absolute top-4 right-4 border border-gray-300 p-4 rounded-md">
              <VideoPlayerControls
                progress={videoProgress}
                isPaused={isPaused}
                onPlayPause={togglePlayPause}
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 w-full lg:w-[50%] lg:max-w-[50%] lg:pl-8 lg:mt-15 mb-40 mt-10 p-5">
            <h1 className="text-6xl font-bold mb-4 text-purple-700">DUBLINGO</h1>
            <h2 className="text-4xl font-semibold mb-6 text-purple-600">Transform Urdu videos into Arabic dubbed videos</h2>
            <p className="leading-relaxed mb-6 text-gray-100 text-xl">
              Dublingo is a revolutionary system that automatically transforms Urdu videos into Arabic dubbed videos using advanced AI technology.
            </p>
            <ul className="list-disc pl-7 mb-8 text-gray-100 text-xl">
              <li>Automatically translates Urdu speech into Arabic</li>
              <li>Syncs translations with original video</li>
              <li>Produces high-quality dubbed videos</li>
              <li>Easy to use interface</li>
            </ul>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 ml-40">
              Try Now
            </button>
          </div>

          <div className="hidden lg:block z-10 absolute top-4 right-4 border border-gray-300 p-4 rounded-md bg-black">
            <VideoPlayerControls
              progress={videoProgress}
              isPaused={isPaused}
              onPlayPause={togglePlayPause}
            />
          </div>
        </main>

      </div>
    </>
  );
}
