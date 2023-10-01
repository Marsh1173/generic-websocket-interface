import { Id } from "../../../common/Id";
import { GTCollision } from "../../../common/physics/collision/GTCollision";
import { SegmentCollidesWithStaticShapeReturnData } from "../../../common/physics/collision/SegmentCollidesWithStaticShape";
import { StaticPoint } from "../../../common/physics/geometry/Point";
import { GlobalRect } from "../../../common/physics/geometry/Rect";
import { Shape } from "../../../common/physics/geometry/Shape";
import { Entity } from "../../entitymodel/entity/Entity";
import { EntityWithDynamicPoint } from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
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

  public readonly dynamic_point_entities = {
    /**
     * @param bb_size the length of the sides of the bounding box that entities must fall inside
     */
    inside_box: (
      p: StaticPoint,
      bb_size: number,
      filter?: (e: Entity) => boolean
    ): EntityWithDynamicPoint[] => {
      const bb: GlobalRect = {
        top: p.y + bb_size / 2,
        bottom: p.y - bb_size / 2,
        left: p.x - bb_size / 2,
        right: p.x + bb_size / 2,
      };
      return this.handler.dynamic_points.search_by_bounding_box(bb, filter);
    },
  };
}
