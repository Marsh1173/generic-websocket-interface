import { StaticSegment } from "../geometry/Segment";
import { Shape, ShapeVertexData } from "../geometry/Shape";
import { StaticVector } from "../geometry/Vector";
import { GTMath } from "../math/GTMath";
import { GTCollision } from "./GTCollision";

export type SegmentCollidesWithStaticShapeReturnData =
  | undefined
  | {
      shape_vertex_data: ShapeVertexData;
      seg_progress: number;
      edge_progress: number;
    };

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
  const seg_vector: StaticVector = {
    x: segment.p2.x - segment.p1.x,
    y: segment.p2.y - segment.p1.y,
  };

  for (const shape_vertex of shape.vertices_data) {
    const collision_results = GTCollision.LineSegmentsCollide(
      segment,
      shape_vertex.edge_segment
    );

    if (!collision_results) {
      continue;
    }

    if (
      !return_data ||
      return_data.seg_progress > collision_results.seg1_proportion ||
      (return_data.seg_progress === collision_results.seg1_proportion &&
        edge_alignment(
          seg_vector,
          shape_vertex,
          collision_results.seg2_proportion
        ) >
          edge_alignment(
            seg_vector,
            return_data.shape_vertex_data,
            return_data.edge_progress
          ))
    ) {
      return_data = {
        seg_progress: collision_results.seg1_proportion,
        edge_progress: collision_results.seg2_proportion,
        shape_vertex_data: shape_vertex,
      };
    }
  }

  return return_data;
}

/**
 * Checks how aligned a vector and an edge are.
 */
function edge_alignment(
  seg_vector: StaticVector,
  vertex_data: ShapeVertexData,
  edge_progress: number
): number {
  let edge_vector: StaticVector;
  if (edge_progress === 0) {
    edge_vector = vertex_data.edge_vector;
  } else if (edge_progress === 1) {
    edge_vector = {
      x: -vertex_data.edge_vector.x,
      y: -vertex_data.edge_vector.y,
    };
  } else {
    throw new Error(
      "Somehow the edge progress on a corner was not 0 or 1, but " +
        edge_progress
    );
  }
  return GTMath.DotProduct(seg_vector, GTMath.Normalize(edge_vector));
}
