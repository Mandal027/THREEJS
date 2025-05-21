import '@google/model-viewer';
import Navbar from './BitSindri/Navbar';

const ArtStudioModelViewer = () => {
  return (
    <>
    <Navbar />
    <div  className='w-full  mt-20 h-screen flex flex-col-reverse items-center justify-center'>
  <model-viewer 
  className="w-full h-full font-white max-w-7xl max-h-[90vh] auto-rotate"
    disable-pan
   min-camera-orbit="auto 80deg auto"
  max-camera-orbit="auto 80deg auto"
  src="/art_studio.glb" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="neutral" poster="poster.webp" shadow-intensity="1" exposure="0.91">
    <button className="Hotspot" slot="hotspot-1" data-position="2.901297807693485m 1.0811034902871883m -1.2608848242712192m" data-normal="-1m 0m 0m" data-visibility-attribute="visible">
        <div className="HotspotAnnotation">Art Arena</div>
    </button>
    <div className="progress-bar hide" slot="progress-bar">
        <div className="update-bar"></div>
    </div>
    {/* <button slot="ar-button" id="ar-button">
        View in your space
    </button> */}
    <div id="ar-prompt">
        {/* <img src="https://modelviewer.dev/shared-assets/icons/hand.png"> */}
    </div>
</model-viewer>
<div  className='fixed top-20'>
  {/* <h1 className='text-2xl'>Fuck you baby ahh!!! yess!! yessss!!</h1> */}
</div>
</div>
    </>
    
  );
};

export default ArtStudioModelViewer;
