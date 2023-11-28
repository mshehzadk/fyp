// pages/services.js
import Head from 'next/head';

const services = [
  {
    title: 'Arabic Transcription',
    description: 'Accurately transcribe Arabic audio content into written text. This service is ideal for extracting valuable information, creating subtitles, or facilitating the translation process.',
    icon: '/icons/mobile-app-icon.svg',
  },
  {
    title: 'Urdu Transcription',
    description: 'Convert the transcribed Arabic text into Urdu, providing a comprehensive transcription service that caters specifically to Urdu speakers. This step ensures linguistic accuracy and cultural relevance.',
    icon: '/icons/ui-ux-icon.svg',
  },
  {
    title: 'Emotion Detection',
    description: 'Employ advanced technology to analyze the emotional tone and nuances within the content. This service identifies and categorizes emotions expressed in the video, offering valuable insights for content creators and marketers.',
    icon: '/icons/digital-marketing-icon.svg',
  },
  {
    title: 'Voice Cloning',
    description: 'Utilize cutting-edge voice cloning technology to replicate the original Arabic voice in Urdu. This process ensures a seamless transition from the source language to the target language, delivering a natural and authentic Urdu voiceover.',
    icon: '/icons/web-development-icon.svg',
  },
  
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Head>
        <title>Our Services</title>
        <meta name="description" content="Explore our range of services for your business." />
      </Head>

      <header className=" bg-slate-400 text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">OUR SERVICES</h1>
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
