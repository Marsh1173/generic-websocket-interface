import { AmbientLight, DirectionalLight, Scene, Vector3 } from "three";

export class _3DScene {
  public readonly internal: Scene;
  constructor() {
    this.internal = new Scene();

    // const a_light = new AmbientLight(0x5e89ff); // soft white-blue light
    // this.internal.add(a_light);
    const a_light = new DirectionalLight(0x5e89ff, 1); // white-yellow light
    a_light.target.position.set(-1, 2, -2);
    a_light.target.updateMatrixWorld();
    this.internal.add(a_light);

    const d_light = new DirectionalLight(0xfff8b8, 1); // white-yellow light
    d_light.target.position.set(2, -1, -2);
    d_light.target.updateMatrixWorld();
    this.internal.add(d_light);
  }
}
