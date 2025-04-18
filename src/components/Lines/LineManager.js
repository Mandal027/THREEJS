import * as THREE from "three";

export class LineManager {
  constructor(scene) {
    this.scene = scene;
    this.lineMaterial = new THREE.LineBasicMaterial({
      color:0x000000,
      linewidth: 5,
      transparent: true,
      opacity: 0,
    });
  }

  // Create a line with given points
  createLine(points) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, this.lineMaterial);
    this.scene.add(line);
    return line;
  }

  // Extend a line by a given direction vector and length
  extendLine(startPoint, directionVector, length) {
    const endPoint = new THREE.Vector3()
      .copy(directionVector)
      .multiplyScalar(length)
      .add(startPoint);
    return [startPoint, endPoint];
  }
}
