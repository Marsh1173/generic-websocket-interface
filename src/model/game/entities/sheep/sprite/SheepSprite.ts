import { DisplayObject, Sprite } from "pixi.js";
import { GameEntitySprite } from "../../../display/gamesprite/GameEntitySprite";
import { Sheep } from "../Sheep";
import { ImageAssets } from "../../../../../client/assets/image/ImageAssets";
import { ResolutionScale } from "../../../display/Resolution";

export class SheepSprite extends GameEntitySprite<Sheep> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-sheep"]);
    const scale = ResolutionScale[this.game_system.display.config.res] * 0.8;
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(scale);

    return sprite;
  }
  public on_destroy(): void {}
}
