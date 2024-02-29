'use client';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Button from './Button';

const Navbar = ({ toggle }: { toggle: () => void }) => {
    const pathname = usePathname();
    const [active, setActive] = useState('Home');

    useEffect(() => {
        // Set the active link based on the current route
        setActive(pathname);
        console.log(pathname);
    }, [pathname]);

    if (pathname === '/login' || pathname === '/signup') {
        return <></>;
    }

    return (
        <div>
            <div className="w-full h-20 bg-black sticky top-0 z-50 drop-shadow-md">
                <div className=" px-4 h-full flex flex-row">
                    <div className="flex w-[100%] md:w-[20%] ">
                        <Logo />
                        <h1 className="hidden md:block text-white font-ubuntu italic text-2xl font-bold mt-5 ">
                        <span className="text-blue-500">Dub</span>
                                <span className="text-white">Lingo</span>
                        </h1>
                    </div>
                    <div className="flex justify-end items-center h-full md:w-[80%] w-[100%] ">
                        <button
                            type="button"
                            className="inline-flex items-center md:hidden"
                            onClick={toggle}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                                />
                            </svg>
                        </button>
                        <ul className="hidden md:flex gap-x-14 text-gray-100 font-mono font-bold   ">
                            <li>
                                <Link href="/">
                                    <p
                                        className={`${
                                            active === '/'
                                                ? 'bg-white text-gray-800 rounded-[18px]'
                                                : ' nav'
                                        }    px-6 py-2`}
                                    >
                                        Home
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/team">
                                    <p
                                        className={` ${
                                            active === '/team'
                                                ? 'bg-white text-gray-800 rounded-[18px]'
                                                : 'nav'
                                        }  px-6 py-2`}
                                    >
                                        Team
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/services">
                                    <p
                                        className={`${
                                            active === '/services'
                                                ? 'bg-white text-gray-800  rounded-[18px]'
                                                : ' nav'
                                        }  px-6 py-2`}
                                    >
                                        Services
                                    </p>
                                </Link>
                            </li>
                        </ul>

                        <div className="hidden md:block ml-20 mr-3">
                            <Button content="Try Now" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full border-b border-gray-500"></div>
        </div>
    );
};

export default Navbar;
