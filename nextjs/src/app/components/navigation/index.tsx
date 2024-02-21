'use client';
import { useState } from 'react';
import Navbar from './navbar/page';
import Sidebar from './sidebar/page';
import Footer from './footer/page';

const Navigation = () => {
    // toggle sidebar
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            {/* <Footer toggle={toggle} /> */}

        </>
    );
    // 
};

export default Navigation;
