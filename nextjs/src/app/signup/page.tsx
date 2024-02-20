'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast/headless';

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = React.useState(false);

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
        } catch (error) {
            if (error instanceof Error) {
                console.log('SignUp Error: ', error.message);
                toast.error(error.message);
            } else {
                console.log('Unknown Error: ', error);
                toast.error('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const onLogin = async () => {
        try {
            router.push('/login');
        } catch (error) {
            if (error instanceof Error) {
                console.log('Login Error: ', error.message);
                toast.error(error.message);
            } else {
                console.log('Unknown Error: ', error);
                toast.error('An unknown error occurred.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100  border-black bg-gradient-to-b from-gray-700 to-black" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1410.jpg')" }}>
            <div className="flex w-[65%] border-2 border-gray-600 rounded-md">
                {/* Sign Up Form */}


                <div className="bg-gradient-to-r from-cyan-800 to-gray-700  w-full md:w-1/2 rounded-md p-6">
                    <div className="max-w-md space-y-4">
                        <div className="text-center">
                            <h1 className="text-3xl font-extrabold text-indigo-600 mb-4">
                                Create your account
                            </h1>
                        </div>
                        <div className="m-6 flex items-center justify-center">
                            <div className="w-32 h-32 overflow-hidden rounded-full border-2 bg-black border-gray-600">
                                <img
                                    src="https://cdn-icons-png.freepik.com/512/295/295128.png"
                                    alt="User"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="mx-8 mt-2">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-black"
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
                                className="w-full px-3 py-2 mt-2 bg-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mx-8 mt-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-black"
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
                                className="w-full px-3 py-2 mt-2 bg-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mx-8 mt-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-black"
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
                                className="w-full px-3 py-2 mt-2 bg-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mx-8 mt-8">
                            <button
                                onClick={onSignUp}
                                className="w-full px-4 py-3 mt-3 text-white bg-indigo-900 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:border-indigo-700 transform transition-transform duration-300 hover:scale-105 border border-gray-500"
                            >
                                {loading ? 'Processing' : 'Sign Up'}
                            </button>
                        </div>
                        <div className="mx-8 mt-3 mb-0">
                            <button
                                onClick={onLogin}
                                className="w-full px-4 py-3 mt-2 mb-5 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-600 transform transition-transform duration-300 hover:scale-105 border border-gray-500"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex md:w-1/2 bg-cover bg-center rounded-md" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210710/original/pngtree-blue-technology-future-artificial-intelligence-science-picture-image_1010975.jpg")' }}>
                </div>
            </div>
        </div>
        );
}