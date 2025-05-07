import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// import { GUI } from "dat.gui"; // Correct import for dat.GUI

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
export function createNavTitle(cornerSize = 0.2, lineColor = 0xa44c24) {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    linewidth: 5,
  });
  const cornersGroup = new THREE.Group();

  // Define rectangle dimensions
  const rectangleWidth = 1;
  const rectangleHeight = 3.5;

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


  //add a mouse hover effect that on moving mouse inside the 4 corners, the area confined by 4 corners turns 0xa44c24 and regains its original when hover out 
  

  // Add corners to the group
  cornersGroup.add(topLeft, topRight, bottomRight, bottomLeft);

  // Load font and add text
  const loader = new FontLoader();
  loader.load("/fonts/Decorya DEMO_Regular.json", (font) => {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color to black

    // Generate each letter as a separate mesh
    const text = "ABOUT US";
    const textGroup = new THREE.Group(); // Group to hold all letters
    let xOffset = -0.4 * text.length; // Adjust spacing between letters

    for (let i = 0; i < text.length; i++) {
      const charGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.5,
        depth: 0.06,
      });
      const charMesh = new THREE.Mesh(charGeometry, textMaterial);

      charGeometry.center(); // Center each letter

      charMesh.position.set(xOffset, 2.7, 1.1);
      charMesh.userData.isNavTitleText = true; // Mark as navTitle text
      textGroup.add(charMesh);

      xOffset += 0.35; // Adjust spacing between letters
    }

    cornersGroup.add(textGroup);

    // Set final rotation values for the text group
    textGroup.position.set(-2.7, -2.1, -1); // Adjust these values as needed
    textGroup.rotation.set(0, 0, 4.71); // Adjust these values as needed
  });

  return cornersGroup;
}

// Function to create and return the navTitle "EVENTS"
export function createNavEvents(cornerSize = 0.2, lineColor = 0xa44c24) {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    linewidth: 5,
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
  loader.load("/fonts/Decorya DEMO_Regular.json", (font) => {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color to black

    // Generate each letter as a separate mesh
    const text = "EVENTS";
    const textGroup = new THREE.Group(); // Group to hold all letters
    let xOffset = -0.4 * text.length; // Decrease spacing between letters

    for (let i = 0; i < text.length; i++) {
      const charGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.5,
        depth: 0.06, // Decrease thickness
      });
      const charMesh = new THREE.Mesh(charGeometry, textMaterial);

      charGeometry.center(); // Center each letter

      charMesh.position.set(xOffset, 1.5, 0.5);
      charMesh.userData.isNavTitleText = true; // Mark as navTitle text
      textGroup.add(charMesh);

      xOffset += 0.36; // Decrease spacing between letters
    }

    cornersGroup.add(textGroup);

    // Set final rotation values for the text group
    textGroup.rotation.set(0, 0, 1.57); // Adjust these values as needed
    textGroup.position.set(1.5, 1.6, -0.5); // Adjust these values as needed
  });

  return cornersGroup;
}

// Function to create and return the navTitle "MEMBERS"
export function createNavMembers(cornerSize = 0.2, lineColor = 0xffffff) {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    linewidth: 2,
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
  // cornersGroup.position.set(-3, 0, 0); // Adjust these values as needed

  // Load font and add text
  const loader = new FontLoader();
  loader.load("/fonts/Decorya DEMO_Regular.json", (font) => {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color to black

    // Generate each letter as a separate mesh
    const text = "MEMBERS";
    const textGroup = new THREE.Group(); // Group to hold all letters
    let xOffset = -0.7 * text.length; // Decrease spacing between letters

    for (let i = 0; i < text.length; i++) {
      const charGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.5,
        depth: 0.06,
      });
      const charMesh = new THREE.Mesh(charGeometry, textMaterial);

      charGeometry.center(); // Center each letter

      charMesh.position.set(xOffset, 1.5, 0.5);
      charMesh.userData.isNavTitleText = true; // Mark as navTitle text
      textGroup.add(charMesh);

      xOffset += 0.36; // Decrease spacing between letters
    }

    cornersGroup.add(textGroup);

    // Set final rotation values for the text group
    textGroup.rotation.set(0, 0, 4.71); // Adjust these values as needed
    textGroup.position.set(-1.5, -3.8, -0.4); // Adjust these values as needed
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
  // cornersGroup.position.set(-3, 0, 0); // Adjust these values as needed

  // Load font and add text
  const loader = new FontLoader();
  loader.load("/fonts/Decorya DEMO_Regular.json", (font) => {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color to black

    // Generate each letter as a separate mesh
    const text = "ALUMNI";
    const textGroup = new THREE.Group(); // Group to hold all letters
    let xOffset = -0.7 * text.length; // Decrease spacing between letters

    for (let i = 0; i < text.length; i++) {
      const charGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.5,
        depth: 0.06,
      });
      const charMesh = new THREE.Mesh(charGeometry, textMaterial);

      charGeometry.center(); // Center each letter

      charMesh.position.set(xOffset, 1.5, 0.5);
      charMesh.userData.isNavTitleText = true; // Mark as navTitle text
      textGroup.add(charMesh);

      xOffset += 0.36; // Decrease spacing between letters
    }

    cornersGroup.add(textGroup);

    // Set final rotation values for the text group
    textGroup.position.set(-1.6, -3.4, -0.5); // Adjust these values as needed
    textGroup.rotation.set(0, 0, 4.71); // Adjust these values as needed
  });

  return cornersGroup;
}

