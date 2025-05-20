import React from "react";
import { useEffect, useRef } from "react";
import { ThreeCubeScene } from "./ThreeCubeScene";
import { motion } from "framer-motion";

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
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          background: "#fff",
        }}
      >
        <motion.div
          className="transition-all duration-1400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          ref={containerRef}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        />

        <motion.div
          className="items-center justify-center flex flex-col "
          initial={{ opacity: 0, y: 190 }}
          animate={{ opacity: 1, y: 200 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1
            style={{
              position: "absolute",
              // top: "20%",
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
        </motion.div>

        <div
          className="flex flex-row justify-between"
          style={{
            position: "absolute",
            bottom: "50px",

            zIndex: 2,
          }}
        >
          <motion.div
            className="w-0 md:w-1/2 lg:w-1/3 xl:w-1/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem
              ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum
              dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          </motion.div>

          <button
            style={{
              position: "absolute",
              bottom: "50px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "white",
              padding: "10px 20px",
              borderRadius: "20px",
              fontWeight: "bold",
              zIndex: 2,
            }}
          >
            Our Projects
          </button>

          <motion.div
            className="w-0 md:w-1/2 lg:w-1/3 xl:w-1/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem
              ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum
              dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
