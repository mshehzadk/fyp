'use client';

import VideoUpload from "../components/UrduVideoUpload/VideoUpload";
import urduTranscription from "../components/urduTranscription/urduTranscription";

export default function urduvideo() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <VideoUpload />
        </main>
    );
}