// Function to create and return the navTitle "MERCHANDISE"
export function createNavMerchandise(cornerSize = 0.2, lineColor = 0x000000) {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    linewidth: 2,
  });
  const cornersGroup = new THREE.Group();

  // Define rectangle dimensions
  const rectangleWidth = 1;
  const rectangleHeight = 4.7;

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
  // cornersGroup.position.set(-3, 0, 0); // Adjust these values as needed

  // Load font and add text
  const loader = new FontLoader();
  loader.load("/fonts/Decorya DEMO_Regular.json", (font) => {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color to black

    // Generate each letter as a separate mesh
    const text = "MERCHANDISE";
    const textGroup = new THREE.Group(); // Group to hold all letters
    let xOffset = -0.7 * text.length; // Decrease spacing between letters

    for (let i = 0; i < text.length; i++) {
      const charGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.5,
        depth: 0.06,
      });
      const charMesh = new THREE.Mesh(charGeometry, textMaterial);

      charGeometry.center(); // Center each letter

      charMesh.position.set(xOffset, 1.5, 0.5);
      charMesh.userData.isNavTitleText = true; // Mark as navTitle text
      textGroup.add(charMesh);

      xOffset += 0.36; // Decrease spacing between letters
    }

    cornersGroup.add(textGroup);

    // Set final rotation values for the text group
    textGroup.position.set(1.5, -6, 0.6); // Adjust these values as needed
    textGroup.rotation.set(3.14, 0, 1.57); // Adjust these values as needed
  });

  return cornersGroup;
}

// Function to create and return the navTitle "BIT SINDRI"
export function createNavBIT(cornerSize = 0.2, lineColor = 0xffffff) {
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
  // cornersGroup.position.set(-3, 0, 0); // Adjust these values as needed

  // Load font and add text
  const loader = new FontLoader();
  loader.load("/fonts/Decorya DEMO_Regular.json", (font) => {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color to black

    // Generate each letter as a separate mesh
    const text = "BIT SINDRI";
    const textGroup = new THREE.Group(); // Group to hold all letters
    let xOffset = -0.7 * text.length; // Decrease spacing between letters



  

  

    for (let i = 0; i < text.length; i++) {
      const charGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.5,
        depth: 0.06,
      });
      const charMesh = new THREE.Mesh(charGeometry, textMaterial);

      charGeometry.center(); // Center each letter

      charMesh.position.set(xOffset, 1.5, 0.5);
      charMesh.userData.isNavTitleText = true; // Mark as navTitle text
      textGroup.add(charMesh);

      xOffset += 0.36; // Decrease spacing between letters
    }

    cornersGroup.add(textGroup);

    // Set final rotation values for the text group
    textGroup.rotation.set(0, 3.14, 4.71); // Adjust these values as needed
    textGroup.position.set(1.6, -5.3, 0.4); // Adjust these values as needed
  });

  return cornersGroup;
}

// Function to create and return the navTitle "COLLAB"
export function createNavCollab(cornerSize = 0.2, lineColor = 0xffffff) {
  const lineMaterial = new THREE.LineBasicMaterial({
    color: lineColor,
    linewidth: 2,
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
  // cornersGroup.position.set(0, 0, 0); // Adjust these values as needed
  // cornersGroup.position.set(15.5, -0.2, 0.4); // Adjust these values as needed
  // cornersGroup.rotation.set(0, 3.14, 4.71); // Adjust these values as needed

  // Load font and add text
  const loader = new FontLoader();
  loader.load("/fonts/Decorya DEMO_Regular.json", (font) => {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color to black

    // Generate each letter as a separate mesh
    const text = "GALLERY";
    const textGroup = new THREE.Group(); // Group to hold all letters
    let xOffset = -0.7 * text.length; // Decrease spacing between letters

    for (let i = 0; i < text.length; i++) {
      const charGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.5,
        depth: 0.06, // Increase thickness to make it bolder
      });
      const charMesh = new THREE.Mesh(charGeometry, textMaterial);

      charGeometry.center(); // Center each letter

      charMesh.position.set(xOffset, 1.5, 0.5);
      charMesh.userData.isNavTitleText = true; // Mark as navTitle text
      textGroup.add(charMesh);

      xOffset += 0.36; // Decrease spacing between letters
    }

    // Set final rotation values for the text group
    textGroup.rotation.set(0, 0, 1.57); // Adjust these values as needed
    textGroup.position.set(1.5, 3.9, -0.4); // Adjust these values as needed
    cornersGroup.add(textGroup);
  });

  return cornersGroup;
}

// Function to create and return the navTitle "INDUCTION"
export function createNavInduction(cornerSize = 0.2, lineColor = 0xffffff) {
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
  // cornersGroup.position.set(-3, 0, 0); // Adjust these values as needed

  // Load font and add text
  const loader = new FontLoader();
  loader.load("/fonts/Decorya DEMO_Regular.json", (font) => {
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Change color to black

    // Generate each letter as a separate mesh
    const text = "INDUCTION";
    const textGroup = new THREE.Group(); // Group to hold all letters
    let xOffset = -0.7 * text.length; // Decrease spacing between letters

    for (let i = 0; i < text.length; i++) {
      const charGeometry = new TextGeometry(text[i], {
        font: font,
        size: 0.5,
        depth: 0.06,
      });
      const charMesh = new THREE.Mesh(charGeometry, textMaterial);

      charGeometry.center(); // Center each letter

      charMesh.position.set(xOffset, 1.5, 0.5);
      charMesh.userData.isNavTitleText = true; // Mark as navTitle text
      textGroup.add(charMesh);

      xOffset += 0.36; // Decrease spacing between letters
    }

    cornersGroup.add(textGroup);

    // Set final rotation values for the text group
    textGroup.position.set(1.5, 4.7, -0.5); // Adjust these values as needed
    textGroup.rotation.set(0, 0, 1.57); // Adjust these values as needed
  });

  return cornersGroup;
}