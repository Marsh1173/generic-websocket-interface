import { DisplayObject, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Arrow } from "./Arrow";
import { ImageAssets } from "../../../../client/assets/image/ImageAssets";

export class ArrowRenderable extends Renderable<Arrow> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-goblin"]);
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(0.3);

    return sprite;
  }

  public update(elapsed_seconds: number): void {
    this.display_object.zIndex = this.entity.game_space_data.pos.y;

    this.display_object.position.set(
      this.entity.game_space_data.pos.x,
      this.entity.game_space_data.pos.y
    );
  }
}
