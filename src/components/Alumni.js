'use client';

import { useEffect, useRef } from 'react';
import AlumniCard from './AlumniCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Dummy alumni data grouped by batch
const alumniData = {
    '2K21': [
        {
            name: 'Alice Verma',
            position: 'Creative Director at ArtNest',
            image: '/img/3.jpg',
            quote: 'Art speaks where words are unable to explain.',
            twitter: 'https://twitter.com/aliceverma',
            linkedin: 'https://linkedin.com/in/aliceverma',
            instagram: 'https://instagram.com/alice.verma',
            email: 'alice@example.com',
        },
        {
            name: 'John Doe',
            position: 'Art Teacher',
            image: '/img/4.jpg',
            quote: 'Art is the journey of a free soul.',
            linkedin: 'https://linkedin.com/in/johndoe',
            instagram: 'https://instagram.com/john.doe',
            email: 'john@example.com',
        },
        {
            name: 'Priya Mehta',
            position: 'Gallery Curator',
            image: '/img/5.jpg',
            quote: 'A canvas reflects the soul of its creator.',
            twitter: 'https://twitter.com/priyamehta',
            linkedin: 'https://linkedin.com/in/priyamehta',
            instagram: 'https://instagram.com/priya.mehta',
            email: 'priya@example.com',
        },
        {
            name: 'Arjun Kapoor',
            position: 'Sculptor and Educator',
            image: '/img/6.jpg',
            quote: 'Every chisel mark tells a story.',
            twitter: 'https://twitter.com/arjunkapoor',
            linkedin: 'https://linkedin.com/in/arjunkapoor',
            instagram: 'https://instagram.com/arjun.kapoor',
            email: 'arjun@example.com',
        },
        {
            name: 'Sara Ali',
            position: 'Freelance Illustrator',
            image: '/img/7.jpg',
            quote: 'Illustration is imagination with a purpose.',
            linkedin: 'https://linkedin.com/in/saraali',
            instagram: 'https://instagram.com/sara.illustrates',
            email: 'sara@example.com',
        },
        {
            name: 'Rahul Dev',
            position: 'Concept Artist',
            image: '/img/8.jpg',
            quote: 'A great concept builds great worlds.',
            twitter: 'https://twitter.com/rahuldevart',
            linkedin: 'https://linkedin.com/in/rahuldev',
            instagram: 'https://instagram.com/rahul.dev',
            email: 'rahul@example.com',
        },
        {
            name: 'Meera Sen',
            position: 'Visual Storyteller',
            image: '/img/9.jpg',
            quote: 'Stories breathe life into art.',
            linkedin: 'https://linkedin.com/in/meerarsen',
            instagram: 'https://instagram.com/meera.stories',
            email: 'meera@example.com',
        },
        {
            name: 'Dev Sharma',
            position: 'Animation Director',
            image: '/img/10.jpg',
            quote: 'Movement makes imagination visible.',
            twitter: 'https://twitter.com/devsharma',
            linkedin: 'https://linkedin.com/in/devsharma',
            instagram: 'https://instagram.com/dev.animates',
            email: 'dev@example.com',
        },
        {
            name: 'Neha Roy',
            position: 'Mixed Media Artist',
            image: '/img/11.jpg',
            quote: 'There are no limits in mixed media.',
            linkedin: 'https://linkedin.com/in/neharoy',
            instagram: 'https://instagram.com/neha.artmix',
            email: 'neha@example.com',
        },
        {
            name: 'Kabir Sinha',
            position: 'Street Artist',
            image: '/img/12.jpg',
            quote: 'Walls are my canvas.',
            twitter: 'https://twitter.com/kabirsinha',
            linkedin: 'https://linkedin.com/in/kabirsinha',
            instagram: 'https://instagram.com/kabir.streetart',
            email: 'kabir@example.com',
        },
        {
            name: 'Tanya Gill',
            position: 'Digital Artist',
            image: '/img/13.jpg',
            quote: 'Pixels are my paint.',
            twitter: 'https://twitter.com/tanyagill',
            linkedin: 'https://linkedin.com/in/tanyagill',
            instagram: 'https://instagram.com/tanya.digital',
            email: 'tanya@example.com',
        },
        {
            name: 'Ankit Rawat',
            position: 'Photographer',
            image: '/img/14.jpg',
            quote: 'Every click captures a new reality.',
            linkedin: 'https://linkedin.com/in/ankitrawat',
            instagram: 'https://instagram.com/ankit.shoots',
            email: 'ankit@example.com',
        },
        {
            name: 'Rhea D’Souza',
            position: 'Art Therapist',
            image: '/img/15.jpg',
            quote: 'Healing through expression.',
            twitter: 'https://twitter.com/rheadsouza',
            linkedin: 'https://linkedin.com/in/rheadsouza',
            instagram: 'https://instagram.com/rhea.heals',
            email: 'rhea@example.com',
        },
        {
            name: 'Vikram Iyer',
            position: 'Calligraphy Artist',
            image: '/img/16.jpg',
            quote: 'Each stroke speaks elegance.',
            linkedin: 'https://linkedin.com/in/vikramiyer',
            instagram: 'https://instagram.com/vikram.calligraphy',
            email: 'vikram@example.com',
        }
    ]
    ,
    '2K20': [
        {
            name: 'Rohit Mehra',
            position: 'Freelance Illustrator',
            image: '/img/2.jpg',
            quote: 'Colors are my voice.',
            linkedin: 'https://linkedin.com/in/rohitmehra',
            instagram: 'https://instagram.com/rohit.art',
            email: 'rohit@example.com',
        },
        // ... rest of 2K20 data
    ],
    '2K19': [
        {
            name: 'Simran Kapoor',
            position: 'Visual Designer at Pixellence',
            image: '/img/1.jpg',
            quote: 'Design is intelligence made visible.',
            twitter: 'https://twitter.com/simrankapoor',
            instagram: 'https://instagram.com/simran.design',
            email: 'simran@example.com',
        },
        // ... rest of 2K19 data
    ],
};

