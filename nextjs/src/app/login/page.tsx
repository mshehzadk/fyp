'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast/headless';

export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log('Login response', response.data);
            router.push('/');
        } catch (error) {
            if (error instanceof Error) {
                console.log('Login Error: ', error.message);
                toast.error(error.message);
            } else {
                console.log('Unknown Error: ', error);
                toast.error('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const onSignup = async () => {
        try {
            router.push('/signup');
        } catch (error) {
            console.log('Signup Error: ', (error as Error).message);
            toast.error((error as Error).message);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100 rounded-md border-6 border-green-200">
            <div className="flex w-[80%] border-4 border-green-200 rounded-md">
                {/* Login Form */}
                <div className="w-full md:w-1/2 bg-white shadow-md rounded-md p-8 ">
                    <div className="max-w-md space-y-4">
                        <div className="text-center">
                            <h1 className="text-3xl font-extrabold text-indigo-600 mb-4">
                                Welcome back!
                            </h1>
                        </div>
                        <div className="m-6 flex items-center justify-center">
                            <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-indigo-100">
                                <img
                                    src="https://e0.pxfuel.com/wallpapers/667/98/desktop-wallpaper-login-background-outlook-login.jpg"
                                    alt="User"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="mx-8 mt-4 bg-cover bg-center rounded-md">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-600"
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
                                className="w-full px-3 py-3 mt-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mx-8 mt-4 bg-cover bg-center rounded-md">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-600"
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
                                className="w-full px-3 py-3 mt-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mx-8 mt-8">
                            <button
                                onClick={onLogin}
                                className="w-full px-4 py-4 mt-3 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-700 transform transition-transform duration-300 hover:scale-105 border border-red-700"
                            >
                                {loading ? 'Processing' : 'Login'}
                            </button>
                        </div>
                        <div className="mx-8 mt-8 mb-12">
                            <button
                                onClick={onSignup}
                                className="w-full px-4 py-4 mt-2 mb-5 text-white bg-gray-400 rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:border-gray-600 transform transition-transform duration-300 hover:scale-105 border border-red-700"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>

                {/* Image Column */}
                <div className="hidden md:flex md:w-1/2 bg-cover bg-center rounded-md  " style={{ backgroundImage: 'url("https://e0.pxfuel.com/wallpapers/667/98/desktop-wallpaper-login-background-outlook-login.jpg")' }}>
                </div>
            </div>
        </div>
    );
}
