import { DisplayObject, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Tree } from "./Tree";
import { ImageAssets } from "../../../../client/assets/image/ImageAssets";

export class TreeRenderable extends Renderable<Tree> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-tree"]);
    sprite.anchor.set(0.5, 0.9);

    sprite.zIndex = this.entity.game_space_data.origin.y;

    return sprite;
  }

  // Temporary wave-y logic
  private total_elapsed_time: number = Math.random() * 25;
  public update(elapsed_time: number): void {
    this.total_elapsed_time += elapsed_time / 25;
    this.display_object.skew.x = Math.sin(this.total_elapsed_time) / 40;
  }
}
