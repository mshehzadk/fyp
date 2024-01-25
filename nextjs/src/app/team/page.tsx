import Head from 'next/head';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const teamMembers = [
  { name: 'Ali Tajir', role: 'Developer', image: '/team-pictures/ali.jpg', details: 'Ali is an experienced developer', facebook: '#', instagram: '#', linkedin: 'https://www.linkedin.com/in/ali-tajir-a464891b8/?originalSubdomain=pk', twitter: '#' },
  { name: 'Zahid Imran', role: 'Developer', image: '/team-pictures/zahid.jpg', details: 'Zahid is a passionate developer', facebook: '#', instagram: '#', linkedin: '#', twitter: '#' },
  { name: 'Muhammad Shehzad', role: 'Developer', image: '/team-pictures/shehzad.jpg', details: 'Shehzad is a skilled developer', facebook: '#', instagram: '#', linkedin: '#', twitter: '#' },
  { name: 'Mahreen Alam', role: 'Supervisor', image: '/team-pictures/mahreen.jpg', details: 'Mahreen supervises and guides the team', facebook: '#', instagram: '#', linkedin: '#', twitter: '#' },
  { name: 'GrayHat', role: 'External Collaborator', image: '/team-pictures/greyhat.jpg', details: 'Grayhat collaborates with us on DUBLINGO project', facebook: '#', instagram: '#', linkedin: '#', twitter: '#' },
];

export default function Team() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 relative">
      {/* Left Margin */}
      <div className="h-full w-40 absolute top-25 left-0 bg-slate-400"></div>

      {/* Right Margin */}
      <div className="h-full w-20 absolute top-25 right-0 bg-slate-400"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-12 ">
        {/* Left Column (Team Members) */}
        <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  bg-cyan-200">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative bg-white p-5 rounded-lg shadow-md overflow-hidden flex flex-col items-center transition duration-300 transform hover:scale-125 hover:shadow-xl hover:border-blue-500 border border-transparent hover:border-2"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover mb-4 rounded-full bg-cyan-200"
              />
              <h2 className="text-xl font-bold mb-2">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 absolute inset-0 bg-gray-800 bg-opacity-100 p-4 text-white rounded-lg">
                <div className="flex mt-4">
                  <a href={member.facebook} className="mr-2" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                  </a>
                  <a href={member.instagram} className="mr-2" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href={member.linkedin} className="mr-2" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                </div>
                <br />
                <p>{member.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (DUBLINGO Card) */}
        <div className="md:col-span-1  bg-cyan-200">
          <div
            className="relative bg-white p-5 rounded-lg shadow-md overflow-hidden flex flex-col items-center md:w-48 lg:w-64 transition duration-300 transform hover:scale-125 hover:shadow-xl hover:border-blue-500 border border-transparent hover:border-2"
          >
            <img
              src="/images/your-logo.jpg"
              alt="Company Logo"
              className="w-32 h-32 object-cover mb-4 rounded-full bg-cyan-200"
            />
            <h2 className="text-xl font-bold mb-0">DUBLINGO TEAM</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
