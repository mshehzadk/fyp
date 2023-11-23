// pages/team.js
import Head from 'next/head';

const teamMembers = [
  { name: 'Ali Tajir', role: 'Developer', image: 'ali.jpg', details: 'Ali is an experienced developer...' },
  { name: 'Zahid Imran', role: 'Developer', image: '/images/zahid.jpg', details: 'Zahid is a passionate developer...' },
  { name: 'Muhammad Shehzad', role: 'Developer', image: '/images/shehzad.jpg', details: 'Shehzad is a skilled developer...' },
  { name: 'Mahreen Alam', role: 'Supervisor', image: '/images/mahreen.jpg', details: 'Mahreen supervises and guides the team...' },
  { name: 'GrayHat', role: 'External Collaborator', image: '/images/greyhat.jpg', details: 'Greyhat collaborates with us on various projects...' },
];

export default function Team() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {teamMembers.slice(3, 4).map((member, index) => (
          <div key={index} className="relative bg-white p-5 rounded-lg shadow-md overflow-hidden flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover mb-4 rounded-full"
            />
            <h2 className="text-xl font-bold mb-2">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-gray-800 bg-opacity-100 p-4 text-white rounded-lg">
              <p>{member.details}</p>
            </div>
          </div>
        ))}

        {/* Logo */}
        <div className="relative p-5 rounded-lg shadow-md overflow-hidden flex flex-col items-center bg-sky-500">
          <img
            src="/images/your-logo.jpg"
            alt="Company Logo"
            className="w-32 h-32 object-cover mb-4 rounded-full"
          />
          <h2 className="text-xl font-bold mb-2">DUBLINGO TEAM</h2>
        </div>


        {teamMembers.slice(4, 5).map((member, index) => (
          <div key={index} className="relative bg-white p-5 rounded-lg shadow-md overflow-hidden flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover mb-4 rounded-full"
            />
            <h2 className="text-xl font-bold mb-2">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-gray-800 bg-opacity-100 p-4 text-white rounded-lg">
              <p>{member.details}</p>
            </div>
          </div>
        ))}

        {teamMembers.slice(0, 3).map((member, index) => (
          <div key={index} className="relative bg-white p-5 rounded-lg shadow-md overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover mb-4 rounded-full mx-auto"
            />
            <h2 className="text-xl font-bold mb-2">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-gray-800 bg-opacity-100 p-4 text-white rounded-lg">
              <p>{member.details}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
