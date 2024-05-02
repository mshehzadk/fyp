'use client';
import Link from "next/link";
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
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-0 relative" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1410.jpg')" }}>


        <main className="flex flex-col lg:flex-row items-center justify-between lg:px-20 ">

        <div className="order-2 lg:order-1 w-full lg:w-[50%] lg:max-w-[50%] relative border-2 border-gray-400 bg-transparent p-6 lg:rounded-xl shadow-lg mb-10 lg:mb-0 lg:mt-0" style={{ marginTop: "-6rem" }}>
            <video className="w-full h-auto lg:h-[400px] rounded-tl-xl rounded-bl-xl lg:rounded-tr-xl lg:rounded-br-xl border-t border-r border-b border-black-700" ref={videoRef} loop muted autoPlay controls style={{ width: '100%', height: 'auto', maxWidth: '800px', maxHeight: '400px', border: ' solid black', background:'black' }}>
                <source src="/DubLingoSecondAd.mp4" />
            </video>
            <div className="lg:hidden z-10 absolute top-4 right-4 border border-gray-500 p-2 rounded-md">
                <VideoPlayerControls
                    progress={videoProgress}
                    isPaused={isPaused}
                    onPlayPause={togglePlayPause}
                />
            </div>
        </div>



        <div className="order-1 lg:order-2 w-full lg:w-[50%] lg:max-w-[50%] lg:pl-8 lg:mt-15 mb-40 mt-10 mx-5 p-5 flex flex-col items-center">
  <h1 className="text-6xl text-white font-serif font-bold mb-4">
    <span className="text-blue-700 ">DUB</span>LINGO
  </h1>
  <h2 className="text-4xl font-semibold mb-6 text-blue-600 text-center">Transform videos from one language to another</h2>
  <p className="leading-relaxed mb-6 text-gray-100 text-xl text-center">
    Dublingo is a revolutionary system that automatically creates dubbed videos using advanced AI technology.
  </p>
  <div className="flex flex-col items-center"> {/* New container for centering */}
    <ul className="list-disc pl-7 mb-8 text-gray-100 text-xl">
      <li>Automatically translates speech</li>
      <li>Syncs translations with original video</li>
      <li>Produces high-quality dubbed videos</li>
      <li>Easy to use interface</li>
    </ul>
    <Link href="/urduvideo">
      <button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 border border-gray-400">
        Try Now
      </button>
    </Link>
  </div>
</div>


        </main>

      </div>
    </>
  );
}