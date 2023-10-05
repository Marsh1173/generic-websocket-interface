import { StaticPoint } from "../geometry/Point";

/**
 * Returns the difference between the distance between p1 and p3 and the distance between p2 and p3.
 * The result will be positive if p1 is further away, negative if closer, and equal if they're the same distance.
 */
export function GTCompareDistance(
  p1: StaticPoint,
  p2: StaticPoint,
  p3: StaticPoint
): number {
  return (
    (p1.x - p3.x) ** 2 +
    (p1.y - p3.y) ** 2 -
    ((p2.x - p3.x) ** 2 + (p2.y - p3.y) ** 2)
  );
}
