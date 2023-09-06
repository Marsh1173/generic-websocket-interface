import { StaticPoint } from "../geometry/Point";
import { StaticSegment } from "../geometry/Segment";
import { Shape, ShapeVertexData } from "../geometry/Shape";
import { StaticVector } from "../geometry/Vector";
import { GTMath } from "../math/GTMath";
import { GTCollision } from "./GTCollision";
import { LineSegmentsCollideReturnData } from "./LineSegmentsCollide";

export type SegmentCollidesWithStaticShapeReturnData = {
  shape_vertex_data: ShapeVertexData;
  seg_progress: number;
  edge_progress: number;
};

/**
 * Similar to {@link GTMath.LineSegmentsCollide} but operates over a shape. To collide with a shape edge, these conditions must be met:
 * 1. The segment and the edge must at least touch.
 * 1. The segment must not start from _inside_ the edge, i.e. opposite the outward-facing normal.
 * 1. If the segment collides with the endpoint of an edge, the segment must not be "skidding off"
 * 1. If a corner is hit and both edges are valid, prefer the edge that is more parallel to the segment.
 *
 * @returns the edge data, and the proportions of the segment and edge starting from segment.p1 and edge.p1
 */
export function GTSegmentCollidesWithStaticShape(
  segment: StaticSegment,
  shape: Shape
): SegmentCollidesWithStaticShapeReturnData | undefined {
  let return_data: SegmentCollidesWithStaticShapeReturnData | undefined =
    undefined;

  for (const shape_vertex of shape.vertices_data) {
    const collision_results = GTCollision.LineSegmentsCollide(
      segment,
      shape_vertex.edge_segment
    );

    if (
      !collision_results ||
      !is_viable_edge_collision(
        segment,
        shape_vertex,
        collision_results.seg2_proportion
      )
    ) {
      continue;
    }

    if (
      !return_data ||
      is_preferred_edge_collision(return_data, collision_results)
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

function is_viable_edge_collision(
  move_segment: StaticSegment,
  vertex_data: ShapeVertexData,
  edge_progress: number
): boolean {
  return (
    !move_segment_starts_inside_edge(
      move_segment.p1,
      vertex_data.edge_segment
    ) &&
    !move_segment_skids_off_corner(
      move_segment.p1,
      edge_progress,
      vertex_data.edge_segment,
      vertex_data.edge_vector
    )
  );
}

function move_segment_starts_inside_edge(
  move_segment_start: StaticPoint,
  edge_segment: StaticSegment
): boolean {
  return GTMath.SegmentAndPointZScalar(edge_segment, move_segment_start) < 0;
}

function move_segment_skids_off_corner(
  move_segment_start: StaticPoint,
  edge_progress: number,
  edge_segment: StaticSegment,
  edge_vector: StaticVector = {
    x: edge_segment.p2.x - edge_segment.p1.x,
    y: edge_segment.p2.y - edge_segment.p1.y,
  }
): boolean {
  if (edge_progress !== 0 && edge_progress !== 1) {
    // not colliding with a corner
    return false;
  }

  // position of move segment p1 local to the edge segment's p1
  const local_move_start: StaticVector = {
    x: move_segment_start.x - edge_segment.p1.x,
    y: move_segment_start.y - edge_segment.p1.y,
  };

  const scalar_projection: number = GTMath.ScalarProjection(
    local_move_start,
    edge_vector
  );

  return (
    (scalar_projection <= 1 && edge_progress === 1) ||
    (scalar_projection >= 0 && edge_progress === 0)
  );
}

function is_preferred_edge_collision(
  return_data: SegmentCollidesWithStaticShapeReturnData,
  collision_results: LineSegmentsCollideReturnData
): boolean {
  if (return_data.seg_progress > collision_results.seg1_proportion) {
    return true;
  }
  return false;
  /*
  return (
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
        
  );*/
}

export namespace TestGTSegmentCollidesWithStaticShape {
  export const test_move_segment_starts_inside_edge =
    move_segment_starts_inside_edge;
  export const test_move_segment_skids_off_corner =
    move_segment_skids_off_corner;
  export const test_is_preferred_edge_collision = is_preferred_edge_collision;
}
