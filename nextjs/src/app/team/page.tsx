'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const teamMembers = [
  { name: 'Ali Tajir', role: 'Developer', image: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', details: 'Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer Ali is an experienced developer', facebook: '#', instagram: '#', linkedin: 'https://www.linkedin.com/in/ali-tajir-a464891b8/?originalSubdomain=pk', twitter: '#' },
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

const MemberDetailsPopup = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto p-4">
      <div className="bg-gray-900 border border-gray-400 p-4 md:p-6 rounded-lg shadow-md w-full max-w-lg md:max-w-2xl mx-auto my-8 md:my-20">
        <h2 className="text-xl md:text-2xl text-white font-bold mb-2 text-center">{member.name} - {member.role}</h2>
        <div className="overflow-auto max-h-[60vh]">
          <div className="mb-4 text-center">
            <img src={member.image} alt={member.name} className="mx-auto max-h-40 w-auto object-cover mb-4 border border-gray-500"/>
            <p className="text-gray-600 text-white  max-h-20">{member.details}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 block mx-auto mt-4 border-2 border-blue-700 hover:shadow-md transform hover:scale-105 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};





export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="page pt-7" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1410.jpg')" }}>
      <Head>
        <title>Our Team</title>
        <meta name="description" content="Learn more about the Dublingo team." />
      </Head>
      {/* Header and other parts remain unchanged */}
      <header className="bg-gray-900 rounded-lg border  border-gray-500 text-white py-3 mb-7 mt-0 mx-auto" style={{ width: "90%" }}>
            <div className="container mx-auto text-center">
              <h1 className="text-2xl font-bold mb-3">Team Members</h1>
            </div>
      </header>
      
      <div className="grid grid-cols-1 gap-0 md:grid-cols-3 px-20 mb-10 pb-10">
        {teamMembers.map((member) => (
          <div key={member.name} className="w-full md:w-80 mb-10 mx-auto overflow-hidden bg-transparent rounded-lg shadow-md border border-gray-500 relative">
            <div className="h-60 overflow-hidden">
              <img className="object-cover w-full h-full" src={member.image} alt={member.name} />
            </div>
            <div className="p-6 text-white">
              <h2 className="text-2xl font-semibold">{member.name}</h2>
              <p className="text-sm">{member.role}</p>
              <div className="mt-4 flex justify-center">
                <a href={member.facebook} className="text-blue-500 hover:text-blue-700 px-2"><FaFacebook size={24} /></a>
                <a href={member.instagram} className="text-pink-500 hover:text-pink-700 px-2"><FaInstagram size={24} /></a>
                <a href={member.linkedin} className="text-blue-700 hover:text-blue-900 px-2"><FaLinkedin size={24} /></a>
                <a href={member.twitter} className="text-blue-400 hover:text-blue-600 px-2"><FaTwitter size={24} /></a>
              </div>
              <div className="mt-4 flex justify-center">
                {/* Social Icons */}
              </div>
              <div className="mt-4">
                <button onClick={() => setSelectedMember(member)} className="text-white bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-full focus:outline-none focus:shadow-outline">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedMember && <MemberDetailsPopup member={selectedMember} onClose={() => setSelectedMember(null)} />}
      <section className="px-4 py-10 text-center bg-black shadow-md border-2 border-gray-500 rounded-lg mt-10 mx-auto" style={{ width: "90%" }}>
            <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor urna nec diam fringilla hendrerit.</p>
      </section>
    
          <br/>
          <br/>

    </div>

  );
}