export default function AlumniPage() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // For each batch section
    sectionsRef.current.forEach((section, index) => {
      // Animate the batch heading
      gsap.fromTo(
        section.querySelector('.batch-heading'),
        { 
          opacity: 0, 
          y: 50 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Animate each card with stagger
      gsap.fromTo(
        section.querySelectorAll('.alumni-card'),
        { 
          opacity: 0, 
          y: 100,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none'
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
    <div className="py-16 px-4 md:px-12 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 relative inline-block">
          Painting Wing Alumni
          <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r to-[#d25c25] from-gray-300 "></span>
        </h1>
        <p className="text-xl text-gray-600">Celebrating the artistic journeys of our graduates</p>
      </div>

      {Object.entries(alumniData).map(([batch, members], batchIndex) => (
        <div 
          key={batch} 
          className="mb-20 pb-6 relative"
          ref={el => sectionsRef.current[batchIndex] = el}
        >
          {/* Decorative background element */}
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b to-[#d25c25] from-gray-300  rounded-full"></div>
          
          <h2 className="text-3xl font-semibold text-gray-700 mb-8 ml-4 batch-heading relative inline-block">
            Batch {batch}
            <span className="absolute -bottom-2 left-0 w-3/4 h-1 bg-gradient-to-r to-[#d25c25] from-gray-300  to-transparent"></span>
          </h2>
          
          <div className="flex flex-wrap gap-8 justify-center">
            {members.map((alumnus, index) => (
              <div key={index} className="alumni-card">
                <AlumniCard {...alumnus} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footer Section */}
      {/* <div className="mt-24 text-center">
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Join Our Alumni Network</h3>
          <p className="text-gray-600 mb-6">Stay connected with fellow artists and get updates on alumni events</p>
          <button className="px-6 py-3 bg-gradient-to-r to-[#d25c25] from-gray-300  text-white rounded-full hover:shadow-lg transition-all transform hover:-translate-y-1">
            Connect With Us
          </button>
        </div>
      </div> */}
    </div>
  );
}