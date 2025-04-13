import ThreeScene from '../components/ThreeScene';
import ThreeJSPaintbrush from '@/components/ThreejsPaintBrush';
import Header from '@/components/Header';



export default function HomePage() {
  return (
     <>
      <Header/>
    <div className="w-screen h-screen bg-white  ">
      <div >
      <ThreeScene />
      </div>
    
      
      {/* <ThreeJSPaintbrush /> */}
    </div>
    </>
  );
}
