// import * as THREE from 'three';
// import gsap from 'gsap';

// export function setupNavMerchandiseEventListener(scene, camera, navMerchandise, group, setOverlayOpacity, setShowMerchandise) {
//   const raycaster = new THREE.Raycaster();
//   const mouse = new THREE.Vector2();

//   // 🔴 Store the original camera position and zoom
//   const originalCameraPosition = camera.position.clone();
//   const originalCameraZoom = camera.zoom;

//   // 🖱 Handle mouse click event
//   const onMouseClick = (event) => {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects([navMerchandise]);

//     if (intersects.length > 0) {
      
//       // Fade in overlay first
//       gsap.to({}, {
//         duration: 0.5,
//         onUpdate: () => {
//           setOverlayOpacity(gsap.getProperty({}, "progress"));
//         },
//       });

//       // Animate camera position and zoom
//       gsap.to(camera, {
//         // zoom: 1.5,
//         // duration: 2,
//         ease: "power2.inOut",
//         onUpdate: () => {
//           camera.updateProjectionMatrix();
//         },
//         onComplete: () => {
//           setShowMerchandise(true);
//           crossButton.style.display = 'block'; // Show the 'X' button
//         },
//       });

//       // Set navMerchandise opacity to 0
//       gsap.to(navMerchandise, {
//         duration: 1,
//         opacity: 0,
//         onComplete: () => {
//           navMerchandise.visible = false;
//         },
//       });
      
//     }
//   };

//   window.addEventListener("click", onMouseClick);

//   // 🔄 Add cross button to reset the scene
//   const crossButton = document.createElement('button');
//   crossButton.innerText = 'X';
//   crossButton.style.position = 'absolute';
//   crossButton.style.bottom = '10px'; // Shift to the bottom
//   crossButton.style.right = '10px';
//   crossButton.style.padding = '50px';
//   crossButton.style.fontSize = '18px';
//   crossButton.style.cursor = 'pointer';
//   crossButton.style.display = 'none'; // Initially hide the 'X' button
//   crossButton.style.zIndex = '9999'; // Ensure it's on top of other elements
//   document.body.appendChild(crossButton);

//   // 🔄 Handle cross button click
//   crossButton.addEventListener('click', () => {
//     // Reset camera position and zoom
//     gsap.to(camera, {
//       // zoom: originalCameraZoom * 1, // Decrease the final zoom value
//       // duration: 2,
//       ease: "power2.inOut",
//       onUpdate: () => {
//         camera.updateProjectionMatrix();
//       },
//     });

//     // Restore scene objects
//     group.children.forEach((child) => {
//       child.visible = true;
//     });

//     scene.children.forEach((child) => {
//       if (
//         child instanceof THREE.Line ||
//         (child.material && child.material instanceof THREE.MeshBasicMaterial) ||
//         child instanceof THREE.RectAreaLight
//       ) {
//         child.visible = true;
//       }
//     });

//     // Reset overlay opacity and navMerchandise visibility
//     gsap.to({}, {
//       duration: 0.5,
//       onUpdate: () => {
//         setOverlayOpacity(gsap.getProperty({}, "progress"));
//       },
//       onComplete: () => {
//         setOverlayOpacity(0);
//         navMerchandise.visible = true;
//       },
//     });

//     // Reverse content
//     setShowMerchandise(false);

//     // Hide the 'X' button
//     crossButton.style.display = 'none';
//   });

//   // Cleanup event listeners on unmount
//   return () => {
//     window.removeEventListener("click", onMouseClick);
//     crossButton.remove();
//   };
// }



import * as THREE from "three";
import gsap from "gsap";
import { useRouter } from "next/navigation"; // Use Next.js router

export function setupNavMerchandiseEventListener(
  scene,
  camera,
  navMerchandise,
  group,
  setOverlayOpacity,
  setShowAlumni,
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
    const intersects = raycaster.intersectObjects([navMerchandise]);

    if (intersects.length > 0) {
      // Clean up scene before navigation
      scene.traverse((child) => {
        if (child.dispose) child.dispose();
      });
      
      markNavigationOccurred();
      window.location.href = '/merchandise';
    }
  };

  window.addEventListener("click", onMouseClick);

  return () => {
    window.removeEventListener("click", onMouseClick);
  };
}


// import * as THREE from "three";
// import gsap from "gsap";

// export function setupNavMerchandiseEventListener(
//   scene,
//   camera,
//   navMerchandise,
//   group,
//   setOverlayOpacity,
//   setShowAlumni,
//   router,
//   containerRef // Add a reference to the DOM container where iframe will be mounted
// ) {
//   const raycaster = new THREE.Raycaster();
//   const mouse = new THREE.Vector2();

//     // Store navigation state in sessionStorage
//     const markNavigationOccurred = () => {
//       sessionStorage.setItem('hasNavigatedFrom3DScene', 'true');
//     };

//   const onMouseClick = (event) => {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects([navMerchandise]);

//     if (intersects.length > 0) {
//       // // Optional: Hide scene/canvas
//       // const canvas = document.querySelector('canvas');
//       // if (canvas) canvas.style.display = 'none';

//       // // Optional: Remove Three.js scene objects to clean up memory
//       // scene.traverse((child) => {
//       //   if (child.dispose) child.dispose();
//       //   if (child.geometry) child.geometry.dispose();
//       //   if (child.material) {
//       //     if (Array.isArray(child.material)) {
//       //       child.material.forEach((m) => m.dispose());
//       //     } else {
//       //       child.material.dispose();
//       //     }
//       //   }
//       // });

//       // Add iframe
//       const iframe = document.createElement("iframe");
//       iframe.src = "/merchandise"; // Local Next.js route
//       iframe.style.width = "100%";
//       iframe.style.height = "100%";
//       iframe.style.position = "absolute";
//       iframe.style.top = "0";
//       iframe.style.left = "0";
//       iframe.style.border = "none";
//       iframe.setAttribute("id", "embedded-page");

//       containerRef.current.appendChild(iframe);
//     }
//   };

//   window.addEventListener("click", onMouseClick);

//   return () => {
//     window.removeEventListener("click", onMouseClick);

//     // Clean up iframe if it exists
//     const existingIframe = document.getElementById("embedded-page");
//     if (existingIframe) existingIframe.remove();
//   };
// }
