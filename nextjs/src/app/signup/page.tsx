'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { set } from 'mongoose';

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        password: '',
    });
    const [disabled, setDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log('SignUp response', response.data);
            router.push('/login');
        } catch (error: any) {
            console.log('SignUp Error: ', error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            user.username.length > 0 &&
            user.email.length > 0 &&
            user.password.length > 0
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? 'Processing' : 'SignUp'}</h1>

            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="text-black"
                id="username"
                type="text"
                placeholder="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <label htmlFor="email">Email</label>
            <input
                className="text-black"
                id="email"
                type="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label htmlFor="password">Password</label>
            <input
                className="text-black"
                id="password"
                type="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
                onClick={onSignUp}
                className=" px-3 py-2 mt-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
                {disabled ? 'Disabled' : 'Sign Up'}
            </button>
            <hr />
            <Link href="/login">Login Here</Link>
        </div>
    );
}
