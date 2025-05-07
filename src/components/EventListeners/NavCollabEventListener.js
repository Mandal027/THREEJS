import * as THREE from 'three';
import gsap from 'gsap';


import { useRouter } from "next/navigation"; // Use Next.js router

export function setupNavCollabEventListener(
  scene,
  camera,
  navCollab,
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
    const intersects = raycaster.intersectObjects([navCollab]);

    if (intersects.length > 0) {
      // Clean up scene before navigation
      scene.traverse((child) => {
        if (child.dispose) child.dispose();
      });
      
      markNavigationOccurred();
      window.location.href = '/gallery';
    }
  };

  window.addEventListener("click", onMouseClick);

  return () => {
    window.removeEventListener("click", onMouseClick);
  };
}























































































































// export function setupNavCollabEventListener(scene, camera, navCollabs, group, setOverlayOpacity, setShowCollabs) {
//   const raycaster = new THREE.Raycaster();
//   const mouse = new THREE.Vector2();

//   // 🔴 Store the original camera position and zoom
//   const originalCameraPosition = camera.position.clone();
//   const originalCameraZoom = camera.zoom;

//   // 🖱️ Handle mouse click event
//   const onMouseClick = (event) => {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects([navCollabs]);

//     if (intersects.length > 0) {
//       // Fade in overlay first
//       gsap.to({}, {
//         duration: 0.5,
//         onUpdate: () => {
//           setOverlayOpacity(gsap.getProperty({}, "progress"));
//         },
//       });

//       // Hide all models except Model3
//       scene.children.forEach((child) => {
//         if (child.name === "Model4") {
//           child.visible = true; // Ensure Model3 is visible
//         } else if (child.name && child.name.startsWith("Model")) {
//           child.visible = false; // Hide all other models
//         }
//       });

//       // Make other navCollabs, lines, and RectAreaLights disappear
//       group.children.forEach((child) => {
//         if (child !== navCollabs) {
//           child.visible = false;
//         }
//       });

//       scene.children.forEach((child) => {
//         if (
//           child instanceof THREE.Line ||
//           (child.material && child.material instanceof THREE.MeshBasicMaterial) ||
//           child instanceof THREE.RectAreaLight
//         ) {
//           child.visible = false;
//         }
//       });

//       // Animate camera position, rotation, and zoom
//       gsap.to(camera.position, {
//         x: -35,
//         y: 7,
//         z: -3,
//         duration: 5,
//         ease: "power2.inOut",
//         onUpdate: () => {
//           camera.lookAt(navCollabs.position);
//         },
//       });

//       gsap.to(navCollabs, {
//         duration: 1,
//         opacity: 0,
//         onComplete: () => {
//           navCollabs.visible = false;
//         },
//       });

//       gsap.to(camera, {
//         zoom: 4,
//         duration: 2,
//         ease: "power2.inOut",
//         onUpdate: () => {
//           camera.updateProjectionMatrix();
//         },
//         onComplete: () => {
//           setShowCollabs(true);
//           crossButton.style.display = 'block'; // Show the 'X' button
//         },
//       });
//     }
//   };

//   window.addEventListener("click", onMouseClick);

//   // 🔄 Add cross button to reset the scene
//   const crossButton = document.createElement('button');
//   crossButton.innerText = 'X';
//   crossButton.style.position = 'absolute';
//   crossButton.style.top = '50px'; // Shift downward
//   crossButton.style.right = '90px'; // Adjust position for alignment
//   crossButton.style.padding = '10px';
//   crossButton.style.fontSize = '18px';
//   crossButton.style.cursor = 'pointer';
//   crossButton.style.display = 'none'; // Initially hide the 'X' button
//   document.body.appendChild(crossButton);

//   // 🔄 Handle cross button click
//   crossButton.addEventListener('click', () => {
//     // Reset camera position and zoom
//     gsap.to(camera.position, {
//       x: originalCameraPosition.x,
//       y: originalCameraPosition.y,
//       z: originalCameraPosition.z,
//       duration: 2,
//       ease: "power2.inOut",
//       onUpdate: () => {
//         camera.lookAt(0, 0, 0);
//       },
//     });

//     gsap.to(camera, {
//       zoom: originalCameraZoom * 1.3,
//       duration: 2,
//       ease: "power2.inOut",
//       onUpdate: () => {
//         camera.updateProjectionMatrix();
//       },
//     });

//     // Restore visibility for all models and scene objects
//     scene.children.forEach((child) => {
//       if (child.name && child.name.startsWith("Model")) {
//         child.visible = true; // Show all models
//       }

//       if (
//         child instanceof THREE.Line ||
//         (child.material && child.material instanceof THREE.MeshBasicMaterial) ||
//         child instanceof THREE.RectAreaLight
//       ) {
//         child.visible = true; // Show lines and lights
//       }
//     });

//     group.children.forEach((child) => {
//       child.visible = true; // Restore visibility of navigation objects
//     });

//     // Reset overlay opacity and 'navCollabs' visibility
//     gsap.to({}, {
//       duration: 0.5,
//       onUpdate: () => {
//         setOverlayOpacity(gsap.getProperty({}, "progress"));
//       },
//       onComplete: () => {
//         setOverlayOpacity(0); // Ensure overlay fades out
//         navCollabs.visible = true; // Make navCollabs visible
//       },
//     });

//     // Hide Collabs content
//     setShowCollabs(false);

//     // Hide the 'X' button
//     crossButton.style.display = 'none';
//   });

//   // Cleanup event listeners on unmount
//   return () => {
//     window.removeEventListener("click", onMouseClick);
//     crossButton.remove();
//   };
// }
