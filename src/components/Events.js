import React from 'react'
import Navbar from './Navbar'
import ScrollingText from './Events/TextScroll'
import Hero from './Events/Hero'

export default function Events() {

  return (
    <div className=' bg-white flex flex-col min-h-screen overflow-y-scroll overflow-hidden'>

        <Navbar />
        <ScrollingText />
        <Hero />

      {/* <div className='overflow-x-clip pt-10 overflow-y-scroll max-h-screen'>
        <div className='font-serif'>
          <ScrollingText />
        </div>

        <div className='font-mono'>
          <Hero />
        </div>
        
        <div>
        <Navbar />
        <Navbar />
        <Navbar />
        </div>

      </div> */}
    </div>
  )
}