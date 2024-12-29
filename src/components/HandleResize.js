// src/components/HandleResize.js

export function handleResize(camera, renderer, frustumSize, aspect) {
    window.addEventListener('resize', () => {
      camera.left = (frustumSize * aspect) / -2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = frustumSize / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  