import * as THREE from "three";
import gsap from "gsap";
import { useRouter } from "next/navigation"; // Use Next.js router

export function setupNavInductionEventListener(
  scene,
  camera,
  navInduction,
  group,
  setOverlayOpacity,
  setShowInduction,
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
    const intersects = raycaster.intersectObjects([navInduction]);

    if (intersects.length > 0) {
      markNavigationOccurred();
      // Use the router for programmatic navigation
      router.push("/modelviewer");
    }
  };

  window.addEventListener("click", onMouseClick);

  return () => {
    window.removeEventListener("click", onMouseClick);
  };
}