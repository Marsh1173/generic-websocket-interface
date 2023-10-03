import { StaticPoint } from "../geometry/Point";

/**
 * @returns distance between p1 and p2, starting at p1.
 */
export function GTDistance(p1: StaticPoint, p2: StaticPoint): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
