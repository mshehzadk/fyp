'use client';

import UrduTranscription from '../components/urduTranscription/urduTranscription';

export default function urduTranscription() {
    
    return (
        <main className="flex flex-col items-center justify-between p-4 bg-gray-800" style={{ backgroundImage: "url('https://blackwallpaperhd.com/wp-content/uploads/2022/02/dark18-576x1024.jpg')" }}>
            <UrduTranscription />
        </main>
    );
}
