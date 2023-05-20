import { GTMath } from "../math/GTMath";
import { StaticPoint } from "./Point";
import { StaticVector } from "./Vector";

export class Shape {
  /**
   * Normal of shape in counter-clockwise order, corresponding to segment between vertex i and i + 1.
   */
  public readonly normals: StaticVector[];

  /**
   * @param vertices Vertices of shape in counter-clockwise order.
   */
  constructor(public readonly vertices: StaticPoint[]) {
    for (let i: number = 0; i < vertices.length; i++) {}

    this.normals = this.vertices.map((vertex, index) => {
      const next_vertex = vertices[(index + 1) % vertices.length];
      return GTMath.Normal(vertex, next_vertex);
    });
  }
}
