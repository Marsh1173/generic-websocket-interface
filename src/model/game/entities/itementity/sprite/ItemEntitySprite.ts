import { DisplayObject, Sprite } from "pixi.js";
import { GameEntitySprite } from "../../../display/gamesprite/GameEntitySprite";
import { ItemEntity } from "../ItemEntity";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { GTTextures } from "../../../assets/textures/Textures";

export class ItemEntitySprite extends GameEntitySprite<ItemEntity> {
  public readonly display_object: DisplayObject;
  constructor(entity: ItemEntity, game_system: LocalGameSystem) {
    super(entity, game_system);
    this.display_object = this.get_display_object();
  }

  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(GTTextures.get("entity-plank"));
    sprite.anchor.set(0.5, 0.9);

    return sprite;
  }
  public on_destroy(): void {}
}
