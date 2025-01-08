// SecondCube.js
import * as THREE from 'three';
import { GUI } from 'dat.gui';

class SecondCube {
  constructor(scene) {
    // Default Size Values
    this.defaultWidth = 2;
    this.defaultHeight = 2;
    this.defaultLength = 2;

    // Cube Size
    // this.secondCubeSize = 1.5;

    // Cube Positions (Define positions for 8 cubes)
    this.cubePositions = [
      { x: -0.59, y: 0.01, z: 7.4 }, // Slightly raise the cubes to avoid z-fighting
      { x: 3.8, y: 0.01, z: -8.1 },
      { x: -10.4, y: 0.01, z: -1 },
      { x: -9.2, y: 0.01, z: -8.1 },
      { x: -8.1, y: 0.01, z: 6.9 },
      { x: 3, y: 0.01, z: 2.5 },
      { x: -3.2, y: 0.01, z: -9.8 },
      { x: 8.9, y: 0.01, z: -2 },
    ];

    // Create geometry and material once
    this.secondCubeGeometry = new THREE.BoxGeometry(
      this.defaultWidth,
      this.defaultHeight,
      this.defaultLength
    );
    this.secondCubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0,
    });



    // Create cubes and add to scene
    this.cubes = [];
    this.gui = new GUI();
    // Assuming you have a reference to your GUI instance  
this.gui.domElement.style.display = 'none';

    this.cubePositions.forEach((position, index) => {
      const cube = new THREE.Mesh(this.secondCubeGeometry, this.secondCubeMaterial);
      cube.position.set(position.x, position.y, position.z);
      scene.add(cube);
      this.cubes.push(cube);

      // Add GUI folder for each cube
      const cubeFolder = this.gui.addFolder(`Cube ${index + 1}`);
      cubeFolder.add(cube.position, 'x', -10, 10).name('Position X');
      cubeFolder.add(cube.position, 'y', -10, 10).name('Position Y');
      cubeFolder.add(cube.position, 'z', -10, 10).name('Position Z');
      cubeFolder.add(cube.scale, 'x', 0.1, 5).name('Width').setValue(this.defaultWidth);
      cubeFolder.add(cube.scale, 'y', 0.1, 5).name('Height').setValue(this.defaultHeight);
      cubeFolder.add(cube.scale, 'z', 0.1, 5).name('Length').setValue(this.defaultLength);
      cubeFolder.open();
    });
  }
}

export default SecondCube;
