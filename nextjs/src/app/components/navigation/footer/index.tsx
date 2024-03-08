'use client';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Footer = () => {
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
      <>
      <div className="w-full border-b border-gray-500"></div>
        <footer className="bg-black text-white py-10">
          <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 p-4">
                <h2 className="text-lg font-bold mb-2">Useful Links</h2>
                <ul className="flex flex-wrap gap-x-4 mt-8">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/team">About Us</Link>
                  </li>
                  <li>
                    <Link href="/services">Our Services</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold mb-2">Contact Info</h2>
                <p>Email: contact@example.com</p>
                <p>Phone: +123 456 7890</p>
                <p>Address: 123 Street, City, Country</p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
              <p>
                  &copy; 2024{' '}
                  <span className="text-blue-700">Dub</span>
                  <span className="text-white">Lingo</span>
                  . All rights reserved.
              </p>
          </div>

        </footer>
        </>
      );
};

export default Footer;
