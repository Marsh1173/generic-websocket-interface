import { StaticPoint } from "../../../common/physics/geometry/Point";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { GameSprite } from "./GameSprite";
import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";

export abstract class GameEntitySprite<
  EntityType extends BaseEntity
> extends GameSprite {
  constructor(
    protected readonly entity: EntityType,
    game_system: LocalGameSystem
  ) {
    super(game_system);
  }

  public update(elapsed_seconds: number) {
    this.set_position();
  }

  private has_set_z_index: boolean = false;
  private set_position() {
    let entity_pos!: StaticPoint;
    if (this.entity.game_space_data.type === "StaticCollidableShape") {
      entity_pos = this.entity.game_space_data.shape.origin;
      if (!this.has_set_z_index) {
        this.display_object.zIndex = this.entity.game_space_data.shape.origin.y;
        this.has_set_z_index = true;
      }
    } else if (this.entity.game_space_data.type === "DynamicPoint") {
      entity_pos = this.entity.game_space_data.pos;
      this.display_object.zIndex = this.entity.game_space_data.pos.y;
    }

    const pixel_coords =
      this.game_system.display.camera.global_units_to_pixel_coords(entity_pos);
    this.display_object.position.set(pixel_coords.x, pixel_coords.y);

    /**
     * TODOS
     *
     * Have a boolean flag to know if we can skew the object and give the appearance of 3d
     */
  }
}
