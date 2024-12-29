import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { GUI } from "dat.gui"; // Correct import for dat.GUI

// Function to create a right-angle corner
function createCorner(size, material) {
  const group = new THREE.Group();

  // Horizontal line
  const horizontalGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(size, 0, 0),
  ]);
  const horizontalLine = new THREE.Line(horizontalGeometry, material);
  group.add(horizontalLine);

  // Vertical line
  const verticalGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, -size, 0),
  ]);
  const verticalLine = new THREE.Line(verticalGeometry, material);
  group.add(verticalLine);

  return group;
}

// Function to create and return the corners group
export function createNavTitle(cornerSize = 0.2, lineColor = 0xffffff) {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    linewidth: 2,
  }); // Increase linewidth
  const cornersGroup = new THREE.Group();

  // Define rectangle dimensions
  const rectangleWidth = 1; // Adjust width as needed (decreased width)
  const rectangleHeight = 4; // Adjust height as needed

  // Top-left corner
  const topLeft = createCorner(cornerSize, lineMaterial);
  topLeft.position.set(-rectangleWidth / 2, rectangleHeight / 2, 0); // Position in the rectangle's top-left corner

  // Top-right corner
  const topRight = createCorner(cornerSize, lineMaterial);
  topRight.position.set(rectangleWidth / 2, rectangleHeight / 2, 0); // Position in the rectangle's top-right corner
  topRight.rotation.z = -Math.PI / 2; // Rotate for correct orientation

  // Bottom-right corner
  const bottomRight = createCorner(cornerSize, lineMaterial);
  bottomRight.position.set(rectangleWidth / 2, -rectangleHeight / 2, 0); // Position in the rectangle's bottom-right corner
  bottomRight.rotation.z = Math.PI; // Rotate for correct orientation

  // Bottom-left corner
  const bottomLeft = createCorner(cornerSize, lineMaterial);
  bottomLeft.position.set(-rectangleWidth / 2, -rectangleHeight / 2, 0); // Position in the rectangle's bottom-left corner
  bottomLeft.rotation.z = Math.PI / 2; // Rotate for correct orientation

  // Add all corners to the group
  cornersGroup.add(topLeft, topRight, bottomRight, bottomLeft);

  // Load font and add text
  const loader = new FontLoader();
  loader.load("/fonts/helvetiker_regular.typeface.json", function (font) {
    const textGeometry = new TextGeometry("ABOUT US", {
      font: font,
      size: 0.4,
      height: 0.1,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // Position text in the center of the rectangle
    textMesh.position.set(-rectangleWidth + 0.8, 1.9, 0.9); // Adjust as needed
    textMesh.rotation.set(3, 0, 1.66); // Rotate for correct orientation
    cornersGroup.add(textMesh);

    // GUI configuration for text position and rotation
    const textControls = {
      xPosition: textMesh.position.x,
      yPosition: textMesh.position.y,
      zPosition: textMesh.position.z,
      xRotation: textMesh.rotation.x,
      yRotation: textMesh.rotation.y,
      zRotation: textMesh.rotation.z,
    };

    const gui = new GUI();
    gui
      .add(textControls, "xPosition", -5, 5, 0.1)
      .name("Text X Position")
      .onChange((value) => {
        textMesh.position.x = value;
      });
    gui
      .add(textControls, "yPosition", -5, 5, 0.1)
      .name("Text Y Position")
      .onChange((value) => {
        textMesh.position.y = value;
      });
    gui
      .add(textControls, "zPosition", -5, 5, 0.1)
      .name("Text Z Position")
      .onChange((value) => {
        textMesh.position.z = value;
      });
    gui
      .add(textControls, "xRotation", 0, Math.PI * 2, 0.01)
      .name("Text X Rotation")
      .onChange((value) => {
        textMesh.rotation.x = value;
      });
    gui
      .add(textControls, "yRotation", 0, Math.PI * 2, 0.01)
      .name("Text Y Rotation")
      .onChange((value) => {
        textMesh.rotation.y = value;
      });
    gui
      .add(textControls, "zRotation", 0, Math.PI * 2, 0.01)
      .name("Text Z Rotation")
      .onChange((value) => {
        textMesh.rotation.z = value;
      });
  });

  return cornersGroup;
}
