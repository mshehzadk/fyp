'use client';
import { usePathname } from 'next/navigation'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import Button from './Button';

const Navbar = ({ toggle }: { toggle: () => void }) => {
    const pathname = usePathname()
    const [active, setActive] = useState('Home');
   
    useEffect(() => {
        
        // Set the active link based on the current route
        setActive(pathname);
        console.log(pathname)
      }, [pathname]);

    return (
        <div>
            <div className="w-full h-20 bg-nav-blue sticky top-0 drop-shadow-md">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-evenly items-center h-full">
                    
                                <div className='flex '>
                                <Logo />
                                <h1 className='hidden md:block text-gray-800 font-serif italic text-xl font-bold  mt-5 ml-2'>Dublingo</h1>
                                </div>
                                
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
                                <ul className="hidden md:flex gap-x-14 text-black font-sans ">
                                    <li>
                                        <Link href="/"  >
                                            <p className={`${active === '/' ? 'bg-blue-500 text-white' : 'bg-blue-50 text-gray-800'} shadow-inner rounded-lg px-6 py-2`}>Home</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/team">
                                            <p  className={` ${active === '/team' ? 'bg-blue-500 text-white' : 'bg-blue-50 text-gray-800'} shadow-inner rounded-lg px-6 py-2`}>Team</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services">
                                            <p className={`${active === '/services' ? 'bg-blue-500 text-white' : 'bg-blue-50 text-gray-800'} shadow-inner rounded-lg px-6 py-2`}>Services</p>
                                        </Link>
                                    </li>
                                </ul>
                        
                        <div className="hidden md:block">
                            <Button content='Try Now'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
