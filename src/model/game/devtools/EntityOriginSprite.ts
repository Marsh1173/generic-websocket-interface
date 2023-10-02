import { DisplayObject, Graphics } from "pixi.js";
import { GameEntitySprite } from "../display/gamesprite/GameEntitySprite";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { EntityWithDynamicPoint } from "../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";

export class EntityOriginSprite extends GameEntitySprite<EntityWithDynamicPoint> {
  public readonly display_object: DisplayObject;
  constructor(entity: EntityWithDynamicPoint, game_system: LocalGameSystem) {
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
