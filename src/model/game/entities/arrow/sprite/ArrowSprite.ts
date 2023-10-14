import { DisplayObject, Sprite } from "pixi.js";
import { GameEntitySprite } from "../../../display/gamesprite/GameEntitySprite";
import { Arrow } from "../Arrow";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { GTTextures } from "../../../assets/textures/Textures";

export class ArrowSprite extends GameEntitySprite<Arrow> {
  public readonly display_object: DisplayObject;
  constructor(entity: Arrow, game_system: LocalGameSystem) {
    super(entity, game_system);
    this.display_object = this.get_display_object();
  }

  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(GTTextures.get("entity-arrow"));
    sprite.anchor.set(0.5, 0.9);
    sprite.rotation = this.entity.rotation;
    return sprite;
  }
  public on_destroy(): void {}
}
