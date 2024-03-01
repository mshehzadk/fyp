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
    title: 'Arabic Translation',
    description: 'Accurately transcribe Arabic audio content into written text. This service is ideal for extracting valuable information, creating subtitles, or facilitating the translation process.',
    extraInfo: 'Our Arabic transcription service is powered by state-of-the-art algorithms to ensure accuracy and efficiency.',
    icon: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/263128236/original/87ed6035dc05dee63904f7e0239ae90b45962761/do-your-translation-work-professionally.jpg',
  },
  {
    title: 'Urdu Transcription',
    description: 'Convert the transcribed Arabic text into Urdu, providing a comprehensive transcription service that caters specifically to Urdu speakers. This step ensures linguistic accuracy and cultural relevance.',
    extraInfo: 'Our Urdu transcription service focuses on linguistic accuracy and cultural sensitivity, catering specifically to Urdu speakers.',
    icon: 'https://www.hansemgb.com/wp-content/uploads/2022/05/img_220513_3.png',
  },
  {
    title: 'Speaker Diarization',
    description: 'Leveralessutting-edge voice cloning technology to replicate the original Arabic voice in Urdu. This process ensures a seamless transition from the source language.',
    extraInfo: 'Speaker Diarization is a technology that identifies and categorizes speakers in audio content, Leveraging cutting-edge technology, our Speaker Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natuLeveraging cutting-edge technology, our Speaker Utilize cutting-edge voice cloning technology to replicate the original Arabic voice in Urdu. Utilize cutting-edge voice cloning technology to replicate the original Arabic voice in Urdu. This process ensures a seamless transition from the source language This process ensures a seamless transition from the source language Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natuLeveraging cutting-edge technology, our Speaker Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natuLeveraging cutting-edge technology, our Speaker Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natuLeveraging cutting-edge technology, our Speaker Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natuLeveraging cutting-edge technology, our Speaker Diarization feature precisely identifies and categorizes speakers, ensuring seamless and natural transitions in dubbed content. This advanced analysis captures emotional tones and nuances, providing invaluable insights for content creators and marketers. Experience a seamless fusion of technology and creativity as we bring a new dimension to language  providing insights for content creators and marketers.',
    icon: 'https://picovoice.ai/static/138e9b91ba722a68d071fcc0634f5ea5/b5380/thumbnail_speaker-diarization-in-python.png',
  },
  {
    title: 'Voice Cloning',
    description: 'Utiliplicate the original Arabic voice in Urdu. This process ensures a seamless transition from the source language.',
    extraInfo: 'Voice cloning technology replicates the original Arabic voice in Urdu, ensuring a seamless and authentic voiceover experience in the target language.',
    icon: 'https://www.idrnd.ai/wp-content/uploads/2020/03/VoiceCloning-DataCollection-scaled.jpeg',
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
    <div className="page py-6" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1410.jpg')" }}>
        <Head>
          <title>Our Services</title>
          <meta name="description" content="Explore our range of services for your business." />
        </Head>
        <header className="bg-gray-900 rounded-lg border border-gray-500 text-white py-3 mt-0 mb-2 mx-auto" style={{ width: "90%" }}>
            <div className="container mx-auto text-center">
              <h1 className="text-2xl font-bold mb-3">ARABIC DUBBED VIDEO</h1>
            </div>
        </header>

      <div className="form mx-20">
        <section className="container mx-auto py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-700 hover:bg-gray-900 p-5 rounded-lg shadow-md relative border border-gray-500 transition duration-300 hover:shadow-lg hover:scale-105"
                style={{ height: '455px' }}>
                  <div className="border border-gray-400 rounded-md mb-4 p-4 mx-auto bg-black">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-full h-24 object-contain"
                    />
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <h2 className="text-xl font-bold mb-5 text-center text-white">{service.title}</h2>
                    <div className="max-h-40 overflow-auto mb-4">
                      <p className="text-white">{service.description}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 pb-4">
                    <button
                      onClick={() => handleViewMore(service)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 block mx-auto border border-gray-400 hover:shadow-md transform hover:scale-105 transition duration-300"
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
    </div>
  );
};

export default Services;