import '@google/model-viewer';
import Navbar from './BitSindri/Navbar';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import AboutUs from './AboutUs';

const ArtStudioModelViewer = () => {
  const [progress, setProgress] = useState(0);
  const modelViewerRef = useRef(null);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleProgress = (event) => {
      const { totalProgress } = event.detail;
      setProgress(Math.round(totalProgress * 100));
    };

    modelViewer.addEventListener('progress', handleProgress);

    return () => {
      modelViewer.removeEventListener('progress', handleProgress);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div 
       style={{
        background: 'linear-gradient(135deg, #e0dcd5, #cfcfcf, #9f8c7c, #f3f3f3)',
      }}
      className='w-full  pt-24 h-screen flex flex-col items-center justify-center gap-4 px-4'>

        {/* /* 🏷 Heading and Description */ }
        <div className="text-center mb-2 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Step into the 3d Realm of art and creativity
          </h1>
          <p className="text-lg text-gray-600">
            Discover a world where colors leap off the canvas and creativity knows no bounds.
          </p>
        </div>

        <Button
          className="bg-[#f47458] text-white  px-6 py-3 mt-1/5 rounded-lg hover:bg-[#e06348] transition-colors"
          onClick={() => {
            const aboutUs = document.getElementById('aboutUs');
            if (aboutUs) {
              aboutUs.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Explore More
        </Button>

        {/* /* 🧱 Model Viewer */}
        <model-viewer
          ref={modelViewerRef}
          className="w-full h-full max-w-7xl max-h-[65vh] rounded-lg shadow-lg"
          disable-pan
          min-camera-orbit="auto 80deg auto"
          max-camera-orbit="auto 80deg auto"
          src="/art_studio.glb"
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          tone-mapping="neutral"
          poster="poster.webp"
          shadow-intensity="1"
          exposure="0.91"
        >
          <button
            className="Hotspot"
            slot="hotspot-1"
            data-position="2.901297807693485m 1.0811034902871883m -1.2608848242712192m"
            data-normal="-1m 0m 0m"
            data-visibility-attribute="visible"
          >
            <div className="HotspotAnnotation">Art Arena</div>
          </button>

        

          {/* <div id="ar-prompt"></div> */}
        </model-viewer>

      </div>

      <div id='aboutUs'>
        <AboutUs />
      </div>
    </>
  );
};

export default ArtStudioModelViewer;