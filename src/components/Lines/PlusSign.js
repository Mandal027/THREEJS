// src/components/PlusSign.js

import * as THREE from 'three';

// Function to create a thick '+' sign at each intersection
export function createPlusSign(x, z, size = 0.02, thickness = 0.08) {
    const material = new THREE.MeshBasicMaterial({ color: 0x000001 });

    // Horizontal line
    const horizontalGeometry = new THREE.PlaneGeometry(size, thickness);
    const horizontalLine = new THREE.Mesh(horizontalGeometry, material);
    horizontalLine.position.set(x, 0, z);
    horizontalLine.rotation.x = -Math.PI / 2;

    // Vertical line
    const verticalGeometry = new THREE.PlaneGeometry(thickness, size);
    const verticalLine = new THREE.Mesh(verticalGeometry, material);
    verticalLine.position.set(x, 0, z);
    verticalLine.rotation.x = -Math.PI / 2;

    // Group the '+' sign
    const plusGroup = new THREE.Group();
    plusGroup.add(horizontalLine);
    plusGroup.add(verticalLine);

    return plusGroup;
}


// Function to add '+' signs at each grid intersection
export function addGridPlusSigns(gridGroup, gridSize, gridDivisions) {
    const step = gridSize / gridDivisions; // Distance between grid lines

    for (let i = -gridSize / 2; i <= gridSize / 2; i += step) {
        for (let j = -gridSize / 2; j <= gridSize / 2; j += step) {
            // Add '+' signs at every grid intersection
            const plusSign = createPlusSign(i, j);
            gridGroup.add(plusSign);
        }
    }
}