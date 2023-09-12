import { DisplayObject, Sprite } from "pixi.js";
import { GameEntitySprite } from "../../../display/gamesprite/GameEntitySprite";
import { Arrow } from "../Arrow";
import { ImageAssets } from "../../../../../client/assets/image/ImageAssets";
import { ResolutionScale } from "../../../display/Resolution";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";

export class ArrowSprite extends GameEntitySprite<Arrow> {
  public readonly display_object: DisplayObject;
  constructor(entity: Arrow, game_system: LocalGameSystem) {
    super(entity, game_system);
    this.display_object = this.get_display_object();
  }

  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-arrow"]);
    const scale = ResolutionScale[this.game_system.display.config.res] * 0.6;
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(scale);
    sprite.rotation = this.entity.rotation;
    return sprite;
  }
  public on_destroy(): void {}
}
