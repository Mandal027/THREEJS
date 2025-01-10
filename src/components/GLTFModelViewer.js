// components/GLTFModelViewer.js
'use client'; // Use client-side rendering

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from 'dat.gui';

const GLTFModelViewer = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Add GLTF Model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/BIT.glb',
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // Set default position, rotation, and scale
        model.position.set(-9, 3, 1);
        model.rotation.set(0, 1, 0);
        model.scale.set(2, 2, 1);

        // Add dat.GUI for controls
        const gui = new GUI();
        const modelFolder = gui.addFolder('Model');
        modelFolder.add(model.position, 'x', -10, 10, 1).name('Position X');
        modelFolder.add(model.position, 'y', -10, 10, 1).name('Position Y');
        modelFolder.add(model.position, 'z', -10, 10, 1).name('Position Z');
        modelFolder.add(model.rotation, 'x', 0, Math.PI * 2, 0.1).name('Rotation X');
        modelFolder.add(model.rotation, 'y', 0, Math.PI * 2, 0.1).name('Rotation Y');
        modelFolder.add(model.rotation, 'z', 0, Math.PI * 2, 0.1).name('Rotation Z');
        modelFolder.add(model.scale, 'x', 0.1, 5, 0.1).name('Scale X');
        modelFolder.add(model.scale, 'y', 0.1, 5, 0.1).name('Scale Y');
        modelFolder.add(model.scale, 'z', 0.1, 5, 0.1).name('Scale Z');
        modelFolder.open();
      },
      (xhr) => {
        console.log(`Model ${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );

    // Add Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // Add Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    // return () => {
    //   mountRef.current.removeChild(renderer.domElement);
    // };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default GLTFModelViewer;
