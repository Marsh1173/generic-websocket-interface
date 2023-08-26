import { Id } from "../../../utils/Id";
import { SegmentCollidesWithStaticShapeReturnData } from "../../../utils/physics/collision/SegmentCollidesWithStaticShape";
import { StaticPoint } from "../../../utils/physics/geometry/Point";
import { Shape } from "../../../utils/physics/geometry/Shape";
import { Entity } from "../../entitymodel/entity/Entity";
import { EntityHandler } from "../EntityHandler";

export abstract class EntityFinder {
  constructor(protected readonly handler: EntityHandler) {}
  public by_id(id: Id): Entity | undefined {
    return this.handler.entity_map.get(id);
  }

  public readonly static_collidable_shapes = {
    by_point(p: StaticPoint): Shape[] {
      //returns a list of shapes the point falls inside of
      throw new Error("Not implemented yet");
    },
    by_raycast_line(): SegmentCollidesWithStaticShapeReturnData {
      //returns first collided line segment with percentage along ray that they collide
      throw new Error("Not implemented yet");
    },
    by_intersecting_shape(): Shape[] {
      //returns a list of shapes the shape intersects with
      throw new Error("Not implemented yet");
    },
  };
}
