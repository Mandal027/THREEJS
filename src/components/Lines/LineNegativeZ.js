import * as THREE from "three";
import { LineManager } from "./LineManager";

export function createNegativeZLines(scene, step) {
  const manager = new LineManager(scene);

  // Line 4
  const line4Points = [
    new THREE.Vector3(0, 0.05, -step),
    new THREE.Vector3(0, 0.05, -step - 9.3),
  ];
  manager.createLine(line4Points);

  // Extended Line 4 in -X direction by 0.4 unit start point is end point of line4Points
  const extendedLine4Points = manager.extendLine(
    new THREE.Vector3(0, 0.05, -step - 9.3),
    new THREE.Vector3(-0.4, 0, 0),
    0.8
  );
  manager.createLine(extendedLine4Points);
 
  


  // Line 4ONE
  const line4_Points = [
    new THREE.Vector3(0.2, 0.05, -step),
    new THREE.Vector3(0.2, 0.05, -step - 5),
  ];
  manager.createLine(line4_Points);

  // Extended above Line 2.8 units in +X direction start point is end point of line4_Points
  const extendedLine4_Points = manager.extendLine(
    new THREE.Vector3(0.2, 0.05, -step - 5),
    new THREE.Vector3(2.8, 0, 0),
    1
  );
  manager.createLine(extendedLine4_Points);
 

  // Extended above Line 0.3 units in -z direction start point is end point of extendedline4_Points
  const extendedLine4_Points_Z = manager.extendLine(
    new THREE.Vector3(3, 0.05, -step - 5),
    new THREE.Vector3(0, 0, -1),
    1
  );
  manager.createLine(extendedLine4_Points_Z);
  
  // Extended above Line 0.2 units in +X direction start point is end point of extendedline4_Points_Z
  const extendedLine4_Points_X = manager.extendLine(
    new THREE.Vector3(3, 0.05, -step - 6),
    new THREE.Vector3(0.2, 0, 0),
    1
  );
  manager.createLine(extendedLine4_Points_X);


 
 

  // Add a new line starting from the end point of newLineNegativeZPoints, along -X direction of 3 units


  // Extend this line along -Z direction by 1 unit
  

}
