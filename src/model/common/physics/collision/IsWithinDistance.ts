import { StaticPoint } from "../geometry/Point";
import { GTMath } from "../math/GTMath";

/**
 * Returns true if the distance between p1 and p2 is d or less
 */
export function GTIsWithinDistance(
  p1: StaticPoint,
  p2: StaticPoint,
  d: number
): boolean {
  return d ** 2 >= (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
}
