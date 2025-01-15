import * as THREE from 'three';
import gsap from 'gsap';
import Members from './Members';

export function setupNavMembersEventListener(scene, camera, navMembers, group, setOverlayOpacity, setshowMembers) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // 🔴 Store the original camera position and zoom
  const originalCameraPosition = camera.position.clone();
  const originalCameraZoom = camera.zoom;

  // 🖱️ Handle mouse click event
  const onMouseClick = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([navMembers]);

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
        if (child !== navMembers) {
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

      // Animate camera position, rotation, and zoom
      gsap.to(camera.position, {
        x: 1,
        y: 1.3,
        z: -3.3,
        duration: 5,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.lookAt(navMembers.position);
        },
      });

      gsap.to(navMembers, {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          navMembers.visible = false;
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
          setshowMembers(true);
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
  crossButton.style.top = '50px'; // Shift downward
  crossButton.style.right = '50px';
  crossButton.style.padding = '10px';
  crossButton.style.fontSize = '18px';
  crossButton.style.cursor = 'pointer';
  crossButton.style.display = 'none'; // Initially hide the 'X' button
  document.body.appendChild(crossButton);

  // 🔄 Handle cross button click
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
      zoom: originalCameraZoom  * 1.3, // Reset the zoom value
      duration: 2,
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

    // Reset overlay opacity and navMembers visibility
    gsap.to({}, {
      duration: 0.5,
      onUpdate: () => {
        setOverlayOpacity(gsap.getProperty({}, "progress"));
      },
      onComplete: () => {
        setOverlayOpacity(0);
        navMembers.visible = true;
      },
    });

    // Reverse Members content
    setshowMembers(false);

    // Hide the 'X' button
    crossButton.style.display = 'none';
  });

  // Cleanup event listeners on unmount
  return () => {
    window.removeEventListener("click", onMouseClick);
    crossButton.remove();
  };
}
