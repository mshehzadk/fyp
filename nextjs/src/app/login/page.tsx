'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast/headless';

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });
    const [disabled, setDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log('Login response', response.data);
            router.push('/profile');
        } catch (error: any) {
            console.log('Login Error: ', error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex text-gray-500 flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? 'Processing' : 'Login'}</h1>

            <hr />

            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
                onClick={onLogin}
                className=" px-3 py-2 mt-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                Login
            </button>
            <hr />
            <Link href="/signup">SignUp Here</Link>
        </div>
    );
}
