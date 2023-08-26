import { StaticPoint } from "../geometry/Point";
import { StaticVector } from "../geometry/Vector";

/**
 * Determines a vector perpendicular to the segment spanning from p1 -> p2.
 * Vector is found the counter-clockwise direction, assuming normal x-y plane.
 * Vector will be the same length as the distance between p1 and p2.
 */
export function GTNormal(p1: StaticPoint, p2: StaticPoint): StaticVector {
  return {
    x: -(p2.y - p1.y),
    y: p2.x - p1.x,
  };
}
