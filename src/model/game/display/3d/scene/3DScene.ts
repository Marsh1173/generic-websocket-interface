import { Scene } from "three";
import { _3DLighting } from "./3DLighting";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";

export class _3DScene {
  public readonly internal: Scene;
  protected readonly lighting: _3DLighting;

  constructor(game_system: LocalGameSystem) {
    this.internal = new Scene();
    this.lighting = new _3DLighting(game_system, this.internal);
  }

  public update(elapsed_seconds: number) {
    this.lighting.update(elapsed_seconds);
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
