import { Application, TilingSprite } from "pixi.js";
import { GameCanvas } from "./gamecanvas/GameCanvas";
import { GameCamera } from "./gamecamera/GameCamera";
import { ImageAssets } from "../../../client/assets/image/ImageAssets";
import { DisplayConfig } from "./DisplayConfig";

export class GameDisplay {
  public readonly canvas: GameCanvas;
  public readonly camera: GameCamera;

  constructor(public readonly config: DisplayConfig, view_app: Application<HTMLCanvasElement>) {
    this.canvas = new GameCanvas(view_app);
    this.camera = new GameCamera(this.config);
  }
}
