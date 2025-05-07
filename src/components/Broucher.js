// import { Loader } from "@react-three/drei";
// import { Suspense } from "react";
// import { Experience } from "./Broucher/Experience";

// function App() {
//   return (
//     <>
//       <UI />
//       <Loader />
//       <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
//         <group position-y={0}>
//           <Suspense fallback={null}>
//             <Experience />
            
//           </Suspense>
//         </group>
//       </Canvas>
//     </>
//   );
// }

// export default App;

// import React from 'react'
// import { UI } from './Broucher/UI'
// import { Canvas } from "@react-three/fiber";
// import { Loader } from "@react-three/drei";
// import { Suspense } from "react";
// import { Experience } from "./Broucher/Experience";

// const App = () => {
//   return (
//     <>
//         <UI />
//         <Loader />
//         <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
//             <group position-y={0}>
//             <Suspense fallback={null}>
//                 <Experience />
            
//             </Suspense>
//             </group>
        
//        </Canvas>
//     </>
//   )
// }

// export default App

// App.js - Vanilla Three.js implementation

// Import Three.js
import * as THREE from 'three';

// We'll assume that UI and Experience are properly converted to vanilla JS
// and imported here
import { UI } from './Broucher/UI';
import { Experience } from './Broucher/Experience';

// Main application class
class App {
  constructor(container) {
    // Store the container element
    this.container = container || document.body;
    
    // Create wrapper div to hold all elements
    this.wrapper = document.createElement('div');
    this.wrapper.style.position = 'relative';
    this.wrapper.style.width = '100%';
    this.wrapper.style.height = '100%';
    
    // Initialize the UI
    this.initUI();
    
    // Setup loading screen
    this.initLoader();
    
    // Setup the Three.js scene
    this.initThree();
    
    // Add the wrapper to the container
    this.container.appendChild(this.wrapper);
    
    // Set up CSS for loader
    this.setupStyles();
    
    // Start the render loop
    this.animate();
    
    return this.wrapper; // Return the wrapper element
  }
  
  initUI() {
    // Initialize UI component
    this.ui = new UI();
    if (this.ui.element) {
      this.wrapper.appendChild(this.ui.element);
    }
  }
  
  initLoader() {
    // Create a simple loader
    this.loader = document.createElement('div');
    this.loader.className = 'loader';
    this.loader.innerHTML = 'Loading...';
    this.wrapper.appendChild(this.loader);
  }
  
  initThree() {
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.zIndex = '1';
    this.wrapper.appendChild(this.renderer.domElement);
    
    // Create scene
    this.scene = new THREE.Scene();
    
    // Create camera with the same parameters as in the React version
    this.camera = new THREE.PerspectiveCamera(
      45, // fov
      window.innerWidth / window.innerHeight, // aspect
      0.1, // near
      1000 // far
    );
    this.camera.position.set(-0.5, 1, 4); // Same camera position as React version
    
    // Create a group at y=0 to match the React version
    this.mainGroup = new THREE.Group();
    this.mainGroup.position.y = 0;
    this.scene.add(this.mainGroup);
    
    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    // Load the Experience
    this.loadExperience();
  }
  
  loadExperience() {
    // Create instance of Experience component and pass necessary references
    this.experience = new Experience(this.scene, this.camera, this.mainGroup);
    
    // Once Experience is fully loaded, remove the loader
    this.experience.onLoaded = () => {
      if (this.loader && this.loader.parentNode) {
        this.loader.parentNode.removeChild(this.loader);
      }
    };
  }
  
  onWindowResize() {
    // Update camera and renderer on window resize
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  animate() {
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
    
    // Update experience if it exists
    if (this.experience && this.experience.update) {
      this.experience.update();
    }
    
    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }
  
  // Method to stop and clean up resources
  dispose() {
    // Stop animation loop
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    // Remove event listeners
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    
    // Dispose of Three.js resources
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    // Clean up experience if it has a dispose method
    if (this.experience && this.experience.dispose) {
      this.experience.dispose();
    }
  }
  
  setupStyles() {
    // Add CSS for loader if not already present
    if (!document.getElementById('app-loader-styles')) {
      const style = document.createElement('style');
      style.id = 'app-loader-styles';
      style.innerHTML = `
        .loader {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-family: Arial, sans-serif;
          font-size: 24px;
          z-index: 1000;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// Export the App class so it can be imported elsewhere
export default App;
