import * as THREE from "three";
import { LineManager } from "./LineManager";

export function createNegativeXLines(scene, step) {
  const manager = new LineManager(scene, { antialias: true });

  // Line 1
  const line1Points = [
    new THREE.Vector3(-step, 0.05, 0),
    new THREE.Vector3(-step - 7, 0.05, 0),
  ];
  manager.createLine(line1Points);

  // Extended Line 1 in +Z
  const extendedLine1ZPoints = manager.extendLine(
    new THREE.Vector3(-step, 0.05, 0.2),
    new THREE.Vector3(-step - 4, 0.05, 0.01),
    1
  );
  manager.createLine(extendedLine1ZPoints);

  // Extend the line by 5 units along +Z axis
  const newLineZPoints = manager.extendLine(
    new THREE.Vector3(-step - 5, 0.05, 0.2), // Starting point
    new THREE.Vector3(-step, 0.05, 400), // End point (+5 units along Z-axis)
    0.0121 // Length of the line
  );
  manager.createLine(newLineZPoints);

  // Extend the line by 1 unit along -X axis and keep the Y value at 0.05
  const newLineXPoints = [
    newLineZPoints[newLineZPoints.length - 1], // Starting from the end point of newLineZPoints
    new THREE.Vector3(newLineZPoints[newLineZPoints.length - 1].x - 1, 0.05, newLineZPoints[newLineZPoints.length - 1].z) // End point (+1 unit along X-axis)
  ];
  manager.createLine(newLineXPoints);


  //Extended newLineXPoints Line in +Z direction by 1 unit start point is end point of newLineXPoints
  const newLineXPoints_Z = manager.extendLine(
    new THREE.Vector3(newLineXPoints[1].x, 0.05, newLineXPoints[1].z ),
    new THREE.Vector3(0, 0, 1),
    1
  );
  manager.createLine(newLineXPoints_Z);

  // Extended Line 1 in -Z
  const extendedLine1_ZPoints = manager.extendLine(
    new THREE.Vector3(-step, 0.05, -0.2),
    new THREE.Vector3(-step - 4, 0.05, -0.01),
    1
  );
  manager.createLine(extendedLine1_ZPoints);

  // Extend the line by 5 units along -Z axis
  const newLine_ZPoints = manager.extendLine(
    new THREE.Vector3(-step - 5, 0.05, -0.2), // Starting point
    new THREE.Vector3(-step, 0.05, -400), // End point (+5 units along Z-axis)
    0.0121 // Length of the line
  );
  manager.createLine(newLine_ZPoints);

  // Extend this line along -X direction by 1 unit
  const newLine_XPoints = [
    newLine_ZPoints[newLine_ZPoints.length - 1], // Starting from the end point of newLineZPoints
    new THREE.Vector3(newLine_ZPoints[newLine_ZPoints.length - 1].x - 1, 0.05, newLine_ZPoints[newLine_ZPoints.length - 1].z + 0.1) // End point (+1 unit along X-axis)
  ];
  manager.createLine(newLine_XPoints);

  // Extended newLine_XPoints Line in -Z direction by 1 unit
  const newLine_XPoints_Z = manager.extendLine(
    new THREE.Vector3(newLine_XPoints[1].x, 0.05, newLine_XPoints[1].z ),
    new THREE.Vector3(0, 0, -1),
    1
  );
  manager.createLine(newLine_XPoints_Z);
  
}
