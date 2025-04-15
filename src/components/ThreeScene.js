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
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { Raycaster } from "three";


const gridSize = 100; // Example value, adjust as needed
const gridDivisions = 100; // Example value, adjust as needed
const step = gridSize / gridDivisions;
const group = new THREE.Group();

const ThreeScene = () => {
  const [showBitSindri, setshowBitSindri] = useState(false);
  const [showMembers, setshowMembers] = useState(false);
  const [showAlumni, setshowAlumni] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [activeContent, setActiveContent] = useState(null);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let camera; // Define camera outside useEffect

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
    // const loader = new THREE.TextureLoader();
    // loader.load("/noisy-background.jpg", function (texture) {
    //   scene.background = texture;
    // });

    scene.background = new THREE.Color(0xffffff);  // Set back


    

    // Group for grid and geometry setup
    const gridBackgroundGroup = new THREE.Group();
    backgroundGridGroup.add(gridBackgroundGroup);
    superGroup.add(gridBackgroundGroup);

    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 18;
    camera = new THREE.OrthographicCamera(
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


    // Add the mousemove event listener inside useEffect
  window.addEventListener("mousemove", (event) => {
    // Convert mouse position to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Perform raycasting
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(group.children, true);

    // Check if any intersected object is a navTitle
    let isHoveringNavTitle = false;
    intersects.forEach((intersect) => {
      if (intersect.object.userData.isNavTitle) {
        isHoveringNavTitle = true;
      }
    });

    // Change cursor based on hover state
    document.body.style.cursor = isHoveringNavTitle ? "pointer" : "default";

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





    //Loading Environment
    

     // Load the SVG
  const gltfLoader = new GLTFLoader()

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
    navBIT.userData.isNavTitle = true; // Mark as a navTitle
    group.add(navBIT);

    // Add navtitle Collab
    const navCollab = createNavCollab(0.2, 0xa44c24);
    navCollab.position.set(5.5, 0, 3.8);
    navCollab.rotation.set(1.6, 3.1, 3.1);
    group.add(navCollab);

    // Add navtitle Induction
    const navInduction = createNavInduction(0.2, 0xa44c24);
    navInduction.position.set(3.5, 0, -7);
    navInduction.rotation.set(4.7, 0, 0);
    group.add(navInduction);


    //add ambient light to the gltf model
    const ambientLightModel = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLightModel);

    //add point light 
    

    // Start animation and add navEvents after the animation completes with a delay
    startAnimation(cube, camera, scene, cubeSize, targetScale, () => {
      // Add a 1-second delay before showing the nav titles
      setTimeout(() => {
        scene.add(group);
        group.add(navEvents);
      },500); // 1000ms = 1 second delay
    });


    controls.enable = false
    // Handle resize
    // handleResize(camera, renderer, frustumSize, aspect);

    // Mouse tracking
const mouse = { x: 0, y: 0 };
let mouseControlEnabled = false;  // Add flag to control mouse movement

    window.addEventListener('mousemove', (event) => {
      if (!mouseControlEnabled) return;  // Only process mouse movement after animation
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    startAnimation(cube, camera, scene, cubeSize, targetScale, () => {
      // Add a delay before showing the nav titles
      setTimeout(() => {
        scene.add(group);
        group.add(navEvents);
        mouseControlEnabled = true;  // Enable mouse control after animation
      }, 500);
    });



    

    function animate() {
      requestAnimationFrame(animate);

      if (mouseControlEnabled) {  // Only apply mouse movement when enabled
        superGroup.rotation.y += (mouse.x*0.1 - superGroup.rotation.y) * 0.1;
        superGroup.rotation.x += (mouse.y*0.1 - superGroup.rotation.x) * 0.1;

        group.rotation.y += (mouse.x*0.1 - group.rotation.y) * 0.1;
        group.rotation.x += (mouse.y*0.1 - group.rotation.x) * 0.1;

      }


      
      

      controls.update();
      renderer.render(scene, camera);
    }

   

    



    animate();
   

     // Setup event listener for navBIT
  const cleanupNavBITEventListener = setupNavBITEventListener(scene, camera, navBIT, group, setOverlayOpacity, setshowBitSindri);
    // Cleanup event listener when the component unmounts
    return () => {
      // window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("click", onMouseClick);
      // cleanupNavBITEventListener();
      window.removeEventListener("mousemove", () => {});
      cleanupNavMembersEventListener();
      cleanupNavAlumniEventListener();
    };
  }, []);

  // useEffect(() => {
  //   const raycaster = new THREE.Raycaster();
  //   const mouse = new THREE.Vector2();
  
  //   // Add click event listener
  //   window.addEventListener("click", (event) => {
  //     // Convert mouse position to normalized device coordinates
  //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  //     // Perform raycasting
  //     raycaster.setFromCamera(mouse, camera);
  //     const intersects = raycaster.intersectObjects(scene.children, true);
  
  //     // Reset all navTitle text colors to black
  //     scene.traverse((child) => {
  //       if (child.userData.isNavTitleText) {
  //         child.material.color.set(0x000000); // Reset to black
  //       }
  //     });
  
  //     // Set clicked navTitle text color to orange
  //     intersects.forEach((intersect) => {
  //       if (intersect.object.userData.isNavTitleText) {
  //         intersect.object.material.color.set(0xffa500); // Set to orange
  //       }
  //     });
  //   });
  
  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener("click", () => {});
  //   };
  // }, []);

  return (
    <>
      <div id="threejs-canvas" className="relative w-full h-screen bg-white">
        
      </div>
      <div 
        className="fixed inset-0 flex justify-start transition-opacity duration-500"
        style={{ 
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity * 1})`,
          pointerEvents: showBitSindri || showMembers || showAlumni ? 'auto' : 'none',
          opacity: showBitSindri || showMembers || showAlumni ? 1 : 0,
          zIndex: 11,
        }}
      >
        {showBitSindri && <BitSindri />}
        {showMembers && <Members />}
        {showAlumni && <Alumni />}
      </div>
      <div id="three-scene" />
    
    </>
  );
};

export default ThreeScene;