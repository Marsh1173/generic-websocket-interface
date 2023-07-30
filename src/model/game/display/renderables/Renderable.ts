import { Application, DisplayObject } from "pixi.js";
import { Id, uuid } from "../../../utils/Id";
import { Entity } from "../../entitymodel/entity/Entity";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";

export abstract class Renderable<EntityType extends Entity> {
  public readonly id = uuid();
  public readonly display_object: DisplayObject;

  constructor(
    public readonly entity: EntityType,
    protected readonly game_system: LocalGameSystem
  ) {
    this.display_object = this.get_display_object();

    if (this.entity.game_space_data.type === "GameSpaceStaticCollidableShape") {
      this.display_object.position.set(
        this.entity.game_space_data.origin.x,
        this.entity.game_space_data.origin.y
      );
    } else if (this.entity.game_space_data.type === "GameSpaceDynamicPoint") {
      this.display_object.position.set(
        this.entity.game_space_data.pos.x,
        this.entity.game_space_data.pos.y
      );
    }
  }

  protected abstract get_display_object(): DisplayObject;
  public abstract update(elapsed_seconds: number): void;
}
