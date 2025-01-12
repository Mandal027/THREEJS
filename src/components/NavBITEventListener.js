import * as THREE from 'three';
import gsap from 'gsap';
import { setshowBitSindri } from './BitSindri';

export function setupNavBITEventListener(scene, camera, navBIT, group, setOverlayOpacity, setshowBitSindri) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onMouseClick = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([navBIT]);

    if (intersects.length > 0) {
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

      gsap.to(camera.position, {
        x: 10,
        y: 1.5,
        z: -3.3,
        duration: 5,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.lookAt(navBIT.position);
        },
      });

      gsap.to(navBIT, {
        duration: 1, // Duration of the animation in seconds
        opacity: 0, // Target opacity
        onComplete: () => {
          navBIT.visible = false; // Make navBIT text disappear after animation
        },
      });

      gsap.to(camera, {
        zoom: 4,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
        onComplete: () => {
          setshowBitSindri(true);
        },
      });
    }
  };

  window.addEventListener("click", onMouseClick);

  // Cleanup event listener on unmount
  return () => {
    window.removeEventListener("click", onMouseClick);
  };
}