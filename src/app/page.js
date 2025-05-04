"use client";
import ThreeScene from '../components/ThreeScene';
import Header from '@/components/Header';
import dynamic from 'next/dynamic';
import HollowCylinder from '@/components/Collabration';
import AlumniSection from '@/components/Alumni';
import Gallery from '@/components/Gallery';
import CylindricalGallery from '@/components/Gallery';
import { Cylindrical } from 'three';


//dynamically import the model viewer component
  const ModelViewer = dynamic(() => import('../components/ModelViewer'), {
    ssr: false,
  });




export default function HomePage() {
  return (
     <>
      <Header/>
    <div className="w-screen h-screen bg-white  ">
      <div >
      <ThreeScene />
      {/* <HollowCylinder/> */}
      {/* <AlumniSection/> */}
      {/* <Gallery/> */}
      </div>
     {/* <ModelViewer/> */}
     {/* <ThreeJSBookComponent/> */}
     {/* <CylindricalGallery/> */}
     {/* <CylindricalGallery/> */}
      {/* <ModelViewer /> */}
      
    </div>
    </>
  );
}