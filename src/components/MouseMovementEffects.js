// MouseMovementEffects.js
export const initializeMouseMovementEffects = (scene, camera, group, cube) => {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
  
    // Configuration object for easy adjustment of effect parameters
    const config = {
      mouseSensitivity: 100,      // Higher number = less sensitive
      rotationEasing: 0.01,       // Higher number = faster response
      mouseEasing: 0.05,          // Higher number = faster mouse tracking
      floatingSpeed: 0.001,       // Higher number = faster floating
      floatingAmount: 0.1,        // Higher number = larger floating movement
      cubeRotationSpeed: 0.001,   // Higher number = faster cube rotation
      cubeFloatingSpeed: 0.002,   // Higher number = faster cube floating
      cubeFloatingAmount: 0.001   // Higher number = larger cube floating
    };
  
    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / config.mouseSensitivity;
      mouseY = (event.clientY - windowHalfY) / config.mouseSensitivity;
    };
  
    const updateEffects = () => {
      // Update mouse movement interpolation
      targetX += (mouseX - targetX) * config.mouseEasing;
      targetY += (mouseY - targetY) * config.mouseEasing;
  
      // Update scene rotation
      scene.rotation.y += (targetX - scene.rotation.y) * config.rotationEasing;
      scene.rotation.x += (targetY - scene.rotation.x) * config.rotationEasing;
  
      // Update group floating animation
      if (group) {
        group.position.y = Math.sin(Date.now() * config.floatingSpeed) * config.floatingAmount;
      }
  
      // Update cube animations
      if (cube) {
        cube.rotation.y += config.cubeRotationSpeed;
        cube.position.y += Math.sin(Date.now() * config.cubeFloatingSpeed) * config.cubeFloatingAmount;
      }
    };
  
    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);
  
    // Return cleanup function and update function
    return {
      cleanup: () => {
        window.removeEventListener('mousemove', handleMouseMove);
      },
      update: updateEffects,
      config  // Export config object for external adjustments if needed
    };
  };