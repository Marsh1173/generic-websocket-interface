import { Point } from "../geometry/Point";
import { GlobalRect } from "../geometry/Rect";

/**
 * Right and top are not inclusive.
 * @returns true if `p.x >= left && p.x < right && p.y >= bottom && p.y < top`
 */
export function GTIsInBoundingBox(p: Point, box: GlobalRect): boolean {
  return (
    p.x >= box.left && p.x < box.right && p.y >= box.bottom && p.y < box.top
  );
}
