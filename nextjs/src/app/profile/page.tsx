'use client';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function Profile() {
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successfully');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <button
                onClick={logout}
                className=" mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    );
}
