import * as THREE from 'three';
import gsap from 'gsap';

export function setupNavMerchandiseEventListener(scene, camera, navMerchandise, group, setOverlayOpacity, setShowMerchandise) {
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
    const intersects = raycaster.intersectObjects([navMerchandise]);

    if (intersects.length > 0) {
      
      // Fade in overlay first
      gsap.to({}, {
        duration: 0.5,
        onUpdate: () => {
          setOverlayOpacity(gsap.getProperty({}, "progress"));
        },
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
          setShowMerchandise(true);
          crossButton.style.display = 'block'; // Show the 'X' button
        },
      });

      // Set navMerchandise opacity to 0
      gsap.to(navMerchandise, {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          navMerchandise.visible = false;
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
  crossButton.style.zIndex = '9999'; // Ensure it's on top of other elements
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

    // Reset overlay opacity and navMerchandise visibility
    gsap.to({}, {
      duration: 0.5,
      onUpdate: () => {
        setOverlayOpacity(gsap.getProperty({}, "progress"));
      },
      onComplete: () => {
        setOverlayOpacity(0);
        navMerchandise.visible = true;
      },
    });

    // Reverse content
    setShowMerchandise(false);

    // Hide the 'X' button
    crossButton.style.display = 'none';
  });

  // Cleanup event listeners on unmount
  return () => {
    window.removeEventListener("click", onMouseClick);
    crossButton.remove();
  };
}