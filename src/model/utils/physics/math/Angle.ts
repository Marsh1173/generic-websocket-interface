import { Point } from "../geometry/Point";

/**
 * @returns Angle from p1 to p2.
 */
export function GTAngle(p1: Point, p2: Point): number {
  return Math.atan((p2.y - p1.y) / (p2.x - p1.x));
}
