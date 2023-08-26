import { StaticPoint } from "../geometry/Point";
import { StaticVector } from "../geometry/Vector";

/**
 * Takes the cross product of v1 and v2, and returns the scalar of the Z value of the new vector.
 */
export function GTCrossProductZScalar(
  v1: StaticVector | StaticPoint,
  v2: StaticVector | StaticPoint
): number {
  return v1.x * v2.y - v1.y * v2.x;
}
