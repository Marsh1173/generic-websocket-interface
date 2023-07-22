import { StaticPoint } from "../geometry/Point";
import { Shape } from "../geometry/Shape";
import { StaticVector } from "../geometry/Vector";
import { GTMath } from "../math/GTMath";

/**
 * Provides a quick check to see if point `p` falls inside `shape`. Returns true if point lies on an edge.
 *
 * ---
 * @see https://inginious.org/course/competitive-programming/geometry-pointinconvex#:~:text=The%20point%20will%20be%20inside,the%20right%20of%20every%20line.
 */
export function GTPointIsInShape(p: StaticPoint, shape: Shape): boolean {
  let found_z_is_positive: boolean | undefined = undefined;
  for (const vertex_data of shape.vertices_data) {
    const vector_to_point_from_vertex: StaticVector = {
      x: p.x - vertex_data.vertex.x,
      y: p.y - vertex_data.vertex.y,
    };

    const current_z_is_positive: boolean =
      GTMath.CrossProductZScalar(
        vertex_data.edge_vector,
        vector_to_point_from_vertex
      ) >= 0;

    if (found_z_is_positive === undefined) {
      found_z_is_positive = current_z_is_positive;
    } else if (found_z_is_positive !== current_z_is_positive) {
      return false;
    }
  }
  return true;
}
