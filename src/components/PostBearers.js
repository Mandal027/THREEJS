"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import Navbar from './BitSindri/Navbar';

const Card = ({ dataImage, title, content }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const cardRef = useRef(null);
  const mouseLeaveDelayRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      setWidth(cardRef.current.offsetWidth);
      setHeight(cardRef.current.offsetHeight);
    }
  }, []);

  const handleMouseMove = (e) => {
    setMouseX(e.pageX - cardRef.current.offsetLeft - width/2);
    setMouseY(e.pageY - cardRef.current.offsetTop - height/2);
  };

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveDelayRef.current);
  };

  const handleMouseLeave = () => {
    mouseLeaveDelayRef.current = setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 1000);
  };

  // Computed properties
  const mousePX = mouseX / width;
  const mousePY = mouseY / height;
  
  const cardStyle = {
    transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`
  };
  
  const cardBgTransform = {
    transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`
  };
  
  const cardBgImage = {
    backgroundImage: `url(${dataImage})`
  };

  return (
    <div 
      className="transform perspective-800 preserve-3d cursor-pointer m-5"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div 
        className="relative flex-none w-60 h-80 bg-gray-800 overflow-hidden rounded-lg shadow-xl transition duration-1000 ease-out"
        style={cardStyle}
      >
        <div 
          className="absolute  w-full h-full p-5 bg-center bg-cover opacity-50 pointer-events-none transition duration-1000 ease-out"
          style={{...cardBgTransform, ...cardBgImage}}
        ></div>
        <div className="card-info absolute bottom-0 p-5 text-white transform translate-y-2/5 transition duration-600 ease-out">
          <h1 className="relative z-[1] opacity-0 font-serif text-3xl font-bold shadow-lg mb-2">{title}</h1>
          <p className="relative z-[1] opacity-0 transition-opacity duration-600 ease-out shadow-md">{content}</p>
          
          <div className="flex space-x-4 mt-3 opacity-0 transition duration-600 ease-out">
            <Facebook className="w-6 h-6 hover:text-blue-500 transition-colors" />
            <Twitter className="w-6 h-6 hover:text-blue-400 transition-colors" />
            <Instagram className="w-6 h-6 hover:text-pink-500 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

const cardData = [
  {
    image: "https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=",
    title: "Canyons",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=",
    title: "Beaches",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=",
    title: "Trees",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Lakes",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1442850473887-0fb77cd0b337?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Mountains",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1465156799763-2c087c332922?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Waterfalls",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Rivers",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1497911270199-1c552ee64aa4?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Oceans",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1465572089651-8fde36c892dd?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Forests",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1482784160316-6eb046863ece?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Deserts",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1441906363162-903afd0d3d52?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Meadows",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1487159301507-afa72d0064da?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Cities",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1499559665579-5b272bc4380c?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Countryside",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1515889005756-380054143c2c?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Islands",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Valleys",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  },
  {
    image: "https://images.unsplash.com/photo-1480359014333-3935abd88252?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=",
    title: "Glaciers",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
  }
];

const HoverCards = () => {
  return (
    <>
      <Navbar />
    
      <div className="bg-amber-100 pt-[8rem] py-10 font-sans">
        <h1 className=" text-7xl font-roashe font-bold text-amber-900 text-center mb-6">OFFICE BEARERS</h1>
        <div className="px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {cardData.map((card, index) => (
            <Card 
              key={index}
              dataImage={card.image}
              title={card.title}
              content={card.content}
            />
          ))}
        </div>
        <style jsx global>{`
          /* These custom styles are needed for 3D transforms that aren't in Tailwind by default */
          .perspective-800 {
            perspective: 800px;
          }
          .preserve-3d {
            transform-style: preserve-3d;
          }
          
          /* Hover effects for card info and content */
          .transform:hover .card-info {
            transform: translateY(0);
          }
          
          .transform:hover .opacity-0 {
            opacity: 1;
          }
          
          .transform:hover .shadow-xl {
            box-shadow: rgba(255, 255, 255, 0.2) 0 0 40px 5px, 
                        rgba(255, 255, 255, 1) 0 0 0 1px, 
                        rgba(0, 0, 0, 0.66) 0 30px 60px 0, 
                        inset #333 0 0 0 5px, 
                        inset white 0 0 0 6px;
          }
          
          .transform:hover .opacity-50 {
            opacity: 0.8;
          }
          
          /* Creating the gradient overlay for text readability */
          .card-info:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 100%);
            opacity: 0;
            transform: translateY(100%);
            transition: opacity 0.5s ease-out;
          }
          
          .transform:hover .card-info:after {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
      </div>
    </>
  );
};

export default HoverCards;
