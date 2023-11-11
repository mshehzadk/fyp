import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";


export default function Header() {
    return (
        <div className="flex justify-between items-center bg-slate-800 px-3 py-3">
            <p className="text-white font-bold">
                 Urdu Transcription
            </p>
            <Link href="/addTranscription" className="bg-white mx-5 flex">
                Add Transcription <AiOutlinePlus className="ml-2" size={18} />
            </Link>
        </div>
    )
}