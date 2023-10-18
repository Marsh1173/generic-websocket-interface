import { GTMath } from "../../../common/math/basic/GTMath";
import { StaticPoint } from "../../../common/math/geometry/Point";
import { StaticSegment } from "../../../common/math/geometry/Segment";
import { Vector } from "../../../common/math/geometry/Vector";
import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";
import { BaseEntityData } from "../../entitymodel/entity/EntityData";
import {
  GameSpaceStaticPoint,
  HasStaticPoint,
  StaticPointData,
} from "../../entitymodel/gamespacedata/staticpoint/StaticPoint";
import { GameSystem } from "../../gamesystem/GameSystem";
import { ItemData } from "../../items/Item";

export interface ItemEntityData extends BaseEntityData {
  type: "ItemEntityData";
  game_space_data: StaticPointData;
  item_type: ItemData;
}

export class ItemEntity extends BaseEntity implements HasStaticPoint {
  public readonly type = "ItemEntity";
  public readonly game_space_data: GameSpaceStaticPoint;

  constructor(data: ItemEntityData, protected readonly game_system: GameSystem) {
    super(data);

    this.game_space_data = new GameSpaceStaticPoint(this, data.game_space_data);

    console.log("Making item entity of type " + data.item_type.type);
  }

  /**
   * @param maybe_angle angle in radians. If none is provided, a random angle will be generated.
   */
  public static find_flung_item_destination(
    origin: StaticPoint,
    game_system: GameSystem,
    maybe_angle?: number
  ): StaticPoint {
    const angle = maybe_angle ?? Math.random() * 2 * Math.PI;
    const throw_vector = GTMath.VectorFromAngle(angle);
    const original_destination = Vector.add(origin, throw_vector);

    const line_segment: StaticSegment = {
      p1: origin,
      p2: original_destination,
    };

    const collision = game_system.entities.find.static_collidable_shapes.by_raycast_line(line_segment);

    if (collision) {
      return Vector.add(origin, GTMath.ScaleVector(throw_vector, collision.v_progress));
    } else {
      return original_destination;
    }
  }
}
