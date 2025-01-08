import * as THREE from 'three';

class RippleEffect {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    // Create a plane geometry for the ripple effect
    this.ripplePlane = new THREE.PlaneGeometry(2, 2);

    // Vertex and fragment shaders for the ripple effect
    this.vertexShader = `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`;

    this.fragmentShader = `
      uniform vec2 iResolution;
      uniform float iTime;
      varying vec2 vUv;

      void main() {
          vec2 uv = vUv;
          vec2 p = -1.0 + 2.0 * uv;
          float len = length(p);
          float ripple = sin(10.0 * len - iTime * 5.0) * exp(-3.0 * len);
          vec3 color = vec3(0.2, 0.5, 1.0) + ripple;
          gl_FragColor = vec4(color, 1.0);
      }`;

    // Create a shader material using the shaders
    this.rippleMaterial = new THREE.ShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: {
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iTime: { value: 0 },
      },
      transparent: true,
    });

    // Create the plane mesh
    this.rippleMesh = new THREE.Mesh(this.ripplePlane, this.rippleMaterial);
    this.rippleMesh.position.set(0, 0.001, 0); // Align with the RectAreaLight
    this.rippleMesh.rotation.x = -Math.PI / 2; // Match the light's rotation
    this.scene.add(this.rippleMesh);

    // Set up clock for animation
    this.clock = new THREE.Clock();

    // Hover control
    this.isHovering = false;

    // Add event listeners
    this.addHoverListeners();
  }

  // Method to add hover listeners
  addHoverListeners() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Mouse move event
    window.addEventListener('mousemove', (event) => {
      // Normalize mouse coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update raycaster
      raycaster.setFromCamera(mouse, this.camera);

      // Check intersection with the plane
      const intersects = raycaster.intersectObject(this.rippleMesh);
      this.isHovering = intersects.length > 0;
    });
  }

  // Update function to animate the ripple only when hovering
  update() {
    if (this.isHovering) {
      const elapsedTime = this.clock.getElapsedTime();
      this.rippleMaterial.uniforms.iTime.value = elapsedTime;
    }
  }
}

export default RippleEffect;
