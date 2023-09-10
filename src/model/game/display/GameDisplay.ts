import { Application, TilingSprite } from "pixi.js";
import { GameCanvas } from "./gamecanvas/GameCanvas";
import { GameCamera } from "./gamecamera/GameCamera";
import { ImageAssets } from "../../../client/assets/image/ImageAssets";
import { DisplayConfig } from "./DisplayConfig";

export class GameDisplay {
  public readonly canvas: GameCanvas;
  public readonly camera: GameCamera;

  constructor(public readonly config: DisplayConfig, private readonly view_app: Application<HTMLCanvasElement>) {
    this.canvas = new GameCanvas(view_app);
    this.camera = new GameCamera(this.config);

    this.set_tiling_background();
  }
  public update() {
    const pixel_coords = this.camera.global_units_to_pixel_coords({
      x: -this.camera.camera_center.x * 1.5,
      y: -this.camera.camera_center.y * 1.5,
    });
    this.tiling_sprite.tilePosition.set(pixel_coords.x, pixel_coords.y);
  }

  private tiling_sprite!: TilingSprite;
  private set_tiling_background() {
    // MVP - please delete at some point
    const scale = 0.4;
    this.tiling_sprite = new TilingSprite(ImageAssets.textures["ground-grass"]);
    this.tiling_sprite.scale.set(scale);
    this.tiling_sprite.width = this.view_app.screen.width / scale;
    this.tiling_sprite.height = this.view_app.screen.height / scale;

    this.view_app.stage.addChild(this.tiling_sprite);
  }
}
