'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '@/images/logo.png';
import Image from 'next/image';

export default function SignUp() {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        password: '',
    });

    const onSignUp = async () => {
        if (user.username === '' || user.email === '' || user.password === '') {
            toast.error('Please fill all the fields');
            return;
        }
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
    const onLogin = async () => {
        try {
            router.push('/login');
        } catch (error: any) {
            console.log('Login Error: ', error.message);
            toast.error(error.message);
        }
    };


    return (
        <div className="flex item-center justify-center bg-gray-300 min-h-screen">
            <div className="flex  flex-col item-center justify-center md:flex-row m-16 w-[60%] ">
              
                <div className="bg-gray-50 w-[75%] md:w-[50%] rounded-md ">
                    <div className="w-full max-w-md space-y-2">
                        <div className="m-6">
                            <h1 className="text-3xl font-bold">
                                Create your account
                            </h1>
                        </div>
                        <div className="">
                            <div className="mx-6 mt-2">
                                <label
                                    htmlFor="username"
                                    className="block font-bold text-gray-700"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={user.username}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            username: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 mt-2 bg-gray-300 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                    required
                                />
                            </div>
                            <div className="mx-6 mt-2">
                                <label
                                    htmlFor="email"
                                    className="block font-bold text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={user.email}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 mt-2 bg-gray-300 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                    required
                                />
                            </div>
                            <div className="mx-6 mt-2">
                                <label
                                    htmlFor="password"
                                    className="block font-bold text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={user.password}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            password: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 bg-gray-300 mt-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                                    required
                                />
                            </div>
                            <div className="mx-6 mt-8">
                                <button
                                    onClick={onSignUp}
                                    className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                                >
                                    {loading ? 'Processing' : 'Sign Up'}
                                </button>
                            </div>
                            <div className="mx-6 mt-3 mb-8">
                                <button
                                    onClick={onLogin}
                                    className="w-full px-4 py-2 font-bold text-white bg-gray-400 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
