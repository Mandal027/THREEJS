import * as THREE from "three";
import gsap from "gsap";
import { createRoot } from "react-dom/client";
import EventsListener from "./EventsListener";

export function setupNavEventsListener(
  scene,
  camera,
  controls,
  navEvents,
  group,
  cube,
  hollowCubeOuter,
  hollowCubeInner
) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onMouseClick = (event) => {
    // Convert screen coords to normalized device coords
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update raycaster
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(group.children);

    if (intersects.length > 0) {
      const clickedNavTitle = intersects[0].object;

      // Make other navTitles, cube, hollowCubeOuter, and hollowCubeInner disappear
      group.children.forEach((child) => {
        if (child !== clickedNavTitle) {
          child.visible = false;
        }
      });
      cube.visible = false;
      hollowCubeOuter.visible = false;
      hollowCubeInner.visible = false;

      // Animate camera position
      gsap.to(camera.position, {
        x: navEvents.position.x + 18,
        y: navEvents.position.y + 13,
        z: navEvents.position.z + 12,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.lookAt(navEvents.position);
        },
        onComplete: () => {
          const eventsContainer = document.createElement("div");
          eventsContainer.style.position = "fixed";
          eventsContainer.style.top = "50%";
          eventsContainer.style.left = "50%";
          eventsContainer.style.transform = "translate(-50%, -50%)";
          eventsContainer.style.width = "50%";
          eventsContainer.style.height = "70%";
          eventsContainer.style.color = "black";
          eventsContainer.style.padding = "20px";
          eventsContainer.style.borderRadius = "10px";
          eventsContainer.style.zIndex = "1000";
          eventsContainer.style.overflowY = "auto";

          const root = createRoot(eventsContainer);
          document.body.appendChild(eventsContainer);

          const closeButton = document.createElement("button");
          closeButton.innerText = "Close";
          closeButton.style.position = "fixed";
          closeButton.style.top = "20px";
          closeButton.style.right = "20px";
          closeButton.style.padding = "10px";
          closeButton.style.backgroundColor = "red";
          closeButton.style.color = "white";
          closeButton.style.border = "none";
          closeButton.style.borderRadius = "5px";
          closeButton.style.cursor = "pointer";
          closeButton.style.zIndex = "1100";
          closeButton.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.3)";

          closeButton.addEventListener("click", () => {
            root.unmount();
            eventsContainer.remove();

            // Make all objects visible again
            group.children.forEach((child) => {
              child.visible = true;
            });
            cube.visible = true;
            hollowCubeOuter.visible = true;
            hollowCubeInner.visible = true;

            // Reverse animation to regain initial camera position
            gsap.to(camera.position, {
              x: 4.7,
              y: 11.39,
              z: 4.7,
              duration: 2,
              ease: "power2.inOut",
              onUpdate: () => {
                camera.lookAt(0, 0, 0);
                camera.updateProjectionMatrix();
              },
            });

            // Reset zoom
            gsap.to(camera, {
              zoom: 1.5,
              duration: 2,
              ease: "power2.inOut",
              onUpdate: () => {
                camera.updateProjectionMatrix();
              },
            });
          });

          document.body.appendChild(closeButton);
          root.render(<EventsListener />);
        },
      });

      // Animate camera controls' target
      gsap.to(controls.target, {
        x: navEvents.position.x,
        y: navEvents.position.y,
        z: navEvents.position.z,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          controls.update();
        },
      });

      // Apply zoom during the fly-in
      gsap.to(camera, {
        zoom: 3,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      });
    }
  };

  window.addEventListener("click", onMouseClick);

  // Cleanup function
  return () => {
    window.removeEventListener("click", onMouseClick);
  };
}
