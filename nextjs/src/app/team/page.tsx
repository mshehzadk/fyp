// pages/team.js
import Head from 'next/head';

const teamMembers = [
  { name: 'Ali Tajir', role: 'Developer', image: '/images/ali.jpg', details: 'Ali is an experienced developer...' },
  { name: 'Zahid Imran', role: 'Developer', image: '/images/zahid.jpg', details: 'Zahid is a passionate developer...' },
  { name: 'Muhammad Shehzad', role: 'Developer', image: '/images/shehzad.jpg', details: 'Shehzad is a skilled developer...' },
  { name: 'Mahreen Alam', role: 'Supervisor', image: '/images/mahreen.jpg', details: 'Mahreen supervises and guides the team...' },
  { name: 'Greyhat', role: 'External Collaborator', image: '/images/greyhat.jpg', details: 'Greyhat collaborates with us on various projects...' },
];

export default function Team() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <Head>
        <title>Dubingo Team</title>
        <meta name="description" content="Meet the Dubingo team members" />
      </Head>

      <h1 className="text-4xl font-bold mb-8">Dubingo Team</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {teamMembers.slice(0, 3).map((member, index) => (
          <div key={index} className="relative bg-white p-6 rounded-lg shadow-md overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover mb-4 rounded-full mx-auto"
            />
            <h2 className="text-xl font-bold mb-2">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-gray-800 bg-opacity-75 p-4 text-white rounded-lg">
              <p>{member.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        {teamMembers.slice(3, 5).map((member, index) => (
          <div key={index} className="relative bg-white p-6 rounded-lg shadow-md overflow-hidden flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover mb-4 rounded-full"
            />
            <h2 className="text-xl font-bold mb-2">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
            <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-gray-800 bg-opacity-75 p-4 text-white rounded-lg">
              <p>{member.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
