"use client";
import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import gsap from "gsap";
import { createPlusSign, addGridPlusSigns } from "../components/Lines/PlusSign";
import { startAnimation } from "./CubeAnimation";
import {
  createNavEvents,
  createNavAboutUs,
  createNavAlumni,
  createNavMembers,
  createNavMerchandise,
  createNavBIT,
  createNavCollab,
  createNavInduction,
} from "./CreateNavTitle.js";
import { GUI } from "dat.gui";
import * as dat from "dat.gui";
// import Header from "./Header";
import BitSindri from "./BitSindri";
import Members from "./Members";
import Alumni from "./Alumni";
import { setupNavBITEventListener } from "./EventListeners/NavBITEventListener";
import { setupNavMembersEventListener } from "./EventListeners/NavMembersEventListener";
import { setupNavAlumniEventListener } from "./EventListeners/NavAlumniEventListener";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { Raycaster } from "three";
import { setupNavEventsEventListener } from "./EventListeners/NavEventsEventListener";
import { setupNavMerchandiseEventListener } from "./EventListeners/NavMerchandiseEventListener";
import { setupNavInductionEventListener } from "./EventListeners/NavInductionEventListener";
import { setupNavCollabEventListener } from "./EventListeners/NavCollabEventListener";
import { setupNavAboutUsEventListener } from "./EventListeners/NavAboutUsEventListener";

import Events from "./Events";
import Merchandise from "./Merchandise";
import ModelViewer from "./ModelViewer";
import { useRouter } from "next/navigation";

const gridSize = 100; // Example value, adjust as needed
const gridDivisions = 100; // Example value, adjust as needed
const step = gridSize / gridDivisions;
const group = new THREE.Group();

