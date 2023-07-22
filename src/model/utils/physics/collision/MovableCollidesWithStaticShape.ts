import { Movable } from "../geometry/Movable";
import { StaticSegment } from "../geometry/Segment";
import { Shape } from "../geometry/Shape";
import { GTCollision } from "./GTCollision";

export type MovableCollidesWithStaticShapeReturnData =
  | undefined
  | { edge_angle: number; proportion: number };

/**
 * Similar to {@link GTMath.LineSegmentsCollide} but operates over a shape, using a movable's current -> previous position.
 *
 * @returns the closest proportion of the movable's "moved" vector, and the slope of the edge collided with.
 */
export function GTMovableCollidesWithStaticShape(
  movable: Movable,
  shape: Shape
): MovableCollidesWithStaticShapeReturnData {
  let return_data: MovableCollidesWithStaticShapeReturnData = undefined;

  const move_seg: StaticSegment = { p1: movable.prev_pos, p2: movable.pos };

  for (const shape_vertex of shape.vertices_data) {
    const collision_results = GTCollision.LineSegmentsCollide(
      move_seg,
      shape_vertex.edge_segment
    );

    if (
      collision_results &&
      (!return_data || return_data.proportion > collision_results)
    ) {
      return_data = {
        proportion: collision_results,
        edge_angle: shape_vertex.angle,
      };
    }
  }

  return return_data;
}
