import { StaticVector } from "../geometry/Vector";

/**
 * @returns dot product of two vectors (i.e. `x1 * x2 + y1 * y2`).
 */
export function GTDotProduct(v1: StaticVector, v2: StaticVector): number {
  return v1.x * v2.x + v1.y * v2.y;
}
