import * as THREE from 'three';
import gsap from 'gsap';
import { setshowBitSindri } from './BitSindri';

export function setupNavBITEventListener(scene, camera, navBIT, group, setOverlayOpacity, setshowBitSindri) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // 🔴 Store the original camera position and zoom
  const originalCameraPosition = camera.position.clone();
  const originalCameraZoom = camera.zoom;

  // 🖱 Handle mouse click event
  const onMouseClick = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([navBIT]);

    if (intersects.length > 0) {
      // Commented out BIT logo popup functionality
      
      // Fade in overlay first
      gsap.to({}, {
        duration: 0.5,
        onUpdate: () => {
          setOverlayOpacity(gsap.getProperty({}, "progress"));
        },
      });

      // Make other navCollabs, lines, and RectAreaLights disappear 
      group.children.forEach((child) => {
        if (child !== navBIT) {
          child.visible = false;
        }
      });

      scene.children.forEach((child) => {
        if (
          child instanceof THREE.Line ||
          (child.material && child.material instanceof THREE.MeshBasicMaterial) ||
          child instanceof THREE.RectAreaLight 
        ) {
          child.visible = false;
        }
      });

      // Animate camera position and zoom
      gsap.to(camera, {
        // zoom: 1.5,
        // duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
        onComplete: () => {
          setshowBitSindri(true);
          crossButton.style.display = 'block'; // Show the 'X' button
        },
      });

      // Set navBIT opacity to 0
      gsap.to(navBIT, {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          navBIT.visible = false;
        },
      });
      
    }
  };

  window.addEventListener("click", onMouseClick);

  // 🔄 Add cross button to reset the scene
  const crossButton = document.createElement('button');
  crossButton.innerText = 'X';
  crossButton.style.position = 'absolute';
  crossButton.style.bottom = '10px'; // Shift to the bottom
  crossButton.style.right = '10px';
  crossButton.style.padding = '50px';
  crossButton.style.fontSize = '18px';
  crossButton.style.cursor = 'pointer';
  crossButton.style.display = 'none'; // Initially hide the 'X' button
  document.body.appendChild(crossButton);

  // 🔄 Handle cross button click
  crossButton.addEventListener('click', () => {
    // Reset camera position and zoom
    gsap.to(camera, {
      // zoom: originalCameraZoom * 1, // Decrease the final zoom value
      // duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.updateProjectionMatrix();
      },
    });

    // Restore scene objects
    group.children.forEach((child) => {
      child.visible = true;
    });

    scene.children.forEach((child) => {
      if (
        child instanceof THREE.Line ||
        (child.material && child.material instanceof THREE.MeshBasicMaterial) ||
        child instanceof THREE.RectAreaLight
      ) {
        child.visible = true;
      }
    });

    // Reset overlay opacity and navBIT visibility
    gsap.to({}, {
      duration: 0.5,
      onUpdate: () => {
        setOverlayOpacity(gsap.getProperty({}, "progress"));
      },
      onComplete: () => {
        setOverlayOpacity(0);
        navBIT.visible = true;
      },
    });

    // Reverse BitSindri content
    setshowBitSindri(false);

    // Hide the 'X' button
    crossButton.style.display = 'none';
  });

  // Cleanup event listeners on unmount
  return () => {
    window.removeEventListener("click", onMouseClick);
    crossButton.remove();
  };
}