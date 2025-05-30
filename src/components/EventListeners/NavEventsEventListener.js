import * as THREE from 'three';
import gsap from 'gsap';


import { useRouter } from "next/navigation"; // Use Next.js router

export function setupNavEventsEventListener(
  scene,
  camera,
  navEvents,
  group,
  setOverlayOpacity,
  setShowCollabs,
  router // Router is passed as a parameter
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Remove this line - router is already passed as a parameter
  // const router = useRouter(); 

  // Store navigation state in sessionStorage
  const markNavigationOccurred = () => {
    sessionStorage.setItem('hasNavigatedFrom3DScene', 'true');
  };

  const onMouseClick = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([navEvents]);

    if (intersects.length > 0) {
      // Clean up scene before navigation
      scene.traverse((child) => {
        if (child.dispose) child.dispose();
      });
      
      markNavigationOccurred();
      window.location.href = '/events';
    }
  };

  window.addEventListener("click", onMouseClick);

  return () => {
    window.removeEventListener("click", onMouseClick);
  };
}