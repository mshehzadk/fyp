'use client';
import { usePathname } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Footer = ({ toggle }: { toggle: () => void }) => {
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
        <footer className="bg-black text-white py-6 mt-1">
          <div className="container mx-auto px-4">
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
          <div className="mt-4 text-center">
            <p>&copy; 2024 DubLingo. All rights reserved.</p>
          </div>
        </footer>
      );
};

export default Footer;
