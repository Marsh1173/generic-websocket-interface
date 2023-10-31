import { AmbientLight, DirectionalLight, Scene, Vector3 } from "three";

export class _3DScene {
  public readonly internal: Scene;
  constructor() {
    this.internal = new Scene();

    const a_light = new AmbientLight(0xffffff, 0.1);
    this.internal.add(a_light);

    const s_light = new DirectionalLight(0x6536ff, 0.3); // blue-purple light
    s_light.target.position.set(3, 0, 1);
    s_light.target.updateMatrixWorld();
    this.internal.add(s_light);

    const d_light = new DirectionalLight(0xffca38, 2); // white-yellow-orange light
    d_light.target.position.set(-3, 0.5, 0);
    d_light.target.updateMatrixWorld();
    this.internal.add(d_light);
  }
}
