import { DisplayObject } from "pixi.js";
import { StaticPoint } from "../../../common/physics/geometry/Point";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { GameSprite } from "./GameSprite";
import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";

export abstract class GameEntitySprite<
  EntityType extends BaseEntity
> extends GameSprite {
  public readonly display_object: DisplayObject;

  constructor(
    protected readonly entity: EntityType,
    game_system: LocalGameSystem
  ) {
    super(game_system);
    this.display_object = this.get_display_object();

    this.set_position();

    if (this.entity.game_space_data.type === "StaticCollidableShape") {
      this.display_object.zIndex = this.entity.game_space_data.shape.origin.y;
    }
  }

  protected abstract get_display_object(): DisplayObject;

  public update(elapsed_seconds: number) {
    this.set_position();
  }

  private set_position() {
    let entity_pos!: StaticPoint;
    if (this.entity.game_space_data.type === "StaticCollidableShape") {
      entity_pos = this.entity.game_space_data.shape.origin;
    } else if (this.entity.game_space_data.type === "DynamicPoint") {
      entity_pos = this.entity.game_space_data.pos;
    }

    const pixel_coords =
      this.game_system.display.camera.global_units_to_pixel_coords(entity_pos);
    this.display_object.position.set(pixel_coords.x, pixel_coords.y);

    if (this.entity.game_space_data.type === "DynamicPoint") {
      this.display_object.zIndex = this.entity.game_space_data.pos.y;
    }

    /**
     * TODOS
     *
     * Have a boolean flag to know if we can skew the object and give the appearance of 3d
     */
  }
}
