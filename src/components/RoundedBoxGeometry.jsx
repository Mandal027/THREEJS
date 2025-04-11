import * as THREE from 'three';

export class RoundedBoxGeometry extends THREE.BufferGeometry {
  constructor(width = 1, height = 1, depth = 1, radius = 0.1, smoothness = 3) {
    super();
    const shape = new THREE.Shape();

    const eps = 0.00001;
    const radius0 = radius - eps;
    shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
    shape.absarc(eps, 1 - radius * 2, eps, Math.PI, Math.PI / 2, true);
    shape.absarc(1 - radius * 2, 1 - radius * 2, eps, Math.PI / 2, 0, true);
    shape.absarc(1 - radius * 2, eps, eps, 0, -Math.PI / 2, true);

    const geometry2d = new THREE.ShapeGeometry(shape);
    geometry2d.translate(-0.5, -0.5, 0);

    const geometry3d = new THREE.ExtrudeGeometry(shape, {
      depth: 1 - radius * 2,
      bevelEnabled: true,
      bevelSegments: smoothness * 2,
      steps: 1,
      bevelSize: radius0,
      bevelThickness: radius,
      curveSegments: smoothness
    });
    geometry3d.center();

    geometry3d.scale(width, height, depth);

    this.copy(new THREE.BufferGeometry().fromGeometry(geometry3d));
  }
}
