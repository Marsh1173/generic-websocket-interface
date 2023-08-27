import { DisplayObject } from "pixi.js";
import { uuid } from "../../../common/Id";
import { Entity } from "../../entitymodel/entity/Entity";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { StaticPoint } from "../../../common/physics/geometry/Point";

export abstract class Renderable<EntityType extends Entity> {
  public readonly id = uuid();
  public readonly display_object: DisplayObject;

  constructor(
    public readonly entity: EntityType,
    protected readonly game_system: LocalGameSystem
  ) {
    this.display_object = this.get_display_object();

    this.set_position();
  }

  protected abstract get_display_object(): DisplayObject;

  public update(elapsed_seconds: number) {
    this.set_position();
  }

  private set_position() {
    let entity_pos!: StaticPoint;
    if (this.entity.game_space_data.type === "StaticCollidableShape") {
      entity_pos = this.entity.game_space_data.origin;
    } else if (
      this.entity.game_space_data.type === "DynamicMovablePoint" ||
      this.entity.game_space_data.type === "DynamicForceablePoint"
    ) {
      entity_pos = this.entity.game_space_data.pos;
    }

    const pixel_coords =
      this.game_system.display.camera.global_units_to_pixel_coords(entity_pos);
    this.display_object.position.set(pixel_coords.x, pixel_coords.y);

    if (
      this.entity.game_space_data.type === "DynamicMovablePoint" ||
      this.entity.game_space_data.type === "DynamicForceablePoint"
    ) {
      this.display_object.zIndex = this.entity.game_space_data.pos.y;
    }

    /**
     * TODOS
     *
     * Have a boolean flag to know if we can skew the object and give the appearance of 3d
     * Check if the object is movable, then update z-pos
     */
  }
}
