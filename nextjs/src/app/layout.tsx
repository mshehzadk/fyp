import './globals.css'
import Navigation from './components/navigation';
import type { Metadata } from 'next';



export const metadata: Metadata = {
    title: 'DubLingo',
    description: 'A dubbing web app for language learners',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html data-theme="light" lang="en">
            
            <body>
            <Navigation />
            {children}
            </body>
        </html>
    );
}
