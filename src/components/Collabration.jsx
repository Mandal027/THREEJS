"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const HollowCylinder = () => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.lookAt(0, 0, 0);

    const startZ = 10; // Reduced from 15
    const endZ = 5;
    const startY = 4; // Reduced from 6
    const endY = 1;
    let currentZ = startZ;
    let currentY = startY;
    camera.position.set(0, startY, startZ);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enable = true;

    // Increase ambient light intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add point light for glow effect
    const pointLight = new THREE.PointLight(0xffffff, 1, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("carousel.png");

    const geometry = new THREE.CylinderGeometry(2, 2, 2, 64, 1, true);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      side: THREE.DoubleSide,
      roughness: 0.3,
      transparent: true,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.5,
      emissiveMap: texture,
    });

    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);

    let animationFrameId;
    const animate = () => {
      if (currentZ > endZ) {
        currentZ = THREE.MathUtils.lerp(currentZ, endZ, 0.05); // Increased from 0.02
        currentY = THREE.MathUtils.lerp(currentY, endY, 0.05); // Increased from 0.02
        camera.position.z = currentZ;
        camera.position.y = currentY;
      }

      cylinder.rotation.y += 0.003;
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mount || !camera || !renderer) return;

      const width = mount.clientWidth;
      const height = mount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

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
      style={{
        width: "100%",
        height: "100vh", // full viewport height
        overflow: "hidden",
        position: "relative",
      }}
    />
  );
};

export default HollowCylinder;
