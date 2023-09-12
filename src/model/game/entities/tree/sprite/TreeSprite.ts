import { DisplayObject, Sprite } from "pixi.js";
import { GameEntitySprite } from "../../../display/gamesprite/GameEntitySprite";
import { Tree } from "../Tree";
import {
  GTTexture,
  ImageAssets,
} from "../../../../../client/assets/image/ImageAssets";
import { ResolutionScale } from "../../../display/Resolution";

export class TreeSprite extends GameEntitySprite<Tree> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures[this.get_texture()]);
    const scale = ResolutionScale[this.game_system.display.config.res] * 0.8;
    sprite.anchor.set(0.5, 0.95);
    sprite.scale.set(scale);

    return sprite;
  }

  // Temporary wave-y logic
  private total_elapsed_seconds: number = Math.random();
  private readonly wave_speed_variation: number = 0.1;
  private wave_speed: number =
    1 -
    this.wave_speed_variation / 2 +
    Math.random() * this.wave_speed_variation;
  public update(elapsed_seconds: number): void {
    super.update(elapsed_seconds);
    this.total_elapsed_seconds += elapsed_seconds * this.wave_speed;
    this.display_object.skew.x = Math.sin(this.total_elapsed_seconds * 2) / 80;
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

  public on_destroy(): void {}
}
