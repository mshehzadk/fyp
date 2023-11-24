// pages/services.js
import Head from 'next/head';

const services = [
  {
    title: 'Web Development',
    description: 'Build modern and responsive websites tailored to your business needs.',
    icon: '/icons/web-development-icon.svg',
  },
  {
    title: 'Mobile App Development',
    description: 'Create cross-platform mobile applications for iOS and Android.',
    icon: '/icons/mobile-app-icon.svg',
  },
  {
    title: 'UI/UX Design',
    description: 'Design intuitive and user-friendly interfaces to enhance user experience.',
    icon: '/icons/ui-ux-icon.svg',
  },
  {
    title: 'Digital Marketing',
    description: 'Boost your online presence with effective digital marketing strategies.',
    icon: '/icons/digital-marketing-icon.svg',
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Head>
        <title>Our Services</title>
        <meta name="description" content="Explore our range of services for your business." />
      </Head>

      <header className="bg-blue-500 text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg">Discover the range of services we offer to meet your business goals.</p>
        </div>
      </header>

      <section className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition duration-300 transform hover:scale-105 hover:shadow-xl hover:border-blue-500 border border-transparent hover:border-2">
              <img
                src={service.icon}
                alt={service.title}
                className="w-16 h-16 object-contain mb-4"
              />
              <h2 className="text-xl font-bold mb-2 text-center">{service.title}</h2>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
