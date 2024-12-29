
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Footer = () => {
  console.log("Footer");
  return (
    <div className='footer text-black text-sm tracking-wide position: absolute flex items-center place-content-center w-full mt-[95vh] max-h-full z-10 '>
  
        <Link href='/' className='flex justify-center items-center p-2' >
          <Image src='/mail.png' width={15} height={15} alt='mail' /> 
          <h5 className='px-0.5'>Mail</h5>
        </Link>
        <Link href='/' className='flex justify-center items-center p-2' >
          <Image src='/insta.png' width={15} height={15} alt='insta' /> 
          <h5 className='px-0.5'>Instagram</h5>
        </Link>
        <Link href='/' className='flex justify-center items-center p-2' >
          <Image src='/linkedIn.png' width={15} height={15} alt='linkedIn' /> 
          <h5 className='px-0.5'>LinkedIn</h5>
        </Link>

    </div>
  )
}

export default Footer
