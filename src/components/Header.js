'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.div 
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 120, 
        damping: 15,
        duration: 0.8 
      }}
      className="flex fixed items-center px-4 py-2 md:px-10 justify-between w-full z-10"
    >
      {/* Left Side */}
      <motion.div 
        className="py-1"
        style={{ fontFamily: 'handle' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        <Link href="/" className="text-xl md:text-2xl font-black tracking-widest">
          PAINTING WING
        </Link>
        <h4 className="text-xs md:text-sm font-bold tracking-wider">
          Lets Satisfaction Prevail
        </h4>
      </motion.div>

      {/* Right Side Logo */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Image src="/logo.png" width={110} height={80} alt="logo" />
      </motion.div>
    </motion.div>
  );
};

export default Header;
