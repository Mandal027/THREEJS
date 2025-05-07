'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from 'three';

const HollowCylinder = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // === Scene Setup ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set background to black

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    camera.lookAt(0, 0, 0); // Look at the center of the scene

 


    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;



       //allow orbitcontrols to work
       const controls = new OrbitControls(camera, renderer.domElement);

       controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
       controls.enable = false;
       controls.dampingFactor = 0.25;

    // === Lights ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    //texture loader
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('carousel.png', () => {
      // Texture loaded, you can use it here
      material.map = texture;
      material.needsUpdate = true; // Update the material to use the new texture
    });

    // === Hollow Cylinder Geometry ===
    const geometry = new THREE.CylinderGeometry(2, 2, 2, 64, 1, true);
    const material = new THREE.MeshStandardMaterial({
      // color: 0xffffff,
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.3,
      transparent: true,
      // opacity: 0,
    });

    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);

    // === Animation Loop ===
    let animationFrameId;
    const animate = () => {
      cylinder.rotation.y += 0.005;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // === Handle Window Resize ===
    const handleResize = () => {
      if (!mount || !camera || !renderer) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // === Cleanup ===
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '800px', overflow: 'hidden' }}
    />
  );
};

export default HollowCylinder;
