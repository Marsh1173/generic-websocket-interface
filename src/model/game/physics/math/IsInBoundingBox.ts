import { Point } from "../geometry/Point";

/**
 * Right and top are not inclusive.
 * @returns true if p.x >= left && p.x < right && p.y >= bottom && p.y < top
 */
export function IsInBoundingBox(
  p: Point,
  top: number,
  left: number,
  bottom: number,
  right: number
): boolean {
  return p.x >= left && p.x < right && p.y >= bottom && p.y < top;
}
