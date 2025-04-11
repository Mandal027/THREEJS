// ThreeJSPaintbrush.js
'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function ThreeJSPaintbrush() {
  const containerRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [currentColor, setCurrentColor] = useState('#4285F4');
  const [brushSize, setBrushSize] = useState(5);
  
  // Refs to store Three.js objects
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2());
  const raycasterRef = useRef(new THREE.Raycaster());
  const lastPointRef = useRef(null);
  const brushStrokesRef = useRef([]);
  
  // Initialize Three.js scene
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 50);
    cameraRef.current = camera;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;
    
    // Create a canvas to paint on
    const canvasGeometry = new THREE.PlaneGeometry(100, 60);
    const canvasMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    const canvas = new THREE.Mesh(canvasGeometry, canvasMaterial);
    scene.add(canvas);
    
    // Add subtle grid helper
    const gridHelper = new THREE.GridHelper(100, 20, 0x888888, 0xcccccc);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);
    
    // Add ambient light and directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of all brushstrokes
      brushStrokesRef.current.forEach(stroke => {
        if (stroke.geometry) stroke.geometry.dispose();
        if (stroke.material) stroke.material.dispose();
      });
      
      // Dispose of scene objects
      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);
  
  // Handle mouse/touch events for painting
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    // Create a brush stroke between two points
    const createBrushStroke = (startPoint, endPoint, color, size) => {
      if (!startPoint || !endPoint) return;
      
      // Create a curved path for the brush stroke
      const curve = new THREE.CatmullRomCurve3([startPoint, endPoint]);
      curve.curveType = 'centripetal';
      
      // Create tube geometry along the curve
      const tubeGeometry = new THREE.TubeGeometry(
        curve,
        1,  // Path segments
        size / 10,  // Tube radius
        8,  // Radial segments
        false  // Closed
      );
      
      // Create material with the selected color
      const tubeMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.3,
        metalness: 0.2
      });
      
      // Create mesh and add to scene
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      sceneRef.current.add(tube);
      
      // Store for later cleanup
      brushStrokesRef.current.push(tube);
      
      return tube;
    };
    
    // Get 3D point from mouse position
    const get3DPoint = (event) => {
      // Normalize mouse position
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Cast ray from camera
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      
      // Get intersection with objects
      const intersects = raycasterRef.current.intersectObjects(sceneRef.current.children);
      
      if (intersects.length > 0) {
        return intersects[0].point.clone();
      }
      
      return null;
    };
    
    // Mouse/touch handlers
    const handlePointerDown = (event) => {
      // Only start painting with left mouse button or touch
      if (event.button !== undefined && event.button !== 0) return;
      
      // Disable orbit controls temporarily while painting
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }
      
      const point = get3DPoint(event);
      if (point) {
        setIsPainting(true);
        lastPointRef.current = point;
      }
    };
    
    const handlePointerMove = (event) => {
      if (!isPainting) return;
      
      const newPoint = get3DPoint(event);
      if (newPoint && lastPointRef.current) {
        // Only create stroke if moved more than minimum distance
        const minDistance = 0.1;
        if (newPoint.distanceTo(lastPointRef.current) < minDistance) return;
        
        createBrushStroke(lastPointRef.current, newPoint, currentColor, brushSize);
        lastPointRef.current = newPoint;
      }
    };
    
    const handlePointerUp = () => {
      setIsPainting(false);
      lastPointRef.current = null;
      
      // Re-enable orbit controls
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    };
    
    // Add event listeners
    const canvas = rendererRef.current.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);
    
    // Cleanup
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerUp);
    };
  }, [isPainting, currentColor, brushSize]);
  
  // Clear canvas function
  const clearCanvas = () => {
    if (!sceneRef.current) return;
    
    // Remove all brush strokes
    brushStrokesRef.current.forEach(stroke => {
      sceneRef.current.remove(stroke);
      if (stroke.geometry) stroke.geometry.dispose();
      if (stroke.material) stroke.material.dispose();
    });
    
    brushStrokesRef.current = [];
  };
  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      
      {/* Controls UI */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="color-picker">Brush Color: </label>
          <input
            id="color-picker"
            type="color"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
            style={{ verticalAlign: 'middle' }}
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="size-slider">Brush Size: {brushSize}</label>
          <br />
          <input
            id="size-slider"
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
        
        <button
          onClick={clearCanvas}
          style={{
            width: '100%',
            padding: '5px',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Clear Canvas
        </button>
      </div>
      
      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
      }}>
        <p style={{ margin: '0 0 5px' }}><strong>Instructions:</strong></p>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          <li>Left click/touch to paint</li>
          <li>Right click + drag to rotate view</li>
          <li>Scroll to zoom in/out</li>
          <li>Middle click + drag to pan</li>
        </ul>
      </div>
    </div>
  );
}