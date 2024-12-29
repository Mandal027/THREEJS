"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import gsap from "gsap";
import { createPlusSign, addGridPlusSigns } from "./PlusSign";
// import { createThickLine } from './ThickLine';
import { startAnimation } from "./CubeAnimation";
import { handleResize } from "./HandleResize";
import { createXLines } from "./LineX";
import { createZLines } from "./LineZ";
import { createNegativeZLines } from "./LineNegativeZ";
import { createNegativeXLines } from "./LineNegativeX";
import { createNavEvents, createNavTitle , createNavAlumni} from "./CreateNavTitle.js";
import { GUI } from "dat.gui"; // Correct import for dat.GUI

const gridSize = 100; // Example value, adjust as needed
const gridDivisions = 100; // Example value, adjust as needed
const step = gridSize / gridDivisions;

const ThreeScene = () => {
  useEffect(() => {
    // Existing Three.js setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 20;
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 1,
      frustumSize / -1.7,
      0.1,
      100000
    );
    camera.position.set(4.7, 11.39, 4.7);
    camera.lookAt(0, 0, 0);

    // Increase the final zoom value
    // camera.zoom = 1.5; // Adjust this value as needed
    // camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("threejs-canvas").appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Grid and Geometry setup
    const gridGroup = new THREE.Group();
    const gridColor = new THREE.Color(0x555555);
    const gridMaterial = new THREE.LineBasicMaterial({
      color: gridColor,
      opacity: 0.2, // Decreased opacity
      transparent: true,
    });

    addGridPlusSigns(gridGroup, gridSize, gridDivisions);
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);
    gridHelper.material = gridMaterial;
    gridGroup.add(gridHelper);
    scene.add(gridGroup);

    // Cube
    const cubeSize = 2;
    const cubeGeometry = new THREE.BoxGeometry(
      cubeSize,
      cubeSize * 1,
      cubeSize
    );
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfbffff });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 13.35, 0);
    scene.add(cube);

    // Hollow Cube
    const hollowCubeSize = 1.2;
    const hollowCubeThickness = 0.25;
    const outerGeometry = new RoundedBoxGeometry(
      hollowCubeSize,
      hollowCubeSize * 0.6,
      hollowCubeSize,
      10,
      0.1
    );
    const outerMaterial = new THREE.MeshBasicMaterial({
      color: 0xb0c4de,
      side: THREE.BackSide,
    });
    const hollowCubeOuter = new THREE.Mesh(outerGeometry, outerMaterial);
    hollowCubeOuter.position.set(0, 0.0, 0);
    scene.add(hollowCubeOuter);

    const targetScale = hollowCubeSize - hollowCubeThickness * 1.8;
    const innerGeometry = new THREE.BoxGeometry(
      targetScale - 0.02,
      targetScale * 0.5 - 0.02,
      targetScale - 0.02
    );
    const innerMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const hollowCubeInner = new THREE.Mesh(innerGeometry, innerMaterial);
    hollowCubeInner.position.set(0, -0.0, 0);
    scene.add(hollowCubeInner);

    const rectLight = new THREE.RectAreaLight(0xffffff, 5, 2, 2);
    rectLight.position.set(0, 0.001, 0);
    rectLight.rotation.x = -Math.PI / 2;
    scene.add(rectLight);

    const rectLightHelper = new RectAreaLightHelper(rectLight);
    rectLight.add(rectLightHelper);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Create and add the thick line
    // const thickLine = createThickLine(scene);
    // create lines along four directions
    createXLines(scene, step);
    createZLines(scene, step);
    createNegativeZLines(scene, step);
    createNegativeXLines(scene, step);

    // Start animation
    startAnimation(cube, camera, scene, cubeSize, targetScale);
    // Handle resize
    handleResize(camera, renderer, frustumSize, aspect);

    // Add corners group to the scene
    const cornersGroup = createNavTitle(0.2, 0xffffff); // Adjust size and color if needed
    cornersGroup.rotation.z = Math.PI / 2; // Rotate the corners group by Math.PI / 2
    cornersGroup.rotation.x = 1.64; // Set default X rotation to 1.64
    scene.add(cornersGroup);

    // Add navtitle Events
    const navEvents = createNavEvents(0.2, 0xffffff);
    navEvents.position.set(-7, 0, -7.5);
    navEvents.rotation.z = 0;
    navEvents.rotation.x = 1.64;
    scene.add(navEvents);

    //NavAlumni
    const navAlumni = createNavAlumni(0.2, 0xffffff);
    navAlumni.position.set(-7, 0, -7.5);
    navAlumni.rotation.z = 0;
    navAlumni.rotation.x = 1.64;
    scene.add(navAlumni);

    // Manually shift the position of the corners group
    cornersGroup.position.set(-0.07, 0, -8.5); // Adjust these values as needed

    // GUI configuration for corners group
    const cornersGroupControls = {
      zPosition: 0, // Default position along Z-axis
      zRotation: 0, // Default rotation around Z-axis
      xRotation: 1.64, // Default rotation around X-axis
      yRotation: 0, // Default rotation around Y-axis
    };

    // GUI configuration for navEvents group
    const navEventsControls = {
      xPosition: navEvents.position.x,
      yPosition: navEvents.position.y,
      zPosition: navEvents.position.z,
      xRotation: navEvents.rotation.x,
      yRotation: navEvents.rotation.y,
      zRotation: navEvents.rotation.z,
    };

    // const gui = new GUI();
    // gui.add(navEventsControls, 'xPosition', -5, 5, 0.1).name('NavEvents X Position').onChange((value) => {
    //   navEvents.position.x = value;
    // });
    // gui.add(navEventsControls, 'yPosition', -5, 5, 0.1).name('NavEvents Y Position').onChange((value) => {
    //   navEvents.position.y = value;
    // });
    // gui.add(navEventsControls, 'zPosition', -5, 5, 0.1).name('NavEvents Z Position').onChange((value) => {
    //   navEvents.position.z = value;
    // });
    // gui.add(navEventsControls, 'xRotation', 0, Math.PI * 2, 0.01).name('NavEvents X Rotation').onChange((value) => {
    //   navEvents.rotation.x = value;
    // });
    // gui.add(navEventsControls, 'yRotation', 0, Math.PI * 2, 0.01).name('NavEvents Y Rotation').onChange((value) => {
    //   navEvents.rotation.y = value;
    // });
    // gui.add(navEventsControls, 'zRotation', 0, Math.PI * 2, 0.01).name('NavEvents Z Rotation').onChange((value) => {
    //   navEvents.rotation.z = value;
    // });

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <>    
    
  <div id="threejs-canvas" className="" >
  <h1>PAINTING WING </h1>
  </div>
  </>
};

export default ThreeScene;
