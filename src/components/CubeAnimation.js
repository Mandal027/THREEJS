// src/components/CubeAnimation.js

import * as THREE from 'three';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GUI } from 'dat.gui';

export function startAnimation(cube, camera, scene, cubeSize, targetScale, completionCallback) {
  const timeline = gsap.timeline({ delay: 0.3 }); // Add a delay of 0.6 seconds

  timeline.to(cube.position, {
    y: 0, // Final Y position
    duration: 7,
    ease: 'power2.inOut', // Smoother easing
    onComplete: () => {
      if (completionCallback) {
        completionCallback();
      }

      // Add 8 cubes to the scene
      // const cubePositions = [
      //   { x: -0.59, y: 0.03, z: 7.4 },
      //   { x: 3.8, y: 0.03, z: -8.1 },
      //   { x: -10.4, y: 0.03, z: -1 },
      //   { x: -9.2, y: 0.03, z: -8.1 },
      //   { x: -8.1, y: 0.03, z: 6.9 },
      //   { x: 3, y: 0.03, z: 2.5 },
      //   { x: -3.2, y: 0.03, z: -9.8 },
      //   { x: 8.9, y: 0.03, z: -2 },
      // ];

      const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xd25c25,
        transparent: true,
        opacity: 0,
      });

      // const greenCubes = cubePositions.map((position) => {
      //   const newCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      //   newCube.position.set(position.x, position.y, position.z);
      //   scene.add(newCube);
      //   return newCube;
      // });

      // Animate the 8 cubes
      // greenCubes.forEach((cube) => {
      //   gsap.to(cube.material, {
      //     opacity: 1,
      //     duration: 0.3,
      //     ease: 'none',
      //     onComplete: () => {
      //       gsap.to(cube.material, {
      //         opacity: 0,
      //         duration: 1,
      //         ease: 'none',
      //         onComplete: () => {
      //           scene.remove(cube); // Remove the cube from the scene
      //           cube.geometry.dispose(); // Dispose of the geometry
      //           cube.material.dispose(); // Dispose of the material
      //         },
      //       });
      //     },
      //   });
      // });

      // Set the opacity of all green cubes to 1, then transition and dispose of them
      // const greenCubesToDispose = scene.children.filter(
      //   (child) => child instanceof THREE.Mesh && child.material.color.getHex() === 0x00ff00
      // );

      // greenCubesToDispose.forEach((cube) => {
      //   gsap.to(cube.material, {
      //     opacity: 1,
      //     duration: 1,
      //     ease: 'none',
      //     onComplete: () => {
      //       gsap.to(cube.material, {
      //         opacity: 0,
      //         duration: 1,
      //         ease: 'none',
      //         onComplete: () => {
      //           scene.remove(cube); // Remove the cube from the scene
      //           cube.geometry.dispose(); // Dispose of the geometry
      //           cube.material.dispose(); // Dispose of the material
      //         },
      //       });
      //     },
      //   });
      // });

      // Add GLTF model to the scene
      const gltfLoader = new GLTFLoader();
      // gltfLoader.load(
      //   '/BIT.glb', // Path to the model in the public folder
      //   (gltf) => {
      //     const model = gltf.scene;
      //     scene.add(model);

      //     // Set initial position, rotation, and scale
      //     model.position.set(-10, 1, -0.1); // Change this line to set the final position
      //     model.rotation.set(0, 1.3, 0);
      //     model.scale.set(2, 2, 1);

      //     // Animate the GLTF model to appear
      //     gsap.fromTo(model.position, { y: 0 }, { y: 2, duration: 1, ease: 'power2.inOut' });
      //     gsap.fromTo(model.scale, { x: 0, y: 0, z: 0 }, { x: 2, y: 4, z: 1, duration: 1, ease: 'power2.inOut' });

      //     // Animate the GLTF model to rotate continuously along the Y-axis
      //     gsap.to(model.rotation, {
      //       y: "+=6.28319", // Rotate by 2*PI radians (360 degrees)
      //       duration: 10,
      //       repeat: -1, // Repeat indefinitely
      //       ease: 'linear',
      //     });

      //     // // Add dat.GUI for GLTF model position and rotation
      //     // const gui = new GUI();
      //     // const modelFolder = gui.addFolder('GLTF Model');
      //     // modelFolder.add(model.position, 'x', -20, 20).name('Position X');
      //     // modelFolder.add(model.position, 'y', -20, 20).name('Position Y');
      //     // modelFolder.add(model.position, 'z', -20, 20).name('Position Z').onChange(() => {
      //     //   model.position.set(-10, 0,0.13) ; // Set final z position to 0.13
      //     // });
         
      //   },
      //   (xhr) => {
      //     console.log(Model ${(xhr.loaded / xhr.total) * 100}% loaded);
      //   },
      //   (error) => {
      //     console.error('An error occurred:', error);
      //   }
      // );
    },
  });

  

  timeline.to(
    cube.scale,
    {
      x: targetScale / cubeSize,
      y: targetScale / (cubeSize * 0.5),
      z: targetScale / cubeSize,
      duration: 7,
      ease: 'power2.inOut',
    },
    0 // Start scaling at the same time as falling
  );

  timeline.to(
    camera.position,
    {
      z: -2, // Final zoom position
      duration: 7,
      ease: 'power2.inOut',
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
      },
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
      },
      onComplete: () => {
        console.log('Final zoom value:', camera.zoom); // Log the final zoom value
      }
    },
    0 // Start zooming at the same time as falling
  );

  // Set the opacity of all lines to 1 when the animation completes
  timeline.to(
    scene.children.filter((child) => child instanceof THREE.Line).map((line) => line.material),
    {
      delay: 1.05, // Delay the line opacity change
      opacity: 1,
      duration: 0, // Instant change
      ease: 'none',
    }
  );
}