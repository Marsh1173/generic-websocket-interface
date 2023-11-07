import { GameScene } from "./gamescene/GameScene";
import { GameCamera } from "./gamecamera/GameCamera";
import { DisplayConfig } from "./DisplayConfig";
import { _3D } from "./3d/3D";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";

export class GameDisplay {
  public readonly scene: GameScene;
  public readonly camera: GameCamera;

  public readonly _3d: _3D;

  constructor(public readonly config: DisplayConfig, game_system: LocalGameSystem) {
    this.scene = new GameScene(game_system.view_app, this);
    this.camera = new GameCamera(this.config);

    this._3d = new _3D({ res: this.config.res, camera_center: this.camera.camera_center }, game_system);
  }
}
