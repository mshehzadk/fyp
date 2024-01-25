'use client';
import { useState } from 'react';
import Head from 'next/head';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const teamMembers = [
  { name: 'Ali Tajir', role: 'Developer', image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', details: 'Ali is an experienced developer', facebook: '#', instagram: '#', linkedin: 'https://www.linkedin.com/in/ali-tajir-a464891b8/?originalSubdomain=pk', twitter: '#' },
  { name: 'Zahid Imran', role: 'Developer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtkCxRMhDDsEHuGxaoGYwt2vprah0rIEfTfw&usqp=CAU', details: 'Zahid is a passionate developer', facebook: '#', instagram: '#', linkedin: '#', twitter: '#' },
  { name: 'Muhammad Shehzad', role: 'Developer', image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', details: 'Shehzad is a skilled developer', facebook: '#', instagram: '#', linkedin: '#', twitter: '#' },
  { name: 'Mahreen Alam', role: 'Supervisor', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtkCxRMhDDsEHuGxaoGYwt2vprah0rIEfTfw&usqp=CAU', details: 'Mahreen supervises and guides the team', facebook: '#', instagram: '#', linkedin: '#', twitter: '#' },
  { name: 'GrayHat', role: 'External Collaborator', image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', details: 'Grayhat collaborates with us on DUBLINGO project', facebook: '#', instagram: '#', linkedin: '#', twitter: '#' },
];
interface TeamMember {
  name: string;
  role: string;
  image: string;
  details: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
}

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleDetailsClick = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const handleCloseDetails = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <Head>
        <title>Our Team</title>
        <meta name="description" content="Learn more about the Dublingo team." />
      </Head>

      {/* Header */}
      <header className="bg-slate-400 text-white py-3 text-center relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-orange-400 duration-300">
        {/* ... (previous code) */}
      </header>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl hover:border-blue-500 border border-transparent hover:border-2 overflow-hidden`}
          >
            <div className="relative h-60 mb-4">
              <div
                className="absolute inset-0 bg-cover bg-center z-0 rounded-t-lg"
                style={{ backgroundImage: `url(${member.image})` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="relative z-10 text-black flex flex-col justify-end h-full">
                <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                <p className="text-lg">{member.role}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-4">
                <a href={member.facebook} className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={24} />
                </a>
                <a href={member.instagram} className="text-pink-500 hover:text-pink-700" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} />
                </a>
                <a href={member.linkedin} className="text-blue-700 hover:text-blue-900" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} />
                </a>
                <a href={member.twitter} className="text-blue-400 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={24} />
                </a>
              </div>
              <button onClick={() => handleDetailsClick(member)} className="text-white bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-full focus:outline-none focus:shadow-outline">Details</button>
            </div>
            
            {/* Details Section */}
            {selectedMember === member && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Details</h3>
                <p>{member.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ... (previous code) */}
    </>
  );
}