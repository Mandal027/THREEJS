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
import {
  createNavEvents,
  createNavTitle,
  createNavAlumni,
  createNavMembers,
  createNavMernc,
  createNavBIT,
  createNavCollab,
  createNavInduction,
} from "./CreateNavTitle.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const gridSize = 100; // Example value, adjust as needed
const gridDivisions = 100; // Example value, adjust as needed
const step = gridSize / gridDivisions;
const group = new THREE.Group();  

const ThreeScene = () => {
  useEffect(() => {
    // Function to reload the page on resize
    const handleWindowResize = () => {
      window.location.reload();
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleWindowResize);

    // Existing Three.js setup
    const scene = new THREE.Scene();

    // Group for background and grid layout
    const backgroundGridGroup = new THREE.Group();
    scene.add(backgroundGridGroup);

    // Load a texture as the background
    const loader = new THREE.TextureLoader();
    loader.load("/noisy-background.jpg", function (texture) {
      scene.background = texture;
    });

    // Group for grid and background texture
    const gridBackgroundGroup = new THREE.Group();
    backgroundGridGroup.add(gridBackgroundGroup);

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
    const gridColor = new THREE.Color(0x000000); // Set grid color to black
    const gridMaterial = new THREE.LineBasicMaterial({
      color: gridColor,
      opacity: 0.1, // Decreased opacity
      transparent: true,
    });

    addGridPlusSigns(gridGroup, gridSize, gridDivisions);
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);
    gridHelper.material = gridMaterial;
    gridGroup.add(gridHelper);
    gridBackgroundGroup.add(gridGroup);

    // Cube
    const cubeSize = 2;
    const cubeGeometry = new THREE.BoxGeometry(
      cubeSize,
      cubeSize * 1,
      cubeSize
    );
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd25c25,
      transparent: true,
      opacity: 0.8,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 13.35, 0);
    scene.add(cube);

    // Hollow Cube
    const hollowCubeSize = 1.2;
    const hollowCubeThickness = 0.27;
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

    const rectLight = new THREE.RectAreaLight(0x00000, 5, 2, 2);
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
    const xLines = createXLines(scene, step, 0x0000); // Set line color to black
    const zLines = createZLines(scene, step, 0x0000); // Set line color to black
    const negativeZLines = createNegativeZLines(scene, step, 0x0000); // Set line color to black
    const negativeXLines = createNegativeXLines(scene, step, 0x0000); // Set line color to black
    // group.add(xLines);
    // group.add(zLines);
    // group.add(negativeZLines);
    // group.add(negativeXLines);

    // Add corners group to the scene
    const cornersGroup = createNavTitle(0.2, 0xa44c24); // Adjust size and color if needed
    cornersGroup.rotation.z = Math.PI / 2; // Rotate the corners group by Math.PI / 2
    cornersGroup.rotation.x = 1.64; // Set default X rotation to 1.64
    cornersGroup.position.set(-2.3, 0, -10.5); // Adjust these values as needed
    group.add(cornersGroup);

    // Add navtitle Events
    const navEvents = createNavEvents(0.2, 0xa44c24);
    navEvents.rotation.set(1.6, 0, 3.2);
    navEvents.position.set(-6.9, 0.2, -7.4); // Adjust these values as needed

    // Add navtitle Members
    const navMembers = createNavMembers(0.2, 0xa44c24);
    navMembers.position.set(-6.9, 0.2, 6.6);
    navMembers.rotation.set(1.64, 0, 1.583);
    group.add(navMembers);

    // Add navtitle Alumni
    const navAlumni = createNavAlumni(0.2, 0xa44c24);
    navAlumni.position.set(-0.5, 0, 6.9);
    navAlumni.rotation.set(1.64, 0, 1.583);
    group.add(navAlumni);

    // Add navtitle Merchandise
    const navMernc = createNavMernc(0.2, 0xa44c24);
    navMernc.position.set(9.3, 1.5, -0.5);
    navMernc.rotation.set(1.57, 0, 0);
    group.add(navMernc);




    // <iframe src='https://my.spline.design/molang3dcopy-bf8f454b075cc8cfdad22f8b41cb8a9d/' frameborder='0' width='100%' height='100%'></iframe>
    // <iframe src='https://my.spline.design/tshirtbodymaledarkcopy-905869297fb73d7591d9157b051a4e74/' frameborder='0' width='100%' height='100%'></iframe>

  const tshirtLoader = new GLTFLoader();
  tshirtLoader.load(
    '/tshirt.glb', // Path to the model in the public folder
    (gltf) => {
      // Add the loaded model to the scene
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log(`Model ${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.error('An error occurred:', error);
    }
  );




    // Add navtitle BIT
    const navBIT = createNavBIT(0.2, 0xa44c24);
    navBIT.position.set(-8.5, 0, 0);
    navBIT.rotation.set(1.57, 0, 0);
    group.add(navBIT);

    // Add navtitle Collab
    const navCollab = createNavCollab(0.2, 0xa44c24);
    navCollab.position.set(5.4, -0.2, 3.7);
    navCollab.rotation.set(1.71, 0, 0.08);
    group.add(navCollab);

    // Add navtitle Induction
    const navInduction = createNavInduction(0.2, 0xa44c24);
    navInduction.position.set(3.5, 0, -7);
    navInduction.rotation.set(1.57, 0, 6.28);
    group.add(navInduction);

    // Start animation and add navEvents after the animation completes
    startAnimation(cube, camera, scene, cubeSize, targetScale, () => {
      scene.add(group);
      group.add(navEvents);
    });

   
    // Handle resize
    handleResize(camera, renderer, frustumSize, aspect);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      // rippleEffect.update(); // Update ripple animation
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
    {/* <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.58/build/spline-viewer.js"></script> */}
    {/* <spline-viewer url="https://prod.spline.design/4noEgOe65nRGzAKc/scene.splinecode"></spline-viewer> */}
      <div id="threejs-canvas" className=""></div>
    </>
  );
};

export default ThreeScene;
