import { GTMath } from "../math/GTMath";
import { StaticPoint } from "./Point";
import { StaticSegment } from "./Segment";
import { StaticVector } from "./Vector";

export interface LocalShapeVertices {
  readonly vertices: StaticPoint[];
}

export interface ShapeVertexData {
  /**
   * @param vertices Globally positioned vertices of shape.
   */
  vertex: StaticPoint;
  /**
   * Vectors from each vertex (as origin, i.e. [0, 0]) to the next vertex, corresponding to segment between vertex i and i + 1.
   * Useful for finding if a point falls in this shape;
   */
  edge_vector: StaticVector;
  /**
   * Segment between vertex i and i + 1, using global coordinates.
   */
  edge_segment: StaticSegment;
  /**
   * Angle in radians from vertex i to i + 1.
   */
  angle: number;
  /**
   * Normal of shape, corresponding to segment between vertex i and i + 1.
   */
  normal: StaticVector;
}

export class Shape {
  /**
   * Clockwise order
   */
  public readonly vertices_data: ShapeVertexData[];
  public readonly origin: StaticPoint;

  constructor(shape_vertices: LocalShapeVertices, origin: StaticPoint) {
    this.origin = origin;

    this.vertices_data = shape_vertices.vertices.map((vertex, index) => {
      const global_vertex = {
        x: vertex.x + this.origin.x,
        y: vertex.y + this.origin.y,
      };
      const next_local_vertex =
        shape_vertices.vertices[(index + 1) % shape_vertices.vertices.length];
      const next_global_vertex = {
        x: next_local_vertex.x + this.origin.x,
        y: next_local_vertex.y + this.origin.y,
      };
      return {
        vertex: global_vertex,
        edge_vector: {
          x: next_local_vertex.x - vertex.x,
          y: next_local_vertex.y - vertex.y,
        },
        edge_segment: { p1: global_vertex, p2: next_global_vertex },
        angle: GTMath.Angle(global_vertex, next_global_vertex),
        normal: GTMath.Normal(vertex, next_local_vertex),
      };
    });
  }
}
