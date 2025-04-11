"use client";
import { useEffect, useState } from "react";
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
import { GUI } from "dat.gui";
// import Header from "./Header";
import BitSindri from "./BitSindri";
import Members from "./Members";
import Alumni from "./Alumni";
import { setupNavBITEventListener } from './NavBITEventListener';
import { setupNavMembersEventListener } from './NavMembersEventListener';
import { setupNavAlumniEventListener } from './NavAlumniEventListener';
import { setupNavCollabEventListener } from './NavCollabEventListener';
import Collabs from './Collabs'; // Import Collabs component

const gridSize = 100; // Example value, adjust as needed
const gridDivisions = 100; // Example value, adjust as needed
const step = gridSize / gridDivisions;
const group = new THREE.Group();

const ThreeScene = () => {
  const [showBitSindri, setshowBitSindri] = useState(false);
  const [showMembers, setshowMembers] = useState(false);
  const [showAlumni, setshowAlumni] = useState(false);
  const [showCollabs, setshowCollabs] = useState(false); // Add state for Collabs
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  useEffect(() => {
    // Function to reload the page on resize
    // const handleWindowResize = () => {
    //   window.location.reload();
    // };

    // Attach the resize event listener
    // window.addEventListener("resize", handleWindowResize);

    // Existing Three.js setup
    const scene = new THREE.Scene();
    const superGroup = new THREE.Group();
    scene.add(superGroup);

    // Group for background and grid layout
    const backgroundGridGroup = new THREE.Group();
    scene.add(backgroundGridGroup);
    superGroup.add(backgroundGridGroup);

    // Load a texture as the background
    const loader = new THREE.TextureLoader();
    loader.load("/noisy-background.jpg", function (texture) {
      scene.background = texture;
    });

    // Group for grid and background texture
    const gridBackgroundGroup = new THREE.Group();
    backgroundGridGroup.add(gridBackgroundGroup);
    superGroup.add(gridBackgroundGroup);

    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 17;
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 1,
      frustumSize / -1.4,
      0.1,
      100000
    );
    camera.position.set(4.7, 11.39, 4.7);
    camera.lookAt(0, 0, 0);

    // Increase the final zoom value
    // camera.zoom = 1.5; // Adjust this value as needed
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("threejs-canvas").appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // Enable damping for smooth movement
    controls.enableDamping = true;
    // Create an Axis Helper
    // const axesHelper = new THREE.AxesHelper(5); // Size of 5 means each axis is 5 units long
    // scene.add(axesHelper);

    // // Rotation limits (in radians)
    // controls.minPolarAngle = Math.PI / 10; // Limit the downward view (minimum vertical angle)
    // controls.maxPolarAngle = Math.PI / 2; // Limit the upward view (maximum vertical angle)

    // // Prevent full 360° horizontal rotation (optional)
    // controls.minAzimuthAngle = -Math.PI / 4; // Limit the leftward rotation
    // controls.maxAzimuthAngle = Math.PI / 4; // Limit the rightward rotation

    // // Zoom limits
    // controls.minDistance = 10; // Minimum distance from the target
    // controls.maxDistance = 50; // Maximum distance from the target

    // Disable panning
    controls.enablePan = false;

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

    // create lines along four directions
    createXLines(scene, step, 0x0000); // Set line color to black
    createZLines(scene, step, 0x0000); // Set line color to black
    createNegativeZLines(scene, step, 0x0000); // Set line color to black
    createNegativeXLines(scene, step, 0x0000); // Set line color to black

    // Add corners group to the scene
    const cornersGroup = createNavTitle(0.2, 0xa44c24); // Adjust size and color if needed
    cornersGroup.position.set(-2.3, 0, -10.5); // Adjust these values as needed
    cornersGroup.rotation.set(4.71, 0, 1.57);
    group.add(cornersGroup);

    // Add navtitle Events
    const navEvents = createNavEvents(0.2, 0xa44c24);
    navEvents.rotation.set(4.71, 0, 0);
    navEvents.position.set(-7, 0, -7.5); // Adjust these values as needed

    // Add navtitle Members
    const navMembers = createNavMembers(0.2, 0xa44c24);
    navMembers.position.set(-6.5, 0, 6.5);
    navMembers.rotation.set(4.71, 0, 1.57);
    group.add(navMembers);

    // Setup event listener for navMembers
    const cleanupNavMembersEventListener = setupNavMembersEventListener(scene, camera, navMembers, group, setOverlayOpacity, setshowMembers);

    // Add navtitle Alumni
    const navAlumni = createNavAlumni(0.2, 0xa44c24);
    navAlumni.position.set(-0.55, 0, 6.9);
    navAlumni.rotation.set(4.71, 0, 1.57);
    group.add(navAlumni);

    // Setup event listener for navAlumni
    const cleanupNavAlumniEventListener = setupNavAlumniEventListener(scene, camera, navAlumni, group, setOverlayOpacity, setshowAlumni);

    // Add navtitle Merchandise
    const navMernc = createNavMernc(0.2, 0xa44c24);
    navMernc.position.set(8.5, 0, -1.2);
    navMernc.rotation.set(1.6, 0, 0);
    group.add(navMernc);

    // Add navtitle BIT
    const navBIT = createNavBIT(0.2, 0xa44c24);
    navBIT.position.set(-8.5, 0, 0);
    navBIT.rotation.set(1.57, 0, 0);
    group.add(navBIT);

    // Add navtitle Collab
    const navCollab = createNavCollab(0.2, 0xa44c24);
    navCollab.position.set(5.5, 0, 3.8);
    navCollab.rotation.set(1.6, 3.1, 3.1);
    group.add(navCollab);

    // Setup event listener for navCollab
    const cleanupNavCollabEventListener = setupNavCollabEventListener(scene, camera, navCollab, group, setOverlayOpacity, setshowCollabs);

    // Add navtitle Induction
    const navInduction = createNavInduction(0.2, 0xa44c24);
    navInduction.position.set(3.5, 0, -7);
    navInduction.rotation.set(4.7, 0, 0);
    group.add(navInduction);

    //add ambient light to the gltf model
    const ambientLightModel = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLightModel);

    // Start animation and add navEvents after the animation completes
    startAnimation(cube, camera, scene, cubeSize, targetScale, () => {
      scene.add(group);
      group.add(navEvents);
    });


    controls.enable = false
    // Handle resize
    // handleResize(camera, renderer, frustumSize, aspect);

    // Mouse tracking
// const mouse = { x: 0, y: 0 };

    // window.addEventListener('mousemove', (event) => {
    //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // });
   

    function animate() {
      requestAnimationFrame(animate);



      
      controls.update();

      // rippleEffect.update(); // Update ripple animation
      renderer.render(scene, camera);
    }

   

    



    animate();

    // Function to handle navBIT click and show Model1
    const handleNavBITClick = () => {
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const onMouseClick = (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(navBIT, true);

        if (intersects.length > 0) {
          const gltfModels = scene.children.filter((child) => child.isMesh && child.name.startsWith('Model'));
          gltfModels.forEach((model) => {
            model.visible = model.name === 'Model1';
          });
        }
      };

      window.addEventListener("click", onMouseClick);

      return () => {
        window.removeEventListener("click", onMouseClick);
      };
    };

    // Setup event listener for navBIT
    const cleanupNavBITEventListener = setupNavBITEventListener(scene, camera, navBIT, group, setOverlayOpacity, setshowBitSindri);

    // Setup event listener for navBIT to show Model1
    const cleanupNavBITClickListener = handleNavBITClick();

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      cleanupNavBITEventListener();
      cleanupNavMembersEventListener();
      cleanupNavAlumniEventListener();
      cleanupNavCollabEventListener();
      cleanupNavBITClickListener();
    };
  }, []);

  return (
    <>
      <div id="threejs-canvas" className="relative w-full h-screen"></div>
      <div 
        className="fixed inset-0 flex items-center justify-start transition-opacity duration-500"
        style={{ 
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity * 1})`,
          pointerEvents: showBitSindri || showMembers || showAlumni || showCollabs ? 'auto' : 'none',
          opacity: showBitSindri || showMembers || showAlumni || showCollabs ? 1 : 0
        }}
      >
        {showBitSindri && <BitSindri />}
        {showMembers && <Members />}
        {showAlumni && <Alumni />}
        {showCollabs && <Collabs />} Add Collabs component
      </div>
      <div id="three-scene" />;
    </>
  );
};

export default ThreeScene;
