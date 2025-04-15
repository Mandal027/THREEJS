// components/ThreeCubeScene.js
import * as THREE from 'three';

export class ThreeCubeScene {
  constructor(container) {
    this.container = container;
    this.init();
    this.animate();
  }

  init() {
    // === SCENE ===
    this.scene = new THREE.Scene();

    // === CAMERA ===
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 7;

    // === RENDERER ===
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.container.appendChild(this.renderer.domElement);

    // === LIGHT ===
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // === LOAD TEXTURES ===
    const loader = new THREE.TextureLoader();
    const faces = [
      './cubeFaces/face1.jpg', // front
      './cubeFaces/face2.jpg', // back
      './cubeFaces/face3.png', // top
      './cubeFaces/face4.png', // bottom
      './cubeFaces/face5.jpg', // right
      './cubeFaces/face6.jpg', // left
    ];
    const materials = faces.map(src => new THREE.MeshStandardMaterial({ map: loader.load(src), color: 0xffffff }));

    // === CUBE ===
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    this.cube = new THREE.Mesh(geometry, materials);
    this.scene.add(this.cube);

    // === EDGES ===
const edges = new THREE.EdgesGeometry(geometry);
const edgeMaterial = new THREE.LineBasicMaterial({ color: '#D25C25',linewidth: 10 });
const edgeLines = new THREE.LineSegments(edges, edgeMaterial);
this.cube.add(edgeLines); // Attach to cube so it rotates together


    // === RESIZE ===
    window.addEventListener('resize', () => this.onResize());
  }

  animate() {
    this.renderer.setAnimationLoop(() => {
      this.cube.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    });
  }

  onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  destroy() {
    this.renderer.dispose();
    this.container.innerHTML = "";
    window.removeEventListener('resize', this.onResize);
  }
}