// pages/services.js
'use client';
// pages/services.tsx
import { useState } from 'react';
import Head from 'next/head';

interface Service {
  title: string;
  description: string;
  extraInfo: string;
  icon: string;
}

const services: Service[] = [
  {
    title: 'Arabic Transcription',
    description: 'Accurately transcribe Arabic audio content into written text. This service is ideal for extracting valuable information, creating subtitles, or facilitating the translation process.',
    extraInfo: 'Our Arabic transcription service is powered by state-of-the-art algorithms to ensure accuracy and efficiency.',
    icon: 'https://cdn4.vectorstock.com/i/1000x1000/03/33/login-form-design-vector-19450333.jpg',
  },
  {
    title: 'Urdu Transcription',
    description: 'Convert the transcribed Arabic text into Urdu, providing a comprehensive transcription service that caters specifically to Urdu speakers. This step ensures linguistic accuracy and cultural relevance.',
    extraInfo: 'Our Urdu transcription service focuses on linguistic accuracy and cultural sensitivity, catering specifically to Urdu speakers.',
    icon: 'https://cdn4.vectorstock.com/i/1000x1000/03/33/login-form-design-vector-19450333.jpg',
  },
  {
    title: 'Speaker Diarization',
    description: 'Leveraging cuttinglization.',
    extraInfo: 'Speaker Diarization is a technology that identifies and categorizes speakers in audio content, Leveraging cutting-edge technology, our Speaker Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natuLeveraging cutting-edge technology, our Speaker Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natuLeveraging cutting-edge technology, our Speaker Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natuLeveraging cutting-edge technology, our Speaker Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natuLeveraging cutting-edge technology, our Speaker Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natuLeveraging cutting-edge technology, our Speaker Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natural transitions in dubbed content. This advanced analysis captures emotional tones and nuances, providing invaluable insights for content creators and marketers. Experience a seamless fusion of technology and creativity as we bring a new dimension to language  providing insights for content creators and marketers.',
    icon: 'https://t4.ftcdn.net/jpg/04/80/13/09/360_F_480130925_9nOFeoGcEhwCzgdz5dxurBM15qV05bFj.jpg',
  },
  {
    title: 'Voice Cloning',
    description: 'Utilize cutting-edge voice cloning technology to replicate the original Arabic voice in Urdu. This process ensures a seamless transition from the source language to the target language, delivering a natural and authentic Urdu voiceover.',
    extraInfo: 'Voice cloning technology replicates the original Arabic voice in Urdu, ensuring a seamless and authentic voiceover experience in the target language.',
    icon: 'https://cdn4.vectorstock.com/i/1000x1000/03/33/login-form-design-vector-19450333.jpg',
  },
];

const ServicePopup = ({ service, onClose }: { service: Service; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full my-40 mx-auto">
        <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
        <div className="mb-4">
          <div className="max-h-60">
            <p className="text-gray-600">{service.description}</p>
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2">More Information:</h3>
        <div className="mb-4">
          <div className="max-h-60 overflow-auto">
            <p className="text-gray-600">{service.extraInfo}</p>
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

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleViewMore = (service: Service) => {
    setSelectedService(service);
  };

  const handleClosePopup = () => {
    setSelectedService(null);
  };

  return (
    <>
      <header className="bg-slate-400 text-white py-5 text-center relative transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-orange-400 duration-300">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-1">OUR SERVICES</h1>
          <p className="text-lg">Discover the range of services we offer to meet your business goals.</p>
        </div>
        {/* Left Margin */}
        <div className="h-full w-full lg:w-60 absolute top-0 left-0">
          <div className="h-full w-full bg-gradient-to-r from-slate-700 to-transparent"></div>
        </div>
        {/* Right Margin */}
        <div className="h-full w-full lg:w-60 absolute top-0 right-0">
          <div className="h-full w-full bg-gradient-to-l from-slate-700 to-transparent"></div>
        </div>
      </header>

      <div className="min-h-screen bg-gray-100 mx-10 relative">
        <Head>
          <title>Our Services</title>
          <meta name="description" content="Explore our range of services for your business." />
        </Head>
        <section className="container mx-auto py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md relative border border-gray-400 transition duration-300 hover:shadow-lg hover:scale-105"
                style={{ height: '480px' }}
              >
                <div className="border-2 border-gray-300 rounded-md mb-4 p-4 mx-auto bg-cyan-600">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-full h-24 object-contain"
                  />
                </div>
                <div className="flex-grow overflow-hidden">
                  <h2 className="text-xl font-bold mb-2 text-center">{service.title}</h2>
                  <div className="max-h-40 overflow-auto mb-4">
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <button
                    onClick={() => handleViewMore(service)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-700 block mx-auto border-2 border-green-700 hover:shadow-md transform hover:scale-105 transition duration-300"
                  >
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {selectedService && (
          <ServicePopup service={selectedService} onClose={handleClosePopup} />
        )}
      </div>
    </>
  );
};

export default Services;