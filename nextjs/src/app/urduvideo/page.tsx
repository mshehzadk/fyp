'use client';

import VideoPlayer from "../components/UrduVideoUpload/VideoPlayer";
import VideoUpload from "../components/UrduVideoUpload/VideoUpload";

export default function urduvideo() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Urdu Video</h1>
            <VideoUpload />
            <VideoPlayer id="../video.mp4" />
        </main>
    );
}