const ThreeScene = () => {
  const [showBitSindri, setShowBitSindri] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showAlumni, setShowAlumni] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showMerchandise, setShowMerchandise] = useState(false);
  const [showInduction, setShowInduction] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [activeContent, setActiveContent] = useState(null);
  const cameraRef = useRef(null);

  const router = useRouter();
  const mouse = new THREE.Vector2();

  useEffect(() => {
    // Move these to the top of useEffect
    let artStudioModel = null;
    let artStudioClickable = false;
    let isArtStudioScaled = false; // Track scale state

    const raycaster = new THREE.Raycaster();

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
    // const loader = new THREE.TextureLoader();
    // loader.load("/noisy-background.jpg", function (texture) {
    //   scene.background = texture;
    // });

    scene.background = new THREE.Color(0xffffff); // Set back

    // Group for grid and geometry setup
    const gridBackgroundGroup = new THREE.Group();
    backgroundGridGroup.add(gridBackgroundGroup);
    superGroup.add(gridBackgroundGroup);

    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 18;

    cameraRef.current = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 1,
      frustumSize / -1.4,
      0.1,
      100000
    );
    cameraRef.current.position.set(4.7, 11.39, 4.7);
    cameraRef.current.lookAt(0, 0, 0);
    cameraRef.current.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById("threejs-canvas").appendChild(renderer.domElement);

    const controls = new OrbitControls(cameraRef.current, renderer.domElement);

    // Enable damping for smooth movement
    controls.enableDamping = true;

    // Initially disable manual controls
    controls.enableRotate = false;
    controls.enableZoom = false;

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

    // Add the mousemove event listener inside useEffect
    window.addEventListener("mousemove", (event) => {
      if (!mouseControlEnabled) return; // Only process mouse movement after animation
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Show/hide instruction on hover
      if (artStudioModel && artStudioClickable) {
        const instructionEl = document.getElementById("model-instruction");
        if (instructionEl) {
          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, cameraRef.current);
          const intersects = raycaster.intersectObjects(
            artStudioModel.children,
            true
          );

          if (intersects.length > 0) {
            instructionEl.style.left = `${event.clientX}px`;
            instructionEl.style.top = `${event.clientY - 30}px`; // Show above cursor
            instructionEl.classList.add("visible");
          } else {
            instructionEl.classList.remove("visible");
          }
        }
      }
    });

    // Disable panning
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.enableZoom = false;

    // Grid and Geometry setup
    const gridGroup = new THREE.Group();
    const gridColor = new THREE.Color(0x000000); // Set grid color to black
    const gridMaterial = new THREE.LineBasicMaterial({
      color: gridColor,
      opacity: 0.1, // Decreased opacity
      transparent: true,
    });

    // const gltfLoader = new GLTFLoader();
    // gltfLoader.load(
    //   '/pw.glb',
    //   (gltf) => {
    //     const model = gltf.scene;
    //     model.scale.set(10, 10, 10);
    //     model.position.set(0, 0, 0);
    //     model.rotation.set(0, 0, 0);
    //     scene.add(model);

    //     // GUI should go here — after model is loaded
    //
    //   },
    //   undefined,
    //   (error) => {
    //     console.error('Error loading GLTF model:', error);
    //   }
    // );

    addGridPlusSigns(gridGroup, gridSize, gridDivisions);
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions);
    gridHelper.material = gridMaterial;
    gridGroup.add(gridHelper);
    gridBackgroundGroup.add(gridGroup);

    //       // Load texture
    // const textureLoader = new THREE.TextureLoader();
    // const texture = textureLoader.load("/noisy-background.jpg"); // Make sure image is inside /public/textures/
    //     const geometry = new THREE.PlaneGeometry(50, 50); // width: 2, height: 1
    //     const material = new THREE.MeshBasicMaterial({map:texture, side: THREE.DoubleSide });
    //     const plane = new THREE.Mesh(geometry, material);
    //     plane.rotation.x = Math.PI / 2; // Rotate the plane to be horizontal
    //     scene.add(plane);

    // Cube
    const hasNavigatedFrom3DScene = sessionStorage.getItem(
      "hasNavigatedFrom3DScene"
    );
    const cubeSize = hasNavigatedFrom3DScene === "true" ? 0 : 2;
    const cubeGeometry = new THREE.BoxGeometry(
      cubeSize,
      cubeSize * 1,
      cubeSize
    );
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0xd25c25,
      transparent: true,
      opacity: hasNavigatedFrom3DScene === "true" ? 0 : 0.8,
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 13.35, 0);
    scene.add(cube);

    //Loading Environment

    // Load the SVG
    const gltfLoader = new GLTFLoader();

    //add dat.gui to control scale and postion of the stroke model
    // gltfLoader.load(
    //   "/strokes.glb", // Replace with the path to your GLTF file
    //   (gltf) => {
    //     const model = gltf.scene;

    //     // Position and scale the GLTF model
    //     model.scale.set(5, 5, 0); // Adjust scale as needed
    //     model.position.set(8.5, -0.2, -1.5); // Adjust position as needed
    //     model.rotation.set(1.57, 3.14, 4.71); // Adjust rotation as needed

    //     group.add(model);

    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Error loading GLTF model:", error);
    //   }
    // );
    // gltfLoader.load(
    //   "/strokes.glb", // Replace with the path to your GLTF file
    //   (gltf) => {
    //     const model = gltf.scene;

    //     // Position and scale the GLTF model
    //     model.scale.set(5, 5, 0); // Adjust scale as needed
    //     model.position.set(-8.4, 0, 0.1); // Adjust position as needed
    //     model.rotation.set(1.57, 3.14, 4.71); // Adjust rotation as needed

    //     group.add(model);

    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Error loading GLTF model:", error);
    //   }
    // );

    // gltfLoader.load(
    //   "/strokes.glb", // Replace with the path to your GLTF file
    //   (gltf) => {
    //     const model = gltf.scene;

    //     // Position and scale the GLTF model
    //     model.scale.set(5, 5, 0); // Adjust scale as needed
    //     model.position.set(3.6, 0, -7); // Adjust position as needed
    //     model.rotation.set(1.57, 3.14, 4.71); // Adjust rotation as needed

    //     group.add(model);

    //     // Add dat.gui to control scale and position of the stroke model

    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Error loading GLTF model:", error);
    //   }
    // );
    // gltfLoader.load(
    //   "/strokes.glb", // Replace with the path to your GLTF file
    //   (gltf) => {
    //     const model = gltf.scene;

    //     // Position and scale the GLTF model
    //     model.scale.set(3.3, 5, 0); // Adjust scale as needed
    //     model.position.set(-6.9, 0, -7.8); // Adjust position as needed
    //     model.rotation.set(1.57, 3.14, 4.71); // Adjust rotation as needed

    //     group.add(model);

    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Error loading GLTF model:", error);
    //   }
    // );

    // gltfLoader.load(
    //   "/strokes.glb", // Replace with the path to your GLTF file
    //   (gltf) => {
    //     const model = gltf.scene;

    //     // Position and scale the GLTF model
    //     model.scale.set(3.9, 5, 0); // Adjust scale as needed
    //     model.position.set(-2.5, 0, -10.5); // Adjust position as needed
    //     model.rotation.set(-1.57, 3.14, 0); // Adjust rotation as needed

    //     group.add(model);

    //     // Add dat.gui to control scale and position of the stroke model

    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Error loading GLTF model:", error);
    //   }
    // );
    // gltfLoader.load(
    //   "/strokes.glb", // Replace with the path to your GLTF file
    //   (gltf) => {
    //     const model = gltf.scene;

    //     // Position and scale the GLTF model
    //     model.scale.set(3.8, 5, 0); // Adjust scale as needed
    //     model.position.set(-0.5, 0, 7.1); // Adjust position as needed
    //     model.rotation.set(-1.57, 3.14, 0); // Adjust rotation as needed

    //     group.add(model);

    //     // Add dat.gui to control scale and position of the stroke model

    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Error loading GLTF model:", error);
    //   }
    // );
    // gltfLoader.load(
    //   "/strokes.glb", // Replace with the path to your GLTF file
    //   (gltf) => {
    //     const model = gltf.scene;

    //     // Position and scale the GLTF model
    //     model.scale.set(3.8, 5, 0); // Adjust scale as needed
    //     model.position.set(-6.8, 0, 6.5); // Adjust position as needed
    //     model.rotation.set(-1.57, 3.14, 0); // Adjust rotation as needed

    //     group.add(model);

    //     // Add dat.gui to control scale and position of the stroke model

    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Error loading GLTF model:", error);
    //   }
    // );
    // gltfLoader.load(
    //   "/isometric.glb", // Replace with the path to your GLTF file
    //   (gltf) => {
    //     const model = gltf.scene;

    //     // Position and scale the GLTF model
    //     model.scale.set(0.5, 0.5, 0.5); // Adjust scale as needed
    //     model.position.set(0, 0.3, 0.3); // Adjust position as needed
    //     // model.rotation.set(-1.57, 0, 0); // Adjust rotation as needed

    //     // Auto rotate the isometric model
    //     // const rotateIsometric = () => {
    //     //   model.rotation.y += 0.005;
    //     //   requestAnimationFrame(rotateIsometric);
    //     // };
    //     // rotateIsometric();

    //     group.add(model);

    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Error loading GLTF model:", error);
    //   }
    // );

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // gltfLoader.load(
    //   "/strokes.glb", // Replace with the path to your GLTF file
    //   (gltf) => {
    //     const model = gltf.scene;

    //     // Position and scale the GLTF model
    //     model.scale.set(3.8, 5, 0); // Adjust scale as needed
    //     model.position.set(5.4, 0, 3.5); // Adjust position as needed
    //     model.rotation.set(-1.57, 3.14, 1.57); // Adjust rotation as needed

    //     group.add(model);

    //     // Add dat.gui to control scale and position of the stroke model

    //   },
    //   undefined,
    //   (error) => {
    //     console.error("Error loading GLTF model:", error);
    //   }
    // );

    // Hollow Cube
    const hollowCubeSize = 1.2;
    const hollowCubeThickness = 0.27;
    const outerGeometry = new RoundedBoxGeometry(
      hollowCubeSize,
      hollowCubeSize * 0.8,
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
    // scene.add(rectLight);

    const rectLightHelper = new RectAreaLightHelper(rectLight);
    rectLight.add(rectLightHelper);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // create lines along four directions
    // createXLines(scene, step, 0x0000); // Set line color to black
    // createZLines(scene, step, 0x0000); // Set line color to black
    //   createNegativeZLines(scene, step, 0x0000); // Set line color to black
    //   createNegativeXLines(scene, step, 0x0000); // Set line color to black

    // Add corners group to the scene
    const navAboutUs = createNavAboutUs(0.2, 0xa44c24); // Adjust size and color if needed
    navAboutUs.position.set(-2.3, 0, -10.5); // Adjust these values as needed
    navAboutUs.rotation.set(4.71, 0, 1.57);
    group.add(navAboutUs);


    // Setup event listener for navAboutUs
    const cleanupNavAboutUsEventListener = setupNavAboutUsEventListener(
      scene,
      cameraRef.current,
      navAboutUs,
      group,
      setOverlayOpacity,
      setShowAboutUs,
      router // Pass the router to the event listener
    );

    // Add navtitle Events
    const navEvents = createNavEvents(0.2, 0xa44c24);
    navEvents.rotation.set(4.71, 0, 0);
    navEvents.position.set(-7, 0, -7.5); // Adjust these values as needed
    group.add(navEvents);

    // Setup event listener for navEvents
    const cleanupNavEventsEventListener = setupNavEventsEventListener(
      scene,
      cameraRef.current,
      navEvents,
      group,
      setOverlayOpacity,
      setShowEvents
    );

    // Add navtitle Members
    const navMembers = createNavMembers(0.2, 0xa44c24);
    navMembers.position.set(-6.5, 0, 6.5);
    navMembers.rotation.set(4.71, 0, 1.57);
    group.add(navMembers);

    // Setup event listener for navMembers
    const cleanupNavMembersEventListener = setupNavMembersEventListener(
      scene,
      cameraRef.current,
      navMembers,
      group,
      setOverlayOpacity,
      setShowMembers
    );

    // Add navtitle Alumni
    const navAlumni = createNavAlumni(0.2, 0xa44c24);
    navAlumni.position.set(-0.55, 0, 6.9);
    navAlumni.rotation.set(4.71, 0, 1.57);
    group.add(navAlumni);

    // Setup event listener for navAlumni
    const cleanupNavAlumniEventListener = setupNavAlumniEventListener(
      scene,
      cameraRef.current,
      navAlumni,
      group,
      setOverlayOpacity,
      setShowAlumni
    );

    // Add navtitle Merchandise
    const navMerchandise = createNavMerchandise(0.2, 0xa44c24);
    navMerchandise.position.set(8.5, 0, -1.2);
    navMerchandise.rotation.set(1.6, 0, 0);
    group.add(navMerchandise);

    // Setup event listener for Merchandise
    const cleanupNavMerchandiseEventListener = setupNavMerchandiseEventListener(
      scene,
      cameraRef.current,
      navMerchandise,
      group,
      setOverlayOpacity,
      setShowMerchandise
    );

    // Add navtitle BIT
    const navBIT = createNavBIT(0.2, 0xa44c24);
    navBIT.position.set(-8.5, 0, 0);
    navBIT.rotation.set(1.57, 0, 0);
    navBIT.userData.isNavTitle = true; // Mark as a navTitle
    group.add(navBIT);

    // Add navtitle Collab
    const navCollab = createNavCollab(0.2, 0xa44c24);
    navCollab.position.set(5.5, 0, 3.8);
    navCollab.rotation.set(1.6, 3.1, 3.1);
    group.add(navCollab);

    // Setup event listener for navCollab
    const cleanupNavCollabEventListener = setupNavCollabEventListener(
      scene,
      cameraRef.current,
      navCollab,
      group,
      setOverlayOpacity,
      setShowBitSindri,
      router
    );

    // Add navtitle Induction
    const navInduction = createNavInduction(0.2, 0xa44c24);
    navInduction.position.set(3.5, 0, -7);
    navInduction.rotation.set(4.7, 0, 0);
    group.add(navInduction);
    // Setup event listener for Merchandise
    const cleanupNavInductionEventListener = setupNavInductionEventListener(
      scene,
      cameraRef.current,
      navInduction,
      group,
      setOverlayOpacity,
      setShowInduction,
      router
    );

    //add ambient light to the gltf model
    const ambientLightModel = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLightModel);

    //add point light

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    let mouseControlEnabled = false; // Add flag to control mouse movement

    window.addEventListener("mousemove", (event) => {
      if (!mouseControlEnabled) return; // Only process mouse movement after animation
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Show/hide instruction on hover
      if (artStudioModel && artStudioClickable) {
        const instructionEl = document.getElementById("model-instruction");
        if (instructionEl) {
          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(mouse, cameraRef.current);
          const intersects = raycaster.intersectObjects(
            artStudioModel.children,
            true
          );

          if (intersects.length > 0) {
            instructionEl.style.left = `${event.clientX}px`;
            instructionEl.style.top = `${event.clientY - 30}px`; // Show above cursor
            instructionEl.classList.add("visible");
          } else {
            instructionEl.classList.remove("visible");
          }
        }
      }
    });

    // Check if we're returning from modelviewer route
    if (hasNavigatedFrom3DScene === "true") {
      // Clear the flag
      sessionStorage.removeItem("hasNavigatedFrom3DScene");

      // Set specific camera position and zoom
      cameraRef.current.position.set(4.6, 8.2, 4.6);
      cameraRef.current.zoom = 1.3; // Changed from -2 to 0.5 for proper zoom
      cameraRef.current.updateProjectionMatrix();

      // Skip animation and enable mouse control immediately
      scene.add(group);
      group.add(navEvents);
      mouseControlEnabled = true;

      // Directly add artStudioModel to superGroup if loaded, or load and add it immediately
      if (artStudioModel && !superGroup.children.includes(artStudioModel)) {
        superGroup.add(artStudioModel);
        // Animate scale from (0,0,0) to (1,1,1) for smooth popup
        artStudioModel.scale.set(0, 0, 0);
        gsap.to(artStudioModel.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.1, // Reduced from 0.8 to 0.5 for faster animation
          ease: "power2.out",
        });
        controls.enableRotate = true;
        controls.enableZoom = true;
        controls.target.copy(artStudioModel.position);
        controls.update();
      } else if (!artStudioModel) {
        // If not loaded yet, load and add immediately
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
          "/art_studio.glb",
          (gltf) => {
            artStudioModel = gltf.scene;
            artStudioModel.position.set(0.5, 2, 0);
            artStudioModel.scale.set(0, 0, 0); // Start from 0 for animation

            // Animate scale from (0,0,0) to (1,1,1) for smooth popup
            gsap.to(artStudioModel.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.5, // Reduced from 0.8 to 0.5 for faster animation
              ease: "power2.out",
            });

            // Add strong ambient light to the model
            const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
            artStudioModel.add(ambientLight);

            // Add a bright point light above the model
            const pointLight = new THREE.PointLight(0xffffff, 2, 100);
            pointLight.position.set(0.5, 8, 0);
            pointLight.castShadow = true;
            artStudioModel.add(pointLight);

            // Optionally add a directional light for more even illumination
            const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
            dirLight.position.set(5, 10, 5);
            dirLight.castShadow = true;
            artStudioModel.add(dirLight);

            // Enable shadow casting and receiving for all meshes in the model
            artStudioModel.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });

            artStudioClickable = true;
            superGroup.add(artStudioModel);

            // Animate scale from (0,0,0) to (1,1,1) for smooth popup
            gsap.to(artStudioModel.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 0.5, // Reduced from 0.8 to 0.5 for faster animation
              ease: "power2.out",
            });

            controls.enableRotate = true;
            controls.enableZoom = true;
            controls.target.copy(artStudioModel.position);
            controls.update();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
          }
        );
      }
    } else {
      // Prepare to pop up the model 3 seconds before the cube animation completes

      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        "/art_studio.glb",
        (gltf) => {
          artStudioModel = gltf.scene;
          artStudioModel.position.set(0.5, 2, 0);
          artStudioModel.scale.set(1, 1, 1);

          // Add strong ambient light to the model
          const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Increased intensity
          artStudioModel.add(ambientLight);

          // Add a bright point light above the model
          const pointLight = new THREE.PointLight(0xffffff, 2, 100); // Increased intensity
          pointLight.position.set(0.5, 8, 0); // Higher above the model
          pointLight.castShadow = true;
          artStudioModel.add(pointLight);

          // Optionally add a directional light for more even illumination
          const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
          dirLight.position.set(5, 10, 5);
          dirLight.castShadow = true;
          artStudioModel.add(dirLight);

          // Enable shadow casting and receiving for all meshes in the model
          artStudioModel.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          // Make model clickable when added to scene
          artStudioClickable = true;
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
        }
      );

      // Run the normal animation flow
      startAnimation(
        cube,
        cameraRef.current,
        scene,
        cubeSize,
        targetScale,
        () => {
          scene.add(group);
          group.add(navEvents);
          mouseControlEnabled = true;

          // Enable OrbitControls for art_studio.glb when it appears
          if (artStudioModel && !superGroup.children.includes(artStudioModel)) {
            superGroup.add(artStudioModel);
            artStudioModel.position.y = 2;
            controls.enableRotate = true;
            controls.enableZoom = true;
            controls.target.copy(artStudioModel.position);
            controls.update();
          }
        },
        () => {
          // 3 seconds before animation completes
          if (artStudioModel && !superGroup.children.includes(artStudioModel)) {
            superGroup.add(artStudioModel);
            artStudioModel.position.y = 2;
            controls.enableRotate = true;
            controls.enableZoom = true;
            controls.target.copy(artStudioModel.position);
            controls.update();
          }
        }
      );

      // If your startAnimation does not support an "almost complete" callback,
      // you can use setTimeout to add the model 3 seconds before the animation's known duration ends:

      /*
      const animationDuration = 5; // seconds, adjust to your animation's duration
      setTimeout(() => {
        if (artStudioModel && !scene.children.includes(artStudioModel)) {
          scene.add(artStudioModel);
          artStudioModel.position.y = 2;
        }
      }, (animationDuration - 3) * 1000);
      */
    }

    window.addEventListener("dblclick", (event) => {
      if (!artStudioModel || !artStudioClickable) return;

      // Raycast to check if artStudioModel was double-clicked
      const mouseClick = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouseClick, cameraRef.current);

      const intersects = raycaster.intersectObjects(
        artStudioModel.children,
        true
      );
      if (intersects.length > 0) {
        // Toggle scale with smooth transition
        if (!isArtStudioScaled) {
          gsap.to(artStudioModel.scale, {
            x: 2,
            y: 2,
            z: 2,
            duration: 0.5, // Reduced from 0.7 to 0.5 for faster animation
            ease: "power2.out",
            onComplete: () => {
              isArtStudioScaled = true;
            },
          });
        } else {
          gsap.to(artStudioModel.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5, // Reduced from 0.7 to 0.5 for faster animation
            ease: "power2.out",
            onComplete: () => {
              isArtStudioScaled = false;
            },
          });
        }
      }
    });

    function animate() {
      requestAnimationFrame(animate);

      if (mouseControlEnabled) {
        // Only apply mouse movement when enabled
        superGroup.rotation.y += (mouse.x * 0.1 - superGroup.rotation.y) * 0.1;
        superGroup.rotation.x += (mouse.y * 0.1 - superGroup.rotation.x) * 0.1;

        group.rotation.y += (mouse.x * 0.1 - group.rotation.y) * 0.1;
        group.rotation.x += (mouse.y * 0.1 - group.rotation.x) * 0.1;
      }

      controls.update();
      renderer.render(scene, cameraRef.current);
    }

    animate();

    // Add click event listener for artStudioModel
    window.addEventListener("click", (event) => {
      if (!artStudioModel || !artStudioClickable) return;

      // Raycast to check if artStudioModel was clicked
      const mouseClick = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouseClick, cameraRef.current);

      // Check intersection with all meshes in artStudioModel
      const intersects = raycaster.intersectObjects(
        artStudioModel.children,
        true
      );
      if (intersects.length > 0) {
        // Animate camera to zoom in and focus on the model
        const targetPos = artStudioModel.position.clone();
        const cam = cameraRef.current;
        gsap.to(cam.position, {
          duration: 1,
          // x: targetPos.x,
          // y: targetPos.y + 4, // Adjust for a nice top view
          z: targetPos.z + 4, // Adjust for a nice front view
          onUpdate: () => {
            cam.lookAt(targetPos);
            controls.target.copy(targetPos);
            controls.update();
          },
        });
      }
    });

    // Setup event listener for navBIT
    const cleanupNavBITEventListener = setupNavBITEventListener(
      scene,
      cameraRef.current,
      navBIT,
      group,
      setOverlayOpacity,
      setShowBitSindri
    );
    // Cleanup event listener when the component unmounts
    return () => {
      // window.removeEventListener("resize", handleWindowResize);
      // window.removeEventListener("click", onMouseClick);
      // cleanupNavBITEventListener();
      window.removeEventListener("mousemove", () => {});
      cleanupNavMembersEventListener();
      cleanupNavAlumniEventListener();
    };
  }, [router]); // Add missing dependencies

  return (
    <>
      <style jsx>{`
        .model-instruction {
          position: fixed;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.75);
          color: white;
          border-radius: 8px;
          font-size: 14px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s;
          transform: translate(-50%, -50%);
          z-index: 1000;
          font-family: sans-serif;
          text-align: center;
        }

        .model-instruction.visible {
          opacity: 1;
        }
      `}</style>
      <div id="model-instruction" className="model-instruction">
        Double-tap to resize model
      </div>
      <div id="threejs-canvas" className="fixed w-full h-screen bg-white"></div>
      <div
        className="fixed inset-0 flex justify-start transition-opacity duration-500"
        // style={{
        //   backgroundColor: `rgba(0, 0, 0, ${overlayOpacity * 1})`,
        //   pointerEvents:
        //     showBitSindri ||
        //     showEvents ||
        //     showMembers ||
        //     showAlumni ||
        //     showMerchandise ||
        //     showInduction
        //       ? "auto"
        //       : "none",
        //   opacity:
        //     showBitSindri ||
        //     showEvents ||
        //     showMembers ||
        //     showAlumni ||
        //     showMerchandise ||
        //     showInduction
        //       ? 1
        //       : 0,
        //   zIndex: 11,
        // }}
      >
        {/* {showBitSindri && <BitSindri />}
        {showEvents && <Events />}
        {showMembers && <Members />}
        {showAlumni && <Alumni />}
        {showMerchandise && <Merchandise />} */}

        {/* {showInduction && <ModelViewer />} */}
      </div>
      <div id="three-scene" />
    </>
  );
};

export default ThreeScene;
