


import React from 'react'
import Navbar from './BitSindri/Navbar'
import HeroSection from './BitSindri/Hero'
import AboutSection from './BitSindri/About'
import AcademicsSection from './BitSindri/Academic'
import Footer from './BitSindri/Footer'

const BitSindri = () => {
  return (
    <div  className='bg-black w-screen overflow-y-scroll h-screen'>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AcademicsSection />  
      <Footer />
    </div>
  )
}

export default BitSindri
