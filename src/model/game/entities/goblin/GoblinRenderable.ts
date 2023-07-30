import { DisplayObject, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Goblin } from "./Goblin";
import { ImageAssets } from "../../../../client/assets/image/ImageAssets";

export class GoblinRenderable extends Renderable<Goblin> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-goblin"]);
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(0.3);

    sprite.zIndex = this.entity.game_space_data.pos.y;

    return sprite;
  }

  public update(elapsed_seconds: number): void {
    this.display_object.zIndex = this.entity.game_space_data.pos.y;
  }
}
