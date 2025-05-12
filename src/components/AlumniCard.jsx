'use client';

import Atropos from 'atropos/react';
import 'atropos/css'; // Don't forget the CSS!
import { FaTwitter, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function AlumniCard({ name, image, position, quote, twitter, linkedin, instagram, email }) {
  return (

    <div className='flex flex-col items-center w-[300px] h-[400px] rounded-xl shadow-lg  group transition-all duration-300 ease-in-out transform hover:scale-105'>

      <Atropos
        className="my-atropos w-[250px] h-[250px] mt-5 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all"
        activeOffset={40}
        shadowScale={1.1}
      >
        <div className="relative h-full w-full">
          <img
            src={image}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Content overlay */}
        </div>
      </Atropos>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-black">
            <h2 data-atropos-offset="8" className="text-2xl font-semibold mb-2">
              {name}
            </h2>
            <h3 data-atropos-offset="6" className="text-sm text-gray-500 mb-2">
              {position}
            </h3>
            {/* <p data-atropos-offset="4" className="text-sm italic text-gray-500">
              "{quote}"
            </p> */}

            {/* Social media and contact icons */}
            <div className="mt-4 flex justify-center gap-4">
              {twitter && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-500 transition-all">
                  <FaTwitter size={20} />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-700 transition-all">
                  <FaLinkedin size={20} />
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-orange-500 transition-all">
                  <FaInstagram size={20} />
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="text-gray-700 hover:text-red-500 transition-all">
                  <FaEnvelope size={20} />
                </a>
              )}
            </div>
          </div>
    </div>
  );
}
