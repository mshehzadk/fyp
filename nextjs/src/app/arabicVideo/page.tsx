

'use client';
// Importing 'useEffect' hook from React
import { useEffect } from 'react';
import ArabicVideo from '../components/arabicVideo/arabicVideo';

// Defining the component
export default function arabicTransaltion() {
    // Using the useEffect hook to set the background image to the body element
    useEffect(() => {
        // Applying the background image to the body
        document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1410.jpg')";
        // Setting the background size to cover the entire viewport
        return () => {
            // Resetting styles when the component is unmounted
            document.body.style.backgroundImage = '';
        };
    }, []); // Empty dependency array to ensure the effect runs only once when the component mounts
    // Rendering the component
    return (

        <main className="flex flex-col items-center justify-between">
            <ArabicVideo />
        </main>
    );
}