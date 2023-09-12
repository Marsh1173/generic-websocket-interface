import { Application, Container } from "pixi.js";
import { Id } from "../../../common/Id";
import { GameSpriteHandler } from "../gamesprite/GameSpriteHandler";

type CanvasLayer = "ground_space" | "world_space" | "visual_data";

export class GameCanvas {
  private readonly sprite_handler_map: Map<Id, GameSpriteHandler> = new Map();

  private readonly layers: Record<CanvasLayer, Container> = {
    ground_space: new Container(),
    world_space: new Container(),
    visual_data: new Container(),
  };

  constructor(view_app: Application<HTMLCanvasElement>) {
    // TODO find better-placed solution
    view_app.stage.interactiveChildren = false;

    for (const layer of Object.values(this.layers)) {
      layer.sortableChildren = true;
      view_app.stage.addChild(layer);
    }
  }

  public insert_sprite_handler(sprite_handler: GameSpriteHandler) {
    this.sprite_handler_map.set(sprite_handler.id, sprite_handler);

    sprite_handler.visual_data_sprites.forEach((sprite) =>
      this.layers.visual_data.addChild(sprite.display_object)
    );
    sprite_handler.world_space_sprites.forEach((sprite) =>
      this.layers.world_space.addChild(sprite.display_object)
    );
    sprite_handler.ground_space_sprites.forEach((sprite) =>
      this.layers.ground_space.addChild(sprite.display_object)
    );
  }

  public remove_sprite_handler(id: Id) {
    const sprite_handler = this.sprite_handler_map.get(id);
    if (sprite_handler) {
      this.sprite_handler_map.delete(id);

      sprite_handler.visual_data_sprites.forEach((sprite) =>
        this.layers.visual_data.removeChild(sprite.display_object)
      );
      sprite_handler.world_space_sprites.forEach((sprite) =>
        this.layers.world_space.removeChild(sprite.display_object)
      );
      sprite_handler.ground_space_sprites.forEach((sprite) =>
        this.layers.ground_space.removeChild(sprite.display_object)
      );
    }
  }

  public update_all_renderables(elapsed_seconds: number) {
    this.sprite_handler_map.forEach((sprite_handler) => {
      sprite_handler.visual_data_sprites.forEach((sprite) =>
        sprite.update(elapsed_seconds)
      );
      sprite_handler.world_space_sprites.forEach((sprite) =>
        sprite.update(elapsed_seconds)
      );
      sprite_handler.ground_space_sprites.forEach((sprite) =>
        sprite.update(elapsed_seconds)
      );
    });
  }
}
