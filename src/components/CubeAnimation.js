// src/components/CubeAnimation.js

import * as THREE from 'three';
import { gsap } from 'gsap';

export function startAnimation(cube, camera, scene, cubeSize, targetScale) {
  const timeline = gsap.timeline({ delay: 0.3}); // Add a delay of 0.6 seconds

  timeline.to(cube.position, {
    y: 0, // Final Y position
    duration: 7,
    ease: 'power2.inOut' // Smoother easing
  });

  timeline.to(
    cube.scale,
    {
      x: targetScale / cubeSize,
      y: targetScale / (cubeSize * 0.5),
      z: targetScale / cubeSize,
      duration: 7,
      ease: 'power2.inOut'
    },
    0 // Start scaling at the same time as falling
  );

  timeline.to(
    camera.position,
    {
      z: -2, // Final zoom position
      duration: 7,
      ease: 'power2.inOut'
    },
    0 // Start zooming at the same time as falling
  );

  timeline.to(
    camera.position,
    {
      x: 4.6,
      y: 8.2,
      z: 4.6,
      duration: 7,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(cube.position); // Keep the camera focused on the cube
      }
    },
    0 // Start moving the camera at the same time as falling
  );

  // Add zoom-in effect
  timeline.to(
    camera,
    {
      zoom: 1.4,
      duration: 7.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.updateProjectionMatrix(); // Update the projection matrix on each frame
      }
    },
    0 // Start zooming at the same time as falling
  );

  // Set the opacity of all lines to 1 when the animation completes
  timeline.to(
    scene.children.filter((child) => child instanceof THREE.Line).map((line) => line.material),
    {
      opacity: 1,
      duration: 0, // Instant change
      ease: 'none'
    }
  );
}
