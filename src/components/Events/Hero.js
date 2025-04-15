import React from 'react'
import { useEffect, useRef } from 'react';
import { ThreeCubeScene } from './ThreeCubeScene';

const Hero = () => {

    const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      const cubeScene = new ThreeCubeScene(containerRef.current);
      return () => cubeScene.destroy(); // Clean up on unmount
    }
  }, []); // Add dependency array to useEffect
  
  return (
    <div>
        <div style={{ width: "100vw", height: "100vh", position: "relative", background: "#fff", margin: 50 }}>
            <div
                ref={containerRef}
                style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 2 }}
            />
            
              <div className='items-center justify-center flex flex-col'>
                <h1
                    style={{
                    position: "absolute",
                    top: "5%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "10vw",
                    color: "black",
                    opacity: 0.8,
                    zIndex: 1,
                    }}
                >
                    EVENTS
                </h1>
                
              </div>
              
              <div className='flex flex-row justify-between'
                style={{
                  position: "absolute",
                  bottom: "50px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  }}
              >
                <p>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <button
                    style={{
                    // position: "absolute",
                    // bottom: "50px",
                    // left: "50%",
                    // transform: "translateX(-50%)",
                    background: "white",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    // zIndex: 2,
                    }}
                >
                    Our Projects
                </button>

                <p>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

              </div>
            </div>
    </div>
  )
}

export default Hero
