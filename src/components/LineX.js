import * as THREE from "three";
import { LineManager } from "./LineManager";

export function createXLines(scene, step) {
  const manager = new LineManager(scene, { antialias: true });

  // Line 1
  const line1Points = [
    new THREE.Vector3(step, 0.05, 0),
    new THREE.Vector3(step + 7, 0.05, 0),
  ];
  manager.createLine(line1Points);

  // Extended Line 1 in +Z
  const extendedLine1ZPoints = manager.extendLine(
    new THREE.Vector3(step, 0.05, 0.2),
    new THREE.Vector3(step + 4, 0.05, 0.01),
    1
  );
  manager.createLine(extendedLine1ZPoints);

  // Add a new line of unit 2 along +Z axis
  const newLineZPoints = manager.extendLine(
    new THREE.Vector3(step + 5, 0.05, 0.2), // Starting point
    new THREE.Vector3(step, 0.05, 400), // End point (+2 units along Z-axis)
    0.0046 // Length of the line
  );
  manager.createLine(newLineZPoints);

  // Add a new line starting from the end point of newLineZPoints, along -X direction of 1 unit
  const newLineXPoints = [
    newLineZPoints[newLineZPoints.length - 1], // Starting from the end point of newLineZPoints
    new THREE.Vector3(newLineZPoints[newLineZPoints.length - 1].x - 1, 0.05, newLineZPoints[newLineZPoints.length - 1].z) // End point (-1 unit along X-axis)
  ];
  manager.createLine(newLineXPoints);


    // design a label box or nameplate having v shape design at 4 corners of a rectagle shape label 
    // design a label box or nameplate having v shape design at 4 corners of a rectagle shape label
    // design a label box or nameplate having v shape design at 4 corners of a rectagle shape label after newLineXPoints
   


   
}
