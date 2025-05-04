import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Float } from "@react-three/drei";
import { Book } from "./Book";

export class Experience {
  constructor(scene, camera, parentGroup) {
    this.scene = scene;
    this.camera = camera;
    this.parentGroup = parentGroup;

    // To notify when all assets are loaded
    this.onLoaded = null;

    // Initialize all components
    this.init();

    // Call onLoaded callback if provided
    if (typeof this.onLoaded === "function") {
      this.onLoaded();
    }
  }

  init() {
    // Add orbit controls
    this.initOrbitControls();

    // Add environment lighting
    this.initEnvironment();

    // Add directional light
    this.addDirectionalLight();

    // Add floor
    this.addFloor();

    // Add floating book
    this.addFloatingBook();
  }

  initOrbitControls() {
    // Create orbit controls
    this.controls = new OrbitControls(
      this.camera,
      document.querySelector("canvas")
    );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
  }

  initEnvironment() {
    // Create studio-like environment lighting
    // This is a simplified version of the Environment component
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Add hemisphere light for studio-like environment
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);
  }

  addDirectionalLight() {
    // Create directional light with the same parameters
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    this.directionalLight.position.set(2, 5, 2);
    this.directionalLight.castShadow = true;

    // Configure shadow map
    this.directionalLight.shadow.mapSize.width = 2048;
    this.directionalLight.shadow.mapSize.height = 2048;
    this.directionalLight.shadow.bias = -0.0001;

    // Add the light to the scene
    this.scene.add(this.directionalLight);
  }

  addFloor() {
    // Create floor mesh with shadow material
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const shadowMaterial = new THREE.ShadowMaterial({
      transparent: true,
      opacity: 0.2,
    });

    const floor = new THREE.Mesh(planeGeometry, shadowMaterial);
    floor.position.y = -1.5;
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;

    // Add to scene
    this.scene.add(floor);
  }

  addFloatingBook() {
    // Create floating book
    const bookGroup = new THREE.Group();
    const book = new Book(); // Assuming Book is a THREE.js object
    bookGroup.add(book);

    // Apply float properties
    bookGroup.rotation.x = -Math.PI / 4;
    bookGroup.userData.floatIntensity = 1;
    bookGroup.userData.speed = 2;
    bookGroup.userData.rotationIntensity = 2;

    // Add to scene
    this.scene.add(bookGroup);
  }

  update() {
    // Update controls (needed for damping to work)
    if (this.controls) {
      this.controls.update();
    }
  }

  // Optional method to clean up resources
  dispose() {
    // Dispose geometries and materials
    if (this.controls) {
      this.controls.dispose();
    }
  }
}
