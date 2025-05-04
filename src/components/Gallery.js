"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import Lenis from "@studio-freight/lenis";

export default function CylindricalGallery() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const lenisRef = useRef(null);
  const animationFrameRef = useRef(null);
  const galleryGroupRef = useRef(null);
  const blocksRef = useRef([]);
  const scrollRef = useRef(0);

  useEffect(() => {
    // Initialize the scene
    const init = async () => {
      if (!containerRef.current) return;

      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 12;
      camera.position.y = 0;
      cameraRef.current = camera;
      // camera.lookAt(0, 0, 0);

      // Create renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;

      // Clear container and append renderer
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(renderer.domElement);

      // Add light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Create gallery group
      const galleryGroup = new THREE.Group();
      scene.add(galleryGroup);
      galleryGroupRef.current = galleryGroup;

      // Create cylinder
      const radius = 8;
      const height = 30;
      const segments = 30;

      const cylinderGeometry = new THREE.CylinderGeometry(
        radius,
        radius,
        height,
        segments,
        1,
        true
      );

      const cylinderMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
      });

      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      galleryGroup.add(cylinder);

      // Initialize blocks
      await initializeBlocks(galleryGroup, radius, height);

      // Create appropriate page height for scrolling
      const scrollHeight = height * 100; // Adjust this multiplier as needed
      const scrollElement = document.createElement("div");
      scrollElement.style.height = `${scrollHeight}px`;
      scrollElement.style.position = "absolute";
      scrollElement.style.top = "0";
      scrollElement.style.width = "100%";
      scrollElement.style.zIndex = "-1";
      document.body.appendChild(scrollElement);

      // Initialize Lenis smooth scroll
      if (typeof window !== "undefined") {
        lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false,
        });
      }

      // Track scroll position and rotation
      let rotationSpeed = 0;
      let cylinderRotation = 0;
      const baseRotationSpeed = 0.0025;
      const rotationFactor = 0.005; // Controls how much rotation per scroll amount
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      lenisRef.current.on(
        "scroll",
        ({ scroll, limit, velocity, direction, progress }) => {
          scrollRef.current = scroll;
          rotationSpeed = velocity * 0.005;

          // Calculate cylinder rotation based on scroll position
          cylinderRotation = scroll * rotationFactor;

          // For debugging
          // console.log(`Scroll: ${scroll}, Velocity: ${velocity}, Progress: ${progress}`);
        }
      );

      // Animation function
      const animate = (time) => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current)
          return;

        // Update Lenis on each frame
        lenisRef.current.raf(time);

        // Calculate scroll progress for camera position
        const scrollY = scrollRef.current;
        const scrollFraction = Math.min(scrollY / totalScroll, 1);

        // Update camera position based on scroll
        const targetY = -scrollFraction * height * 0.85; // Adjust multiplier as needed
        cameraRef.current.position.y = targetY;

        // Set the cylinder's rotation based directly on scroll position
        galleryGroupRef.current.rotation.y = cylinderRotation;

        // Add a small amount of inertia/momentum based on scroll velocity
        galleryGroupRef.current.rotation.y += rotationSpeed * baseRotationSpeed;
        rotationSpeed *= 0.95; // Dampen rotation momentum

        rendererRef.current.render(sceneRef.current, cameraRef.current);
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      // Start animation
      animationFrameRef.current = requestAnimationFrame(animate);

      // Handle window resize
      const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current) return;

        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);

        // Check if Lenis exists and then resize
        if (lenisRef.current && typeof lenisRef.current.resize === "function") {
          lenisRef.current.resize();
        }
      };

      window.addEventListener("resize", handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleResize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        // Clean up scroll element
        if (scrollElement && scrollElement.parentNode) {
          scrollElement.parentNode.removeChild(scrollElement);
        }
        // Clean up Lenis
        if (lenisRef.current) {
          lenisRef.current.destroy();
        }
        // Dispose of resources
        if (
          rendererRef.current &&
          rendererRef.current.domElement &&
          containerRef.current
        ) {
          containerRef.current.removeChild(rendererRef.current.domElement);
          rendererRef.current.dispose();
        }
      };
    };

    init();
  }, []);

  // Helper function to create curved plane geometry
  function createCurvedPlane(width, height, radius, segments) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const uvs = [];

    const segmentsX = segments * 4;
    const segmentsY = Math.floor(height * 12);
    const theta = width / radius;

    // Generate vertices and UVs
    for (let y = 0; y <= segmentsY; y++) {
      const v = y / segmentsY;

      for (let x = 0; x <= segmentsX; x++) {
        const u = x / segmentsX;
        const angle = theta * (u - 0.5);

        // Position on curved plane
        const posX = radius * Math.sin(angle);
        const posY = height * (v - 0.5);
        const posZ = radius * Math.cos(angle);

        vertices.push(posX, posY, posZ);
        uvs.push(u, v);
      }
    }

    // Generate indices
    for (let y = 0; y < segmentsY; y++) {
      for (let x = 0; x < segmentsX; x++) {
        const a = x + (segmentsX + 1) * y;
        const b = x + (segmentsX + 1) * (y + 1);
        const c = x + 1 + (segmentsX + 1) * (y + 1);
        const d = x + 1 + (segmentsX + 1) * y;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }

  // Random image selection
  function getRandomImage() {
    return Math.floor(Math.random() * 50) + 1;
  }

  // Load texture with promise
  function loadImageTexture(imageNumber) {
    const textureLoader = new THREE.TextureLoader();

    return new Promise((resolve) => {
      // For demo, use placeholder image
      const placeholderUrl = `/file.svg`;

      const texture = textureLoader.load(
        `/globe.svg`, // Replace with `assets/img${imageNumber}.jpg` in production
        (loadedTexture) => {
          loadedTexture.generateMipmaps = true;
          loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
          loadedTexture.magFilter = THREE.LinearFilter;
          if (rendererRef.current) {
            loadedTexture.anisotropy =
              rendererRef.current.capabilities.getMaxAnisotropy();
          }
          resolve(loadedTexture);
        }
      );
    });
  }

  // Create a single block
  async function createBlock(baseY, yOffset, sectionIndex, blockIndex, radius) {
    const blockGeometry = createCurvedPlane(5, 3, radius, 10);

    const imageNumber = getRandomImage();
    const texture = await loadImageTexture(imageNumber);

    const blockMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
      toneMapped: false,
    });

    const block = new THREE.Mesh(blockGeometry, blockMaterial);
    block.position.y = baseY + yOffset;

    const blockContainer = new THREE.Group();
    const blocksPerSection = 4;
    const sectionAngle = (Math.PI * 2) / blocksPerSection;
    const maxRandomAngle = sectionAngle * 0.3;

    const baseAngle = sectionAngle * blockIndex;
    const randomAngleOffset = (Math.random() * 2 - 1) * maxRandomAngle;
    const finalAngle = baseAngle + randomAngleOffset;

    blockContainer.rotation.y = finalAngle;
    blockContainer.add(block);

    return blockContainer;
  }

  // Initialize all blocks
  async function initializeBlocks(galleryGroup, radius, height) {
    const numVerticalSections = 12;
    const blocksPerSection = 4;
    const verticalSpacing = 3.25;
    const blocks = [];
    blocksRef.current = blocks;

    const totalBlockHeight = numVerticalSections * verticalSpacing;
    const heightBuffer = (height - totalBlockHeight) / 2;
    const startY = -height / 2 + heightBuffer + verticalSpacing;

    for (let section = 0; section < numVerticalSections; section++) {
      const baseY = startY + section * verticalSpacing;

      for (let i = 0; i < blocksPerSection; i++) {
        const yOffset = Math.random() * 0.2 - 0.1;
        const blockContainer = await createBlock(
          baseY,
          yOffset,
          section,
          i,
          radius
        );
        blocks.push(blockContainer);
        galleryGroup.add(blockContainer);
      }
    }
  }

  return (
    <div
      className="gallery-container"
      ref={containerRef}
      style={{ width: "100%", height: "100vh", zIndex: 10 }}
    >
      {/* The Three.js canvas will be inserted here */}
    </div>
  );
}
