import { Application } from "pixi.js";
import { GameScene } from "./gamescene/GameScene";
import { GameCamera } from "./gamecamera/GameCamera";
import { DisplayConfig } from "./DisplayConfig";
import { _3D } from "./3d/3D";

export class GameDisplay {
  public readonly scene: GameScene;
  public readonly camera: GameCamera;

  public readonly _3d: _3D;

  constructor(public readonly config: DisplayConfig, view_app: Application<HTMLCanvasElement>) {
    this.scene = new GameScene(view_app, this);
    this.camera = new GameCamera(this.config);

    this._3d = new _3D({ res: this.config.res, camera_center: this.camera.camera_center });
  }
}
