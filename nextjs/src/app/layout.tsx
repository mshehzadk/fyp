import './globals.css'
import type { Metadata } from 'next';



export const metadata: Metadata = {
    title: 'Dublingo',
    description: 'A dubbing web app for language learners',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
