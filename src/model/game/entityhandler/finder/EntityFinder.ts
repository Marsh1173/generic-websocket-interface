import { Id } from "../../../common/Id";
import { StaticPoint } from "../../../common/math/geometry/Point";
import { GlobalRect } from "../../../common/math/geometry/Rect";
import { StaticSegment } from "../../../common/math/geometry/Segment";
import { Shape } from "../../../common/math/geometry/Shape";
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
    // by_raycast_line: (segment: StaticSegment): ShapeCollision | undefined => {
    //   return this.handler.physics.detector.detect_collisions(segment);
    // },
    by_intersecting_shape(): Shape[] {
      //returns a list of shapes the shape intersects with
      throw new Error("Not implemented yet");
    },
  };

  public readonly dynamic_point_entities = {
    /**
     * @param bb_size the length of the sides of the bounding box that entities must fall inside
     */
    // inside_box: (p: StaticPoint, bb_size: number): Entity[] => {
    //   const half_len = bb_size / 2;
    //   const bb: GlobalRect = {
    //     top: p.y + half_len,
    //     bottom: p.y - half_len,
    //     left: p.x - half_len,
    //     right: p.x + half_len,
    //   };
    //   return this.handler.entity_points.search.by_bounding_box(bb);
    // },
  };
}
