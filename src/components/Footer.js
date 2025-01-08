import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  console.log("Footer");
  return (
    <div className="footer  text-black text-sm tracking-wide fixed bottom-[-2px] flex flex-wrap justify-center items-center w-full md:py-0.5 md:px-4 z-10">
      {/* Mail Link */}
      <Link href="/" className="flex items-center p-2">
        <Image src="/mail.png" width={17} height={17} alt="mail" />
        <h5 className="px-1 font-black tracking-widest text-xs sm:text-sm md:text-base">
          Mail
        </h5>
        
      </Link>
      {/* Instagram Link */}
      <Link href="/" className="flex items-center p-2">
        <Image src="/insta.png" width={17} height={17} alt="insta" />
        <h5 className="px-1 font-black tracking-widest text-xs sm:text-sm md:text-base">
          Instagram
        </h5>
      </Link>
      {/* LinkedIn Link */}
      <Link href="/" className="flex items-center p-2">
        <Image src="/linkedIn.png" width={17} height={17} alt="linkedIn" />
        <h5 className="px-1 font-black tracking-widest text-xs sm:text-sm md:text-base">
          LinkedIn
        </h5>
      </Link>
    </div>
  );
};

export default Footer;
