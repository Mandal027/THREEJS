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

// Function to create and return the navTitle "ABOUT US"
export function createNavTitle(cornerSize = 0.2, lineColor = 0xffffff) {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    linewidth: 2,
  });
  const cornersGroup = new THREE.Group();

  // Define rectangle dimensions
  const rectangleWidth = 1;
  const rectangleHeight = 4;

  // Create corners
  const topLeft = createCorner(cornerSize, lineMaterial);
  topLeft.position.set(-rectangleWidth / 2, rectangleHeight / 2, 0);

  const topRight = createCorner(cornerSize, lineMaterial);
  topRight.position.set(rectangleWidth / 2, rectangleHeight / 2, 0);
  topRight.rotation.z = -Math.PI / 2;

  const bottomRight = createCorner(cornerSize, lineMaterial);
  bottomRight.position.set(rectangleWidth / 2, -rectangleHeight / 2, 0);
  bottomRight.rotation.z = Math.PI;

  const bottomLeft = createCorner(cornerSize, lineMaterial);
  bottomLeft.position.set(-rectangleWidth / 2, -rectangleHeight / 2, 0);
  bottomLeft.rotation.z = Math.PI / 2;

  // Add corners to the group
  cornersGroup.add(topLeft, topRight, bottomRight, bottomLeft);

  // Load font and add text
  const loader = new FontLoader();
  loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("ABOUT US", {
      font: font,
      size: 0.4,
      height: 0.1,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color to black
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textGeometry.center(); // Center the text geometry

    // Position the text
    textMesh.position.set(-0.5, 0.6, 0.9);
    textMesh.rotation.set(3, 0, 1.66);
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

    // const gui = new GUI();
    // gui.add(textControls, "xPosition", -5, 5, 0.1).name("Text X Position").onChange((value) => {
    //   textMesh.position.x = value;
    // });
    // gui.add(textControls, "yPosition", -5, 5, 0.1).name("Text Y Position").onChange((value) => {
    //   textMesh.position.y = value;
    // });
    // gui.add(textControls, "zPosition", -5, 5, 0.1).name("Text Z Position").onChange((value) => {
    //   textMesh.position.z = value;
    // });
    // gui.add(textControls, "xRotation", 0, Math.PI * 2, 0.01).name("Text X Rotation").onChange((value) => {
    //   textMesh.rotation.x = value;
    // });
    // gui.add(textControls, "yRotation", 0, Math.PI * 2, 0.01).name("Text Y Rotation").onChange((value) => {
    //   textMesh.rotation.y = value;
    // });
    // gui.add(textControls, "zRotation", 0, Math.PI * 2, 0.01).name("Text Z Rotation").onChange((value) => {
    //   textMesh.rotation.z = value;
    // });
  });

  return cornersGroup;
}

// Function to create and return the navTitle "EVENTS"
export function createNavEvents(cornerSize = 0.2, lineColor = 0xffffff) {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    linewidth: 1,
  });
  const cornersGroup = new THREE.Group();

  // Define rectangle dimensions
  const rectangleWidth = 1;
  const rectangleHeight = 3;

  // Create corners
  const topLeft = createCorner(cornerSize, lineMaterial);
  topLeft.position.set(-rectangleWidth / 2, rectangleHeight / 2, 0);

  const topRight = createCorner(cornerSize, lineMaterial);
  topRight.position.set(rectangleWidth / 2, rectangleHeight / 2, 0);
  topRight.rotation.z = -Math.PI / 2;

  const bottomRight = createCorner(cornerSize, lineMaterial);
  bottomRight.position.set(rectangleWidth / 2, -rectangleHeight / 2, 0);
  bottomRight.rotation.z = Math.PI;

  const bottomLeft = createCorner(cornerSize, lineMaterial);
  bottomLeft.position.set(-rectangleWidth / 2, -rectangleHeight / 2, 0);
  bottomLeft.rotation.z = Math.PI / 2;

  // Add corners to the group
  cornersGroup.add(topLeft, topRight, bottomRight, bottomLeft);

  // Load font and add text
  const loader = new FontLoader();
  loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color to black

    // Generate each letter as a separate mesh
    const text = "EVENTS";
    const textGroup = new THREE.Group(); // Group to hold all letters
    let xOffset = -0.4 * text.length; // Decrease spacing between letters

    for (let i = 0; i < text.length; i++) {
      const charGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.4,
        height: 0.1,
      });
      const charMesh = new THREE.Mesh(charGeometry, textMaterial);

      charGeometry.center(); // Center each letter

      charMesh.position.set(xOffset, 1.5, 0.5);
      textGroup.add(charMesh);

      xOffset += 0.4; // Decrease spacing between letters
    }

    cornersGroup.add(textGroup);

    // Set final rotation values for the text group
    textGroup.rotation.set(3.27, 0, 1.51); // Adjust these values as needed
    textGroup.position.set(1.55, -1.3, 0.2); // Adjust these values as needed

    // GUI configuration for the whole text group's position and rotation
    const textGroupControls = {
      xPosition: textGroup.position.x,
      yPosition: textGroup.position.y,
      zPosition: textGroup.position.z,
      xRotation: textGroup.rotation.x,
      yRotation: textGroup.rotation.y,
      zRotation: textGroup.rotation.z,
    };

    // const gui = new GUI();
    // gui.add(textGroupControls, "xPosition", -5, 5, 0.1).name("Text Group X Position").onChange((value) => {
    //   textGroup.position.x = value;
    // });
    // gui.add(textGroupControls, "yPosition", -5, 5, 0.1).name("Text Group Y Position").onChange((value) => {
    //   textGroup.position.y = value;
    // });
    // gui.add(textGroupControls, "zPosition", -5, 5, 0.1).name("Text Group Z Position").onChange((value) => {
    //   textGroup.position.z = value;
    // });
    // gui.add(textGroupControls, "xRotation", 0, Math.PI * 2, 0.01).name("Text Group X Rotation").onChange((value) => {
    //   textGroup.rotation.x = value;
    // });
    // gui.add(textGroupControls, "yRotation", 0, Math.PI * 2, 0.01).name("Text Group Y Rotation").onChange((value) => {
    //   textGroup.rotation.y = value;
    // });
    // gui.add(textGroupControls, "zRotation", 0, Math.PI * 2, 0.01).name("Text Group Z Rotation").onChange((value) => {
    //   textGroup.rotation.z = value;
    // });
  });

  return cornersGroup;
}


