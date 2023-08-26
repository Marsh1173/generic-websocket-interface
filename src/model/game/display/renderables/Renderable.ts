import { DisplayObject } from "pixi.js";
import { uuid } from "../../../common/Id";
import { Entity } from "../../entitymodel/entity/Entity";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";

export abstract class Renderable<EntityType extends Entity> {
  public readonly id = uuid();
  public readonly display_object: DisplayObject;

  constructor(public readonly entity: EntityType, protected readonly game_system: LocalGameSystem) {
    this.display_object = this.get_display_object();
    this.display_object.cullable = true; // maybe find a better solution eventually

    if (this.entity.game_space_data.type === "StaticCollidableShape") {
      this.display_object.position.set(this.entity.game_space_data.origin.x, this.entity.game_space_data.origin.y);
    } else if (
      this.entity.game_space_data.type === "DynamicMovablePoint" ||
      this.entity.game_space_data.type === "DynamicForceablePoint"
    ) {
      this.display_object.position.set(this.entity.game_space_data.pos.x, this.entity.game_space_data.pos.y);
    }
  }

  protected abstract get_display_object(): DisplayObject;
  public abstract update(elapsed_seconds: number): void;
}
