import { GTMath } from "../basic/GTMath";
import { StaticPoint } from "./Point";
import { GlobalRect } from "./Rect";
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
      const next_local_vertex = shape_vertices.vertices[(index + 1) % shape_vertices.vertices.length];
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
        angle: GTMath.Rotation(global_vertex, next_global_vertex),
        normal: GTMath.Normal(vertex, next_local_vertex),
      };
    });
  }

  public next_vertex(index: number): ShapeVertexData {
    return this.vertices_data[(index + 1) % this.vertices_data.length];
  }

  public previous_vertex(index: number): ShapeVertexData {
    return this.vertices_data[(index + this.vertices_data.length - 1) % this.vertices_data.length];
  }

  private _bounding_box: GlobalRect | undefined = undefined;
  public get bounding_box(): GlobalRect {
    if (this._bounding_box) {
      return this._bounding_box;
    }

    let top: number = this.vertices_data[0].vertex.y;
    let bottom: number = this.vertices_data[0].vertex.y;
    let left: number = this.vertices_data[0].vertex.x;
    let right: number = this.vertices_data[0].vertex.x;

    this.vertices_data.forEach((data) => {
      top = Math.max(top, data.vertex.y);
      bottom = Math.min(bottom, data.vertex.y);
      left = Math.min(left, data.vertex.x);
      right = Math.max(right, data.vertex.x);
    });

    this._bounding_box = {
      top,
      bottom,
      left,
      right,
    };
    return this._bounding_box;
  }
}
