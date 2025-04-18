// src/components/ThickLine.js

import * as THREE from 'three';

export function createThickLine(scene) {
    // Step 2: Create a thick line using Line2
    const linePoints = [
        new THREE.Vector3(-1.1, 0, 0), // Starting point
        new THREE.Vector3(1.1, 0, 0)  // Ending point
    ];

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x4DEEEA, // Light glowing bulb color
        linewidth: 7,    // Line thickness
        transparent: false, // Make the line transparent
        opacity: 0        // Set the opacity to 0 initially
    });

    const thickLine = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(thickLine);

    return thickLine;
}