// Function to create and return the navTitle "ALUMNI"
export function createNavAlumni(cornerSize = 0.2, lineColor = 0xffffff) {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    linewidth: 2,
  });
  const cornersGroup = new THREE.Group();

  // Define rectangle dimensions
  const rectangleWidth = 1;
  const rectangleHeight = 4;

  // Create corners
  const topLeft = createCorner(cornerSize, lineMaterial);
  topLeft.position.set(-rectangleWidth / 2, rectangleHeight / 2, 0);

  const topRight = createCorner(cornerSize, lineMaterial);
  topRight.position.set(rectangleWidth / 2, rectangleHeight / 2, 0);
  topRight.rotation.z = -Math.PI / 2;

  const bottomRight = createCorner(cornerSize, lineMaterial);
  bottomRight.position.set(rectangleWidth / 2, -rectangleHeight / 2, 0);
  bottomRight.rotation.z = Math.PI;

  const bottomLeft = createCorner(cornerSize, lineMaterial);
  bottomLeft.position.set(-rectangleWidth / 2, -rectangleHeight / 2, 0);
  bottomLeft.rotation.z = Math.PI / 2;

  // Add corners to the group
  cornersGroup.add(topLeft, topRight, bottomRight, bottomLeft);

  // Load font and add text
  const loader = new FontLoader();
  loader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Generate each letter as a separate mesh
    const text = "MEMBERS";
    const textGroup = new THREE.Group(); // Group to hold all letters
    let xOffset = -0.7 * text.length; // Decrease spacing between letters

    for (let i = 0; i < text.length; i++) {
      const charGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.4,
        height: 0.1,
      });
      const charMesh = new THREE.Mesh(charGeometry, textMaterial);

      charGeometry.center(); // Center each letter

      charMesh.position.set(xOffset, 1.5, 0.5);
      textGroup.add(charMesh);

      xOffset += 0.4; // Decrease spacing between letters
    }

    cornersGroup.add(textGroup);

    // Set final rotation values for the text group
    textGroup.rotation.set(3.27, 0, 1.48); // Adjust these values as needed
    textGroup.position.set(0.6, 8, 0.1); // Adjust these values as needed

    // GUI configuration for the whole text group's position and rotation
    const textGroupControls = {
      xPosition: textGroup.position.x,
      yPosition: textGroup.position.y,
      zPosition: textGroup.position.z,
      xRotation: textGroup.rotation.x,
      yRotation: textGroup.rotation.y,
      zRotation: textGroup.rotation.z,
    };

    const gui = new GUI();
    gui.add(textGroupControls, "xPosition", -5, 5, 0.1).name("Text Group X Position").onChange((value) => {
      textGroup.position.x = value;
    });
    gui.add(textGroupControls, "yPosition", -5, 5, 0.1).name("Text Group Y Position").onChange((value) => {
      textGroup.position.y = value;
    });
    gui.add(textGroupControls, "zPosition", -5, 5, 0.1).name("Text Group Z Position").onChange((value) => {
      textGroup.position.z = value;
    });
    gui.add(textGroupControls, "xRotation", 0, Math.PI * 2, 0.01).name("Text Group X Rotation").onChange((value) => {
      textGroup.rotation.x = value;
    });
    gui.add(textGroupControls, "yRotation", 0, Math.PI * 2, 0.01).name("Text Group Y Rotation").onChange((value) => {
      textGroup.rotation.y = value;
    });
    gui.add(textGroupControls, "zRotation", 0, Math.PI * 2, 0.01).name("Text Group Z Rotation").onChange((value) => {
      textGroup.rotation.z = value;
    });
  });

  return cornersGroup;
}
