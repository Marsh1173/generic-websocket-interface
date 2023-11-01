import { AmbientLight, DirectionalLight, HemisphereLight, Scene, Vector3 } from "three";

export class _3DScene {
  public readonly internal: Scene;
  constructor() {
    this.internal = new Scene();

    const h_light = new HemisphereLight("#ffffff", "#79ebff", 1);
    h_light.position.set(0, 50, 0);
    this.internal.add(h_light);

    const d_light = new DirectionalLight("#ffffff", 2);
    d_light.position.set(-3, 5, 6);
    d_light.target.position.set(0, 0, 0);
    d_light.target.updateMatrixWorld();

    d_light.castShadow = true;
    d_light.shadow.mapSize.width = d_light.shadow.mapSize.height = 512;
    d_light.shadow.camera.left = d_light.shadow.camera.bottom = -20;
    d_light.shadow.camera.right = d_light.shadow.camera.top = 20;

    this.internal.add(d_light);
  }
}

/**
 * AFTERNOON
 * 
    const h_light = new HemisphereLight("#ffffff", "#79ebff", 1);
    h_light.position.set(0, 50, 0);
    this.internal.add(h_light);

    const d_light = new DirectionalLight("#ffffff", 2);
    d_light.position.set(-3, 5, 6);
    d_light.target.position.set(0, 0, 0);
    d_light.target.updateMatrixWorld();
 */
