// import { Application, TilingSprite } from "pixi.js";
// import { SceneObject } from "../display/sceneobject/SceneObject";
// import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
// import { SceneObjectGroup } from "../display/sceneobject/SceneObjectGroup";
// import { uuid } from "../../common/Id";
// import { GTTextures } from "../assets/textures/Textures";

// export function ShowTilingGround(game_system: LocalGameSystem, view_app: Application<HTMLCanvasElement>) {
//   game_system.display.canvas.insert_sprite_handler(new TilingGroundSpriteHandler(game_system, view_app));
// }

// class TilingGroundSpriteHandler extends SceneObjectGroup {
//   public readonly ground_space_sprites: SceneObject[];

//   constructor(game_system: LocalGameSystem, view_app: Application<HTMLCanvasElement>) {
//     super(uuid(), game_system);

//     this.ground_space_sprites = [new TilingGround(this.game_system, view_app)];
//   }
// }

// class TilingGround extends SceneObject {
//   declare readonly display_object: TilingSprite;
//   constructor(game_system: LocalGameSystem, view_app: Application<HTMLCanvasElement>) {
//     super(game_system);

//     const tiling_sprite = new TilingSprite(GTTextures.get("ground-grass"));
//     tiling_sprite.width = view_app.screen.width;
//     tiling_sprite.height = view_app.screen.height;

//     this.display_object = tiling_sprite;
//   }

//   public update(elapsed_seconds: number): void {
//     const pixel_coords = this.game_system.display.camera.global_units_to_pixel_coords({
//       x: 0,
//       y: 0,
//     });
//     this.display_object.tilePosition.set(pixel_coords.x, pixel_coords.y);
//   }

//   public on_destroy(): void {}
// }
