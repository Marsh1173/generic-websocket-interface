import { StaticVector } from "../geometry/Vector";
import { GTMath } from "./GTMath";

/**
 * Projects v1 onto v2, i.e., returns a vector representing the shadow that v1 casts onto v2 in the direction of v2.
 */
export function GTVectorProjection(
  v1: StaticVector,
  v2: StaticVector
): StaticVector {
  const mult_factor: number =
    GTMath.DotProduct(v1, v2) / (v2.x ** 2 + v2.y ** 2);
  return { x: v2.x * mult_factor, y: v2.y * mult_factor };
}
