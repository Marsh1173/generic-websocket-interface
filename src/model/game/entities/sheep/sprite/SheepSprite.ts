import { DisplayObject, Sprite } from "pixi.js";
import { GameEntitySprite } from "../../../display/gamesprite/GameEntitySprite";
import { Sheep } from "../Sheep";
import { ImageAssets } from "../../../../../client/assets/image/ImageAssets";
import { ResolutionScale } from "../../../display/Resolution";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";

export class SheepSprite extends GameEntitySprite<Sheep> {
  public readonly display_object: DisplayObject;
  constructor(entity: Sheep, game_system: LocalGameSystem) {
    super(entity, game_system);
    this.display_object = this.get_display_object();
  }

  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-sheep"]);
    const scale = ResolutionScale[this.game_system.display.config.res] * 0.8;
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(scale);

    return sprite;
  }
  public on_destroy(): void {}
}
