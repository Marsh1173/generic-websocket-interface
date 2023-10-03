import { Point } from "../geometry/Point";

/**
 * @returns Angle from p1 to p2 in radians, or from {0,0} to p1 if p2 is not included.
 */
export function GTRotation(p1: Point, p2?: Point): number {
  if (p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  } else {
    return Math.atan2(p1.y, p1.x);
  }
}
