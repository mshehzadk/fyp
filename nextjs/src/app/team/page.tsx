// pages/team.js
import Head from 'next/head';

const teamMembers = [
  { name: 'Ali Tajir', role: 'Developer', image: '/images/ali.jpg' },
  { name: 'Zahid Imran', role: 'Developer', image: '/images/zahid.jpg' },
  { name: 'Muhammad Shehzad', role: 'Developer', image: '/images/shehzad.jpg' },
  { name: 'Mahreen Alam', role: 'Supervisor', image: '/images/mahreen.jpg' },
  { name: 'Greyhat', role: 'External Collaborator', image: '/images/greyhat.jpg' },
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
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover mb-4 rounded-full mx-auto"
            />
            <h2 className="text-xl font-bold mb-2">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        {teamMembers.slice(3, 5).map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover mb-4 rounded-full"
            />
            <h2 className="text-xl font-bold mb-2">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
