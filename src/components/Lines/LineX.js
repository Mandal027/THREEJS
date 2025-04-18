import * as THREE from "three";
import { LineManager } from "./LineManager";

function jitterPoint(p, intensity = 100) {
  return new THREE.Vector3(
    p.x + (Math.random() - 0.5) * intensity,
    p.y + (Math.random() - 0.5) * intensity,
    p.z + (Math.random() - 0.5) * intensity
  );
}

function createVisibleDoodleLine(manager, points, strokes = 5, intensity = 0.05) {
  for (let i = 0; i < strokes; i++) {
    const jittered = points.map(p => jitterPoint(p, intensity));
    manager.createLine(jittered, {
      color: 0x111111,
      linewidth: 1,
      transparent: true,
      opacity: 0.6
    });
  }
}

export function createXLines(scene, step) {
  const manager = new LineManager(scene, { antialias: true });

  // Line 1
  createVisibleDoodleLine(manager, [
    new THREE.Vector3(step, 0.09, 0),
    new THREE.Vector3(step + 7, 0.09, 0),
  ]);

  // Extended Line 1 in +Z
  const extendedLine1ZPoints = manager.extendLine(
    new THREE.Vector3(step, 0.05, 0.2),
    new THREE.Vector3(step + 4, 0.05, 0.01),
    1
  );
  createVisibleDoodleLine(manager, extendedLine1ZPoints);

  // Line along +Z axis
  const newLineZPoints = manager.extendLine(
    new THREE.Vector3(step + 5, 0.05, 0.2),
    new THREE.Vector3(step, 0.05, 400),
    0.0046
  );
  createVisibleDoodleLine(manager, newLineZPoints);

  // Line along -X direction
  const newLineXPoints = [
    newLineZPoints[newLineZPoints.length - 1],
    new THREE.Vector3(
      newLineZPoints[newLineZPoints.length - 1].x - 0.6,
      0.05,
      newLineZPoints[newLineZPoints.length - 1].z
    )
  ];
  createVisibleDoodleLine(manager, newLineXPoints);

  // Extended line along +Z
  const extendedLineXPoints = manager.extendLine(
    newLineXPoints[newLineXPoints.length - 1],
    new THREE.Vector3(0, 0.05, 0.2),
    0.4
  );
  createVisibleDoodleLine(manager, extendedLineXPoints);
}
