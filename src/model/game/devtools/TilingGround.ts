import { Application, TilingSprite } from "pixi.js";
import { GameSprite } from "../display/gamesprite/GameSprite";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { ImageAssets } from "../../../client/assets/image/ImageAssets";
import { GameSpriteHandler } from "../display/gamesprite/GameSpriteHandler";
import { uuid } from "../../common/Id";

export function ShowTilingGround(game_system: LocalGameSystem, view_app: Application<HTMLCanvasElement>) {
  game_system.display.canvas.insert_sprite_handler(new TilingGroundSpriteHandler(game_system, view_app));
}

class TilingGroundSpriteHandler extends GameSpriteHandler {
  public readonly ground_space_sprites: GameSprite[];

  constructor(game_system: LocalGameSystem, view_app: Application<HTMLCanvasElement>) {
    super(uuid(), game_system);

    this.ground_space_sprites = [new TilingGround(this.game_system, view_app)];
  }
}

class TilingGround extends GameSprite {
  declare readonly display_object: TilingSprite;
  constructor(game_system: LocalGameSystem, view_app: Application<HTMLCanvasElement>) {
    super(game_system);

    const scale = 0.4;
    const tiling_sprite = new TilingSprite(ImageAssets.textures["ground-grass"]);
    tiling_sprite.scale.set(scale);
    tiling_sprite.width = view_app.screen.width / scale;
    tiling_sprite.height = view_app.screen.height / scale;

    this.display_object = tiling_sprite;
  }

  public update(elapsed_seconds: number): void {
    const pixel_coords = this.game_system.display.camera.global_units_to_pixel_coords({
      x: -this.game_system.display.camera.camera_center.x * 1.5,
      y: -this.game_system.display.camera.camera_center.y * 1.5,
    });
    this.display_object.tilePosition.set(pixel_coords.x, pixel_coords.y);
  }

  public on_destroy(): void {}
}
