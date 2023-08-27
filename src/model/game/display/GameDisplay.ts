import { Application } from "pixi.js";
import { GameCanvas } from "./gamecanvas/GameCanvas";
import { GameCamera } from "./gamecamera/GameCamera";
import { Resolution } from "./Resolution";

export class GameDisplay {
  public readonly canvas: GameCanvas;
  public readonly camera: GameCamera;

  constructor(
    private readonly resolution: Resolution,
    view_app: Application<HTMLCanvasElement>
  ) {
    this.canvas = new GameCanvas(view_app);
    this.camera = new GameCamera(resolution);
  }
}
