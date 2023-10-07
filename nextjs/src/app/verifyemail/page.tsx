'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [verfied, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            await axios.post('/api/users/verifyEmail', { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || '');
    }, []);

    useEffect(() => {
        if (token.length > 0) verifyEmail();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? token : 'no token'}{' '}
            </h2>
            {verfied && (
                <div className="p-2 bg-green-500 text-black">
                    Email has been verified
                    <br />
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && <div className="p-2 bg-green-500 text-black">Error</div>}
        </div>
    );
}
