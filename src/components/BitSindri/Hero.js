"use client";

import React from "react";

import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// function CollegeModel() {
//   return (
//     <group position={[0, 0, 0]}>
//       {/* Main Building */}
//       <mesh position={[0, 0, 0]}>
//         <boxGeometry args={[5, 2, 2]} />
//         <meshStandardMaterial color="#f0f0f0" />
//       </mesh>

//       {/* Roof */}
//       <mesh position={[0, 1.5, 0]}>
//         <coneGeometry args={[3, 1, 4]} />
//         <meshStandardMaterial color="#d32f2f" />
//       </mesh>

//       {/* Pillars */}
//       {[-2, 2].map((x, i) => (
//         <mesh key={i} position={[x, -0.5, 1.2]}>
//           <cylinderGeometry args={[0.2, 0.2, 3, 16]} />
//           <meshStandardMaterial color="#e0e0e0" />
//         </mesh>
//       ))}

//       {/* Windows */}
//       {[-1.5, 0, 1.5].map((x, i) => (
//         <mesh key={i} position={[x, 0, 1.01]}>
//           <planeGeometry args={[0.8, 1]} />
//           <meshStandardMaterial color="#90caf9" />
//         </mesh>
//       ))}

//       {/* Text */}
//       <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
//         <Text
//           position={[0, 2.5, 0]}
//           fontSize={0.5}
//           color="#d25c25"
//           font="/fonts/Inter_Bold.json"
//           anchorX="center"
//           anchorY="middle"
//         >
//           BIT SINDRI
//         </Text>
//       </Float>
//     </group>
//   );
// }

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      {/* <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            <CollegeModel />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
      </div> */}

      {/* Content */}
      <motion.div className="relative z-10 text-center font-sans px-4 max-w-7xl" style={{ y, opacity }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6"
        >
          Birla Institute of Technology, Sindri
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-8"
        >
          Empowering Minds, Engineering Futures
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-medium">
            Visit Site
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/20 backdrop-blur-sm text-white border-white hover:bg-white/30 font-medium"
          >
            Explore Campus
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        <ChevronDown className="h-8 w-8 text-white drop-shadow-md" />
      </motion.div>
    </section>
  );
}