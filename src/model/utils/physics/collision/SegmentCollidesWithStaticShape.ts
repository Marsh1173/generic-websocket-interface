import { Movable } from "../geometry/Movable";
import { Segment, StaticSegment } from "../geometry/Segment";
import { Shape } from "../geometry/Shape";
import { GTCollision } from "./GTCollision";

export type SegmentCollidesWithStaticShapeReturnData = undefined | { edge_angle: number; proportion: number };

/**
 * Similar to {@link GTMath.LineSegmentsCollide} but operates over a shape.
 *
 * @returns the closest proportion of the segment starting from segment.p1, and the slope of the edge collided with.
 */
export function GTSegmentCollidesWithStaticShape(
  segment: StaticSegment,
  shape: Shape
): SegmentCollidesWithStaticShapeReturnData {
  let return_data: SegmentCollidesWithStaticShapeReturnData = undefined;

  for (const shape_vertex of shape.vertices_data) {
    const collision_results = GTCollision.LineSegmentsCollide(segment, shape_vertex.edge_segment);

    if (collision_results && (!return_data || return_data.proportion > collision_results)) {
      return_data = {
        proportion: collision_results,
        edge_angle: shape_vertex.angle,
      };
    }
  }

  return return_data;
}
