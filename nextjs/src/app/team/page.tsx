'use client'; // This file is a client-side file
import { useState } from 'react';
import Head from 'next/head';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const teamMembers = [
  { name: 'Ali Tajir', role: 'Developer', image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', details: 'Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer', facebook: '#', instagram: '#', linkedin: 'https://www.linkedin.com/in/ali-tajir-a464891b8/?originalSubdomain=pk', twitter: '#' },
  { name: 'Zahid Imran', role: 'Developer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtkCxRMhDDsEHuGxaoGYwt2vprah0rIEfTfw&usqp=CAU', details: 'Zahid is a passionate developer', facebook: '#', instagram: '#', linkedin: '#', twitter: '#' },
  { name: 'Muhammad Shehzad', role: 'Developer', image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', details: 'Shehzad is a skilled developer', facebook: '#', instagram: '#', linkedin: '#', twitter: '#' },
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

  // Function to handle click on "Details" button or "Close" button
  const handleDetailsClick = (member: TeamMember) => {
    setSelectedMember((prevMember) => (prevMember === member ? null : member));
  };

  // Function to generate the content for each column
  const generateColumnContent = (member: TeamMember) => (
    <div key={member.name} className="w-full md:w-80 mx-auto overflow-hidden bg-transparent rounded-lg shadow-md border border-gray-500">
      <div className="h-60 overflow-hidden">
        <img className="object-cover w-full h-full" src={member.image} alt={member.name} />
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-white">{member.name}</h1>
        <p className="mt-2 text-sm text-white">{member.role}</p>
        <div className="mt-4 flex justify-center">
          <a href={member.facebook} className="text-blue-500 hover:text-blue-700 px-2"><FaFacebook size={24} /></a>
          <a href={member.instagram} className="text-pink-500 hover:text-pink-700 px-2"><FaInstagram size={24} /></a>
          <a href={member.linkedin} className="text-blue-700 hover:text-blue-900 px-2"><FaLinkedin size={24} /></a>
          <a href={member.twitter} className="text-blue-400 hover:text-blue-600 px-2"><FaTwitter size={24} /></a>
        </div>
        <div className="mt-4">
          {selectedMember === member && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-white">Details</h2>
              <p className="text-white mt-2">{member.details}</p>
              <button onClick={() => setSelectedMember(null)} className="text-white bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-full mt-4 focus:outline-none focus:shadow-outline">
                Close
              </button>
            </div>
          )}
          {!selectedMember && (
            <button onClick={() => handleDetailsClick(member)} className="text-white bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-full focus:outline-none focus:shadow-outline">
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="page " style={{ backgroundImage: "url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1410.jpg')" }}>
      <Head>
        <title>Our Team</title>
        <meta name="description" content="Learn more about the Dublingo team." />
      </Head>

      <header className="text-center py-5 mb-2">
        <h1 className="text-4xl font-bold mb-1 text-white">Team Members</h1>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 px-4">
        {teamMembers.map((member) => (
          <div key={member.name}>{generateColumnContent(member)}</div>
        ))}
      </div>
      <section className="px-4 py-10 text-center bg-black shadow-md border-2 border-gray-500 rounded-lg mt-10 mx-auto" style={{ width: "90%" }}>
        <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor urna nec diam fringilla hendrerit.</p>
        <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor urna nec diam fringilla hendrerit.</p>
      </section>
      <br/>
      <br/>

    </div>
  );
}
