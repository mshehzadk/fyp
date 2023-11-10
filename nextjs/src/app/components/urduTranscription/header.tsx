import Link from "next/link";


export default function Header() {
    return (
        <div className="flex justify-between items-center bg-slate-800 px-3 py-3">
            <p className="text-white font-bold">
                 Urdu Transcription
            </p>
            <Link href="/addTranscription" className="bg-white mx-5">
                Add Transcription
            </Link>
        </div>
    )
}