/** @type {import('next').NextConfig} */  
const nextConfig = {  
    reactStrictMode: true,  
    images: {  
      domains: ['example.com'], // Replace with your domains  
    },  
    env: {  
      CUSTOM_VARIABLE: process.env.CUSTOM_VARIABLE, // Keep your sensitive data in .env.local  
    },  
    i18n: {  
      locales: ['en-US', 'fr', 'es'], // Example locales  
      defaultLocale: 'en-US',  
    },  
  };  
  
  export default nextConfig;