import * as THREE from 'three';
import gsap from 'gsap';
import { setshowBitSindri } from './BitSindri';
import { Gltf } from '@react-three/drei';

export function setupNavBITEventListener(scene, camera, navBIT, group, setOverlayOpacity, setshowBitSindri) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // 🔴 Store the original camera position and zoom
  const originalCameraPosition = camera.position.clone();
  const originalCameraZoom = camera.zoom;

  // 🖱️ Handle mouse click event
  // const onMouseClick = (event) => {
  //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //   raycaster.setFromCamera(mouse, camera);
  //   const intersects = raycaster.intersectObjects([navBIT]);

  //   if (intersects.length > 0) {
  //     // Fade in overlay first
  //     gsap.to({}, {
  //       duration: 0.5,
  //       onUpdate: () => {
  //         setOverlayOpacity(gsap.getProperty({}, "progress"));
  //       },
  //     });

  //     // Make other navCollabs, lines, and RectAreaLights disappear
  //     group.children.forEach((child) => {
  //       if (child !== navBIT) {
  //         child.visible = false;
  //       }
     
  //     });

  //     scene.children.forEach((child) => {
  //       if (
  //         child instanceof THREE.Line ||
  //         (child.material && child.material instanceof THREE.MeshBasicMaterial) ||
  //         child instanceof THREE.RectAreaLight 
          
  //       ) {
  //         child.visible = false;
  //       }
  //     });

  //     // Animate camera position and zoom
  //     gsap.to(camera.position, {
  //       x: 10,
  //       y: 1.3,
  //       z: -3.3,
  //       duration: 5,
  //       ease: "power2.inOut",
  //       onUpdate: () => {
  //         camera.lookAt(navBIT.position);
  //       },
  //     });

  //     gsap.to(navBIT, {
  //       duration: 1,
  //       opacity: 0,
  //       onComplete: () => {
  //         navBIT.visible = false;
  //       },
  //     });

  //     gsap.to(camera, {
  //       zoom: 4,
  //       duration: 2,
  //       ease: "power2.inOut",
  //       onUpdate: () => {
  //         camera.updateProjectionMatrix();
  //       },
  //       onComplete: () => {
  //         setshowBitSindri(true);
  //         crossButton.style.display = 'block'; // Show the 'X' button
  //       },
  //     });
  //   }
  // };
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
  
      // Hide all models except Model1
      scene.children.forEach((child) => {
        if (child.name === "Model2") {
          child.visible = true; // Ensure Model1 is visible
        } else if (child.name && child.name.startsWith("Model")) {
          child.visible = false; // Hide all other models
        }
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
        duration: 1,
        opacity: 0,
        onComplete: () => {
          navBIT.visible = false;
        },
      });
  
      gsap.to(camera, {
        zoom: 3.5,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
        onComplete: () => {
          setshowBitSindri(true);
          crossButton.style.display = 'block'; // Show the 'X' button
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
  // crossButton.addEventListener('click', () => {
  //   // Reset camera position and zoom
  //   gsap.to(camera.position, {
  //     x: originalCameraPosition.x,
  //     y: originalCameraPosition.y,
  //     z: originalCameraPosition.z,
  //     duration: 2,
  //     ease: "power2.inOut",
  //     onUpdate: () => {
  //       camera.lookAt(0, 0, 0);
  //     },
  //   });

  //   gsap.to(camera, {
  //     zoom: originalCameraZoom * 1.3, // Decrease the final zoom value
  //     duration: 2,
  //     ease: "power2.inOut",
  //     onUpdate: () => {
  //       camera.updateProjectionMatrix();
  //     },
  //   });

  //   // Restore scene objects
  //   group.children.forEach((child) => {
  //     child.visible = true;
  //   });

  //   scene.children.forEach((child) => {
  //     if (
  //       child instanceof THREE.Line ||
  //       (child.material && child.material instanceof THREE.MeshBasicMaterial) ||
  //       child instanceof THREE.RectAreaLight
  //     ) {
  //       child.visible = true;
  //     }
  //   });

  //   // Reset overlay opacity and navBIT visibility
  //   gsap.to({}, {
  //     duration: 0.5,
  //     onUpdate: () => {
  //       setOverlayOpacity(gsap.getProperty({}, "progress"));
  //     },
  //     onComplete: () => {
  //       setOverlayOpacity(0);
  //       navBIT.visible = true;
  //     },
  //   });

  //   // Reverse BitSindri content
  //   setshowBitSindri(false);

  //   // Hide the 'X' button
  //   crossButton.style.display = 'none';
  // });
  crossButton.addEventListener('click', () => {
    // Reset camera position and zoom
    gsap.to(camera.position, {
      x: originalCameraPosition.x,
      y: originalCameraPosition.y,
      z: originalCameraPosition.z,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    });
  
    gsap.to(camera, {
      zoom: originalCameraZoom * 1.3,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.updateProjectionMatrix();
      },
    });
  
    // Restore visibility for all models and scene objects
    scene.children.forEach((child) => {
      if (child.name && child.name.startsWith("Model")) {
        child.visible = true; // Show all models
      }
  
      if (
        child instanceof THREE.Line ||
        (child.material && child.material instanceof THREE.MeshBasicMaterial) ||
        child instanceof THREE.RectAreaLight
      ) {
        child.visible = true; // Show lines and lights
      }
    });
  
    group.children.forEach((child) => {
      child.visible = true; // Restore visibility of navigation objects
    });
  
    // Reset overlay opacity and 'navBIT' visibility
    gsap.to({}, {
      duration: 0.5,
      onUpdate: () => {
        setOverlayOpacity(gsap.getProperty({}, "progress"));
      },
      onComplete: () => {
        setOverlayOpacity(0); // Ensure overlay fades out
        navBIT.visible = true; // Make navBIT visible
      },
    });
  
    // Hide BitSindri content
    setshowBitSindri(false);
  
    // Hide the 'X' button
    crossButton.style.display = 'none';
  });
  

  // Add loading screen logic
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          loadingScreen.style.display = 'none';
        },
      });
    }
  });

  // Add resize loader logic
  // const resizeLoader = document.createElement('div');
  // resizeLoader.innerText = 'Reloading...';
  // resizeLoader.style.position = 'fixed';
  // resizeLoader.style.top = '0';
  // resizeLoader.style.left = '0';
  // resizeLoader.style.width = '100vw';
  // resizeLoader.style.height = '100vh';
  // resizeLoader.style.backgroundColor = '#000';
  // resizeLoader.style.color = '#fff';
  // resizeLoader.style.display = 'none';
  // resizeLoader.style.zIndex = '9999';
  // resizeLoader.style.justifyContent = 'center';
  // resizeLoader.style.alignItems = 'center';
  // resizeLoader.style.fontSize = '2rem';
  // resizeLoader.style.fontWeight = 'bold';
  // document.body.appendChild(resizeLoader);

  let resizeTimeout = null;

  // const handleResize = () => {
  //   if (resizeTimeout) clearTimeout(resizeTimeout);

  //   // Reset and show loader
  //   resizeLoader.style.display = 'flex';
  //   gsap.fromTo(
  //     resizeLoader,
  //     { opacity: 0 },
  //     { opacity: 1, duration: 0.5, ease: 'power1.out' }
  //   );

  //   // Adjust camera aspect ratio and update projection matrix
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();

  //   // Animate out after 1s
  //   resizeTimeout = setTimeout(() => {
  //     gsap.to(resizeLoader, {
  //       opacity: 0,
  //       duration: 0.5,
  //       ease: 'power1.inOut',
  //       onComplete: () => {
  //         resizeLoader.style.display = 'none';
  //       },
  //     });
  //   }, 1000);
  // };

  // window.addEventListener('resize', handleResize);

  // Cleanup event listeners on unmount
  return () => {
    window.removeEventListener("click", onMouseClick);
    crossButton.remove();
    // window.removeEventListener('resize', handleResize);
    // if (resizeTimeout) clearTimeout(resizeTimeout);
    // resizeLoader.remove();
  };
}
