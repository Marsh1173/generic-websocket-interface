import { StaticPoint } from "../geometry/Point";
import { Vector } from "../geometry/Vector";

/**
 * @returns difference between p1 and p2, starting at p1.
 */
export function GTDifference(p1: StaticPoint, p2: StaticPoint): Vector {
  return { x: p2.x - p1.x, y: p2.y - p1.y };
}
