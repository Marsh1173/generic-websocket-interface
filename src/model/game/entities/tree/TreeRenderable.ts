import { DisplayObject, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Tree } from "./Tree";
import { GTTexture, ImageAssets } from "../../../../client/assets/image/ImageAssets";

export class TreeRenderable extends Renderable<Tree> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures[this.get_texture()]);
    sprite.anchor.set(0.5, 0.95);
    sprite.scale.set(0.5);

    sprite.zIndex = this.entity.game_space_data.origin.y;

    return sprite;
  }

  // Temporary wave-y logic
  private total_elapsed_seconds: number = Math.random() * 25;
  private readonly wave_speed_variation: number = 0.1;
  private wave_speed: number = 1 - this.wave_speed_variation / 2 + Math.random() * this.wave_speed_variation;
  public update(elapsed_seconds: number): void {
    this.total_elapsed_seconds += (elapsed_seconds * this.wave_speed) / 25;
    this.display_object.skew.x = Math.sin(this.total_elapsed_seconds) / 80;
  }

  private get_texture(): GTTexture {
    switch (this.entity.variation) {
      case 1:
        return "entity-tree-1";
      case 2:
        return "entity-tree-2";
      case 3:
        return "entity-tree-3";
    }
  }
}
