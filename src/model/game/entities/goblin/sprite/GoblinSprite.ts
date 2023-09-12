import { DisplayObject, Sprite } from "pixi.js";
import { GameEntitySprite } from "../../../display/gamesprite/GameEntitySprite";
import { Goblin } from "../Goblin";
import { ImageAssets } from "../../../../../client/assets/image/ImageAssets";
import { ResolutionScale } from "../../../display/Resolution";

export class GoblinSprite extends GameEntitySprite<Goblin> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-goblin"]);
    const scale = ResolutionScale[this.game_system.display.config.res] * 0.3;
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(scale);

    return sprite;
  }
  public on_destroy(): void {}
}
