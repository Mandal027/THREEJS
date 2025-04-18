'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navLinks = ['About', 'Features', 'Testimonials', 'Reach out'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for styling (optional)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className=" text-black max-auto px-8 pt-6 flex items-center justify-between z-50 relative font-sans">
      {/* Left: Brand */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="cursor-pointer"
      >
        <Image src='/pw_logo.png' alt='logo' width={100} height={100} />
      </motion.div>

      {/* Center (Fixed) */}
      <motion.div
        className={`hidden md:flex items-center space-x-4 text- font-medium px-4 py-2 rounded-full transition-all duration-300 ${
          scrolled ? 'fixed top-4 left-1/2 -translate-x-1/2 shadow-lg' : ''
        } backdrop-blur-md`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="bg-gray-50 text-black rounded-full px-3 py-1 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          // transition={easeInOut}
        >
          {/* 🖌 Wthr */}
          Home
        </motion.div>
        {navLinks.map((link, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            // transition={easeInOut}
            className={`px-3 py-1 rounded-full transition-all duration-200 ${
              link === 'About' ? ' text-black' : 'text-black'
            }`}
          >
            {link}
          </motion.button>
        ))}
      </motion.div>

      {/* Right: Join Us */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        // transition={easeInOut}
        className="hidden md:block text-sm font-medium cursor-pointer"
      >
        JOIN US
      </motion.div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          className="absolute top-16 left-0 w-full bg-black text-white px-6 py-4 flex flex-col space-y-4"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="text-lime-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            🖌 Wthr
          </motion.div>
          {navLinks.map((link, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-left text-white text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </motion.button>
          ))}
          <div className="text-white font-medium">JOIN US</div>
        </motion.div>
      )}
    </nav>
  );
}