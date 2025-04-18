import * as THREE from "three";
import { LineManager } from "./LineManager";

export function createZLines(scene, step) {
  const manager = new LineManager(scene);

  // Line 3
  const line3Points = [
    new THREE.Vector3(0, 0.05, step),
    new THREE.Vector3(0, 0.05, step + 5),
  ];
  manager.createLine(line3Points);

  // Extended Line 3 in +X
  const extendedLine3Points = manager.extendLine(
    new THREE.Vector3(0, 0.05, step + 5),
    new THREE.Vector3(1.018, 0.05, 0.03),
    2
  );
  manager.createLine(extendedLine3Points);

  // Add a new line starting from the end point of extendedLine3Points, along +Z direction of 1 unit
  const newLineZPoints = [
    extendedLine3Points[extendedLine3Points.length - 1], // Starting from the end point of extendedLine3Points
    new THREE.Vector3(extendedLine3Points[extendedLine3Points.length - 1].x, 0.05, extendedLine3Points[extendedLine3Points.length - 1].z + 1) // End point (+1 unit along Z-axis)
  ];
  manager.createLine(newLineZPoints);

  // Add a new line starting from the end point of newLineZPoints, along -X direction of 1 unit
  const newLineXPoints = [
    newLineZPoints[newLineZPoints.length - 1], // Starting from the end point of newLineZPoints
    new THREE.Vector3(newLineZPoints[newLineZPoints.length - 1].x - 1, 0.05, newLineZPoints[newLineZPoints.length - 1].z) // End point (-1 unit along X-axis)
  ];
  manager.createLine(newLineXPoints);
}
