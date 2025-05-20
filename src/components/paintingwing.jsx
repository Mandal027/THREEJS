'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Custom hook for scroll animation
function useScrollAnimation(threshold = 0.1) {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);

  return [setRef, isVisible];
}

const PaintingWingClub = () => {
  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -75]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Stagger variants for list animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // For card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Canvas painting animation
  const [isCanvasActive, setCanvasActive] = useState(false);
  
  useEffect(() => {
    setCanvasActive(true);
  }, []);

  // Event data
  const offlineEvents = [
    {
      title: "Samarpan",
      description: "Annual 2-day art exhibition featuring student artwork alongside thrilling art competitions that showcase creativity and talent across the campus.",
      image: "/api/placeholder/600/400",
      color: "#FF6B6B"
    },
    {
      title: "Creations",
      description: "An inter-school event offering free painting workshops to encourage artistic expression and skills development among students of all levels.",
      image: "/api/placeholder/600/400",
      color: "#4ECDC4"
    },
    {
      title: "Akriti",
      description: "Special event for first-year girls with competitions in Best Dress, Card Making, Rangoli, and more, celebrating feminine creativity and artistry.",
      image: "/api/placeholder/600/400", 
      color: "#FFD166"
    },
    {
      title: "Graffiti",
      description: "Wall painting sessions across campus centered around 'Science & Tech' themes, transforming bare walls into vibrant artistic statements.",
      image: "/api/placeholder/600/400",
      color: "#6A0572"
    }
  ];

  const onlineEvents = [
    {
      title: "Faceoff",
      description: "A fun introduction event for freshers to get comfortable with the club, featuring casual art challenges and creativity games.",
      image: "/api/placeholder/600/400",
      color: "#1A535C"
    },
    {
      title: "Shades",
      description: "National one-month-long online event with 5 categories: Sketching, Painting, Digital Art, Doodling, and Graffiti, attracting participants countrywide.",
      image: "/api/placeholder/600/400", 
      color: "#F46036"
    },
    {
      title: "Insignia",
      description: "Logo designing competition challenging participants to create impactful visual identities for events and initiatives.",
      image: "/api/placeholder/600/400",
      color: "#2E294E"
    }
  ];

  const initiatives = [
    {
      title: "Sketcher's Saturday",
      description: "Weekly shoutout posts featuring artwork from club members and the broader campus community.",
      icon: "✏️"
    },
    {
      title: "Awareness Weeks",
      description: "Monthly themed poster campaigns addressing important social topics like Pride Month, Mental Health Awareness, and Environmental Conservation.",
      icon: "🎨"
    }
  ];

  const lastEventImages = [
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ];

  // Refs for scroll animations
  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [offlineRef, offlineVisible] = useScrollAnimation();
  const [onlineRef, onlineVisible] = useScrollAnimation();
  const [initiativesRef, initiativesVisible] = useScrollAnimation();
  const [glimpsesRef, glimpsesVisible] = useScrollAnimation();
  const [joinRef, joinVisible] = useScrollAnimation();

  // Random paint blobs for hero section
  const PaintBlobs = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isCanvasActive && Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`,
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              transition: { 
                duration: 1.5 + Math.random() * 2,
                delay: Math.random() * 2
              }
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#fafafa" }}
      >
        <PaintBlobs />
        
        <motion.div 
          className="relative z-10 text-center px-6 max-w-4xl"
          style={{ y: y1, opacity }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Painting Wing Club
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-3xl font-light italic mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            "Let Satisfaction Prevail"
          </motion.p>
          
          <motion.p 
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Expressing the unspoken through colors and shapes, we cultivate artistic passion and creativity at BIT Sindri.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <a href="#events" className="px-8 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors shadow-lg">
              View Events
            </a>
            <a href="#join" className="px-8 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition-colors shadow-lg">
              Join Us
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate={aboutVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl font-bold mb-12 inline-block border-b-4 border-pink-500 pb-2"
            >
              About Us
            </motion.h2>
            
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-semibold mb-6 text-purple-600"
            >
              "Develop and promote art culture on campus"
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg mb-8 max-w-3xl mx-auto"
            >
              As the only fine-arts club at BIT Sindri, Painting Wing welcomes everyone – from accomplished artists to complete beginners. We believe that creativity knows no boundaries and that everyone has an artistic voice waiting to be discovered.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg mb-8 max-w-3xl mx-auto"
            >
              Through our diverse events, workshops, and initiatives, we strive to create a vibrant artistic community that celebrates expression, fosters skill development, and provides a colorful escape from academic routines.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Offline Events Section */}
      <section id="events" ref={offlineRef} className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate={offlineVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl font-bold mb-3 inline-block border-b-4 border-purple-500 pb-2"
            >
              Offline Events
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600"
            >
              Immersive artistic experiences that bring our campus to life
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {offlineEvents.map((event, index) => (
              <motion.div
                key={event.title}
                variants={cardVariants}
                initial="hidden"
                animate={offlineVisible ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-xl"
              >
                <div className="h-64 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 z-10" 
                    style={{ 
                      background: `linear-gradient(to bottom, transparent 50%, ${event.color} 100%)`,
                      opacity: 0.8
                    }} 
                  />
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    width={600} 
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: event.color }}>{event.title}</h3>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Events Section */}
      <section ref={onlineRef} className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate={onlineVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl font-bold mb-3 inline-block border-b-4 border-pink-500 pb-2"
            >
              Online Events
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600"
            >
              Digital creative challenges that connect artists across boundaries
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {onlineEvents.map((event, index) => (
              <motion.div
                key={event.title}
                variants={cardVariants}
                initial="hidden"
                animate={onlineVisible ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-48 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 z-10" 
                    style={{ 
                      background: `linear-gradient(to bottom, transparent 50%, ${event.color} 100%)`,
                      opacity: 0.7
                    }} 
                  />
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    width={600} 
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2" style={{ color: event.color }}>{event.title}</h3>
                  <p className="text-gray-700 text-sm">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly & Monthly Initiatives */}
      <section ref={initiativesRef} className="py-20 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate={initiativesVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl font-bold mb-3 inline-block border-b-4 border-white pb-2"
            >
              Weekly & Monthly Initiatives
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg opacity-90"
            >
              Consistent creative activities that keep our community engaged
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={initiativesVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl"
              >
                <div className="text-5xl mb-4">{initiative.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{initiative.title}</h3>
                <p className="text-gray-100">{initiative.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Last Event Glimpses */}
      <section ref={glimpsesRef} className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate={glimpsesVisible ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl font-bold mb-3 inline-block border-b-4 border-purple-500 pb-2"
            >
              Last Event Glimpses
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Our most recent event brought together over 150 artistic minds for a weekend of creativity, learning, and expression. Here's a look at some magical moments!
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={glimpsesVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {lastEventImages.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden rounded-lg shadow-md aspect-square relative"
              >
                <Image 
                  src={image} 
                  alt={`Event image ${index + 1}`} 
                  width={400} 
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                  <p className="text-white font-medium">Artwork {index + 1}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join" ref={joinRef} className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate={joinVisible ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl font-bold mb-3 inline-block border-b-4 border-pink-500 pb-2"
            >
              Join Our Creative Community
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
            >
              Whether you're an experienced artist or just beginning your creative journey, we welcome you to be part of the Painting Wing family!
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="mb-12"
            >
              <a 
                href="#" 
                className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Fill Interest Form
              </a>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-6 mb-8"
            >
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg w-40">
                <div className="text-3xl mb-2">📷</div>
                <p className="font-medium">Instagram</p>
                <p className="text-sm text-gray-500">@paintingwingclub</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg w-40">
                <div className="text-3xl mb-2">🔗</div>
                <p className="font-medium">Facebook</p>
                <p className="text-sm text-gray-500">PaintingWingBITS</p>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg w-40">
                <div className="text-3xl mb-2">✉️</div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-gray-500">pwc@bitsindri.ac.in</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Painting Wing Club</h3>
            <p className="text-gray-400">BIT Sindri, Dhanbad, Jharkhand</p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="h-10 w-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-purple-600 transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" className="h-10 w-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-purple-600 transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="h-10 w-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-purple-600 transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Painting Wing Club, BIT Sindri. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PaintingWingClub;