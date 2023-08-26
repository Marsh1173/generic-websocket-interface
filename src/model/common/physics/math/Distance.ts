import { Point } from "../geometry/Point";

/**
 * @returns distance between p1 and p2, starting at p1.
 */
export function GTDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
