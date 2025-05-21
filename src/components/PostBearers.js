'use client';

import { useEffect, useRef } from 'react';
import AlumniCard from './AlumniCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Dummy alumni data grouped by batch
const alumniData = {
  '2K21': [
    {
      name: 'Aashish Kumar Lohra',
      position: 'Information Technology',
      image: '/img/3.jpg',
      quote: 'Chairperson',
      // twitter: 'https://twitter.com/aliceverma',
      linkedin: 'https://linkedin.com/in/aliceverma',
      instagram: 'https://instagram.com/alice.verma',
      email: 'alice@example.com',
    },
    {
      name: 'Nilesh Kumar Mandal',
      position: 'Electrical',
      image: '/img/5.jpg',
      quote: 'Vice Chairperson',
      instagram: 'https://instagram.com/neha.design',
      twitter: 'https://twitter.com/tanmayjoshi',
      email: 'tanmay@example.com',
    },
    {
      name: 'Poonam Kumari',
      position: 'Electrical',
      image: '/img/4.jpg',
      quote: 'Vice Chairperson',
      linkedin: 'https://linkedin.com/in/nehabansal',
      instagram: 'https://instagram.com/neha.design',
      email: 'neha@example.com',
    },
    
    {
      name: 'Jai Prakash Oraon',
      position: 'Civil',
      image: '/img/6.jpg',
      quote: 'Secretary',
      instagram: 'https://instagram.com/neha.design',
      linkedin: 'https://linkedin.com/in/sanyakapoor',
      email: 'sanya@example.com',
    },
    {
      name: 'Samriddhi Kumari',
      position: 'Chemical',
      image: '/img/7.jpg',
      quote: 'Secretary',
      instagram: 'https://instagram.com/rajat.motion',
            linkedin: 'https://linkedin.com/in/sanyakapoor',
      email: 'rajat@example.com',
    },
    {
      name: 'Tithi',
      position: 'Chemical',
      image: '/img/7.jpg',
      quote: 'Joint Secretary',
      instagram: 'https://instagram.com/rajat.motion',
            linkedin: 'https://linkedin.com/in/sanyakapoor',
      email: 'rajat@example.com',
    },
    {
      name: 'Anil Chandra Kisku',
      position: 'Mechanical',
      image: '/img/8.jpg',
      quote: 'Technical Head',
        instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'pooja@example.com',
    },
    {
      name: 'Aman Murmu',
      position: 'Mining',
      image: '/img/9.jpg',
      quote: 'Treasurer',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'aryan@example.com',
    },
    {
      name: 'Komal Xalxo',
      position: 'Civil',
      image: '/img/10.jpg',
      quote: 'Joint Treasurer',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'mitali@example.com',
    },
    {
      name: 'Riya Gari',
      position: 'Civil',
      image: '/img/11.jpg',
      quote: 'Alumni Head',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'kunal@example.com',
    },
    {
      name: 'Sahil Sah',
      position: 'Chemical',
      image: '/img/12.jpg',
      quote: ' Alumni Head',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
    },
    {
      name: 'Shweta Kumari',
      position: 'Cse',
      image: '/img/12.jpg',
      quote: 'Media Head',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
    },
    {
      name: 'Sunaram Hansda',
      position: 'Mechnical',
      image: '/img/12.jpg',
      quote: 'Media Head',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
    },
    {
      name: 'Grecy Rose Tirkey',
      position: 'ECE',
      image: '/img/12.jpg',
      quote: 'PRO',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
    },
    {
      name: 'Rahul Kumar Mandal',
      position: 'chemical',
      image: '/img/12.jpg',
      quote: 'PRO',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
    },
    {
      name: 'Smriti Pal',
      position: 'Production',
      image: '/img/12.jpg',
      quote: 'Creative Head',
              instagram: 'https://instagram.com/rajat.motion',
      linkedin: 'https://linkedin.com/in/poojarathi',
      email: 'rhea@example.com',
    },
  ],
 

};


export default function PostBearers() {
  const sectionsRef = useRef([]);
  const heroRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate the hero section
    gsap.fromTo(
      heroRef.current.querySelector('h1'),
      { opacity: 0, y: -30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out'
      }
    );
    
    gsap.fromTo(
      heroRef.current.querySelector('p'),
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        delay: 0.3,
        ease: 'power3.out'
      }
    );

    // For each batch section
    sectionsRef.current.forEach((section, index) => {
      // Animate the batch heading with a more sophisticated entrance
      gsap.fromTo(
        section.querySelector('.batch-heading'),
        { 
          opacity: 0, 
          x: -50,
          skewX: -10
        },
        { 
          opacity: 1, 
          x: 0,
          skewX: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Custom stagger effect for cards to create a wave-like appearance
      gsap.fromTo(
        section.querySelectorAll('.alumni-card'),
        { 
          opacity: 0, 
          y: 100,
          scale: 0.9,
          rotation: -2
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: {
            amount: 0.6, // Total stagger time spread across all elements
            from: 'center', // Start from the center for a wave effect
            grid: 'auto'
          },
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Animate the decorative line
      gsap.fromTo(
        section.querySelector('.decorative-line'),
        {
          scaleY: 0,
          transformOrigin: 'top'
        },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="overflow-hidden">
    
      <div className="py-16 px-4 md:pt-28 md:px-12 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 mt-10 relative inline-block">
            Office Bearers
            <span className="absolute rounded-full -bottom-2 left-0 right-0 h-1 bg-gradient-to-r to-[#e65512] from-gray-300"></span>
          </h1>
          <p className='text-gray-600 mt-5'> Meet the dedicated post bearers who lead our organization with vision, commitment, and excellence. Their leadership and teamwork drive our mission forward.</p>
        </div>

        {Object.entries(alumniData).map(([batch, members], batchIndex) => (
          <div 
            key={batch} 
            className="mb-20 pb-6 relative batch-section"
            ref={el => sectionsRef.current[batchIndex] = el}
          >
            {/* Decorative background element with class for animation */}
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b to-[#e65512] from-gray-100 rounded-full decorative-line"></div>
{/*             
            <h2 className="text-3xl font-semibold text-gray-700 mb-8 ml-4 batch-heading relative inline-block">
              Batch {batch}
              <span className="absolute -bottom-2 left-0 w-3/4 h-1 bg-gradient-to-r to-[#e65512] from-gray-300 "></span>
            </h2> */}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {members.map((alumnus, index) => (
                <div 
                  key={index} 
                  className="alumni-card w-full max-w-xs"
                  data-speed={1 + (index % 3) * 0.1} // Varied parallax speeds for visual interest
                >
                  <AlumniCard {...alumnus} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}