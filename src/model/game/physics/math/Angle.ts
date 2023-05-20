import { Point } from "../geometry/Point";

export function Angle(p1: Point, p2: Point): number {
  return Math.atan((p2.y - p1.y) / (p2.x - p1.x));
}
