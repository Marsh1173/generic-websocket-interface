import { AmbientLight, DirectionalLight, Scene } from "three";

export class _3DScene {
  public readonly internal: Scene;
  constructor() {
    this.internal = new Scene();

    const a_light = new AmbientLight(0x404040); // soft white light
    this.internal.add(a_light);

    const d_light = new DirectionalLight(0xffffff, 0.5);
    // d_light.rotation.x = -0.5;
    // d_light.rotation.y = -0.5;
    this.internal.add(d_light);
  }
}
