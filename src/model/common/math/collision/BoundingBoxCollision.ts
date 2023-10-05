import { GlobalRect } from "../geometry/Rect";

/**
 * Returns true if bb1 and bb2 intersect. IMPROTANT: Top and left of bb1 are NOT inclusive.
 * @param bb1
 * @param bb2
 */
export function GTBoundingBoxCollision(
  bb1: GlobalRect,
  bb2: GlobalRect
): boolean {
  return (
    bb2.top >= bb1.bottom &&
    bb2.bottom < bb1.top &&
    bb2.right >= bb1.left &&
    bb2.left < bb1.right
  );
}
