
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='header  position: absolute flex items-center px-10 place-content-between w-full z-10 '>

            <div className='text-black py-1'>
                <Link href="/" className='text-3xl font-bold tracking-widest'>PAINTING WING</Link>
                <h4 className='text-sm tracking-wide'>Let's Satisfaction Prevail</h4>
            </div>

            <div >
                <Image src='/logo.png' width={120} height={8} alt='logo'/>
            </div>
      </div>
  )
}

export default Header
