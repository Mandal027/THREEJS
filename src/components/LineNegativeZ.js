import * as THREE from "three";
import { LineManager } from "./LineManager";

export function createNegativeZLines(scene, step) {
  const manager = new LineManager(scene);

  // Line 4
  const line4Points = [
    new THREE.Vector3(0, 0.05, -step),
    new THREE.Vector3(0, 0.05, -step - 5),
  ];
  manager.createLine(line4Points);

  // Extended Line 4 in +X
  const extendedLine4Points = manager.extendLine(
    new THREE.Vector3(0, 0.05, -step - 5),
    new THREE.Vector3(1, 0.05, 0),
    2
  );
  manager.createLine(extendedLine4Points);

  // Add a new line starting from the end point of extendedLine4Points, along -Z direction of 1 unit
  const newLineNegativeZPoints = [
    extendedLine4Points[extendedLine4Points.length - 1], // Starting from the end point of extendedLine4Points
    new THREE.Vector3(extendedLine4Points[extendedLine4Points.length - 1].x, 0.05, extendedLine4Points[extendedLine4Points.length - 1].z - 1) // End point (-1 unit along Z-axis)
  ];
  manager.createLine(newLineNegativeZPoints);

  // Add a new line starting from the end point of newLineNegativeZPoints, along -X direction of 3 units
  const newLineNegativeXPoints = [
    newLineNegativeZPoints[newLineNegativeZPoints.length - 1], // Starting from the end point of newLineNegativeZPoints
    new THREE.Vector3(newLineNegativeZPoints[newLineNegativeZPoints.length - 1].x - 2, 0.05, newLineNegativeZPoints[newLineNegativeZPoints.length - 1].z) // End point (-3 units along X-axis)
  ];
  manager.createLine(newLineNegativeXPoints);

  // Extend this line along -Z direction by 1 unit
  const newLineNegativeZPoints1 = [
    newLineNegativeXPoints[newLineNegativeXPoints.length - 1], // Starting from the end point of newLineNegativeXPoints
    new THREE.Vector3(newLineNegativeXPoints[newLineNegativeXPoints.length - 1].x, 0.05, newLineNegativeXPoints[newLineNegativeXPoints.length - 1].z - 1) // End point (-1 unit along Z-axis)
  ];
  manager.createLine(newLineNegativeZPoints1);

}
