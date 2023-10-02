import { DisplayObject, Graphics } from "pixi.js";
import { GameEntitySprite } from "../display/gamesprite/GameEntitySprite";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { HasDynamicPoint } from "../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { Entity } from "../entitymodel/entity/Entity";

export class EntityOriginSprite extends GameEntitySprite<
  Entity & HasDynamicPoint
> {
  public readonly display_object: DisplayObject;
  constructor(entity: Entity & HasDynamicPoint, game_system: LocalGameSystem) {
    super(entity, game_system);

    this.display_object = this.get_display_object();
  }

  protected get_display_object(): DisplayObject {
    const circle: Graphics = new Graphics();
    circle.beginFill(0xff0000);
    circle.drawCircle(0, 0, 5);
    return circle;
  }

  public on_destroy(): void {}
}
