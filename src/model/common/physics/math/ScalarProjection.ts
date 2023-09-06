import { StaticVector } from "../geometry/Vector";
import { GTMath } from "./GTMath";

/**
 * Returns the scalar that, when multiplied by v2, gives the vector along v2 that's the shadow cast by v1.
 */
export function GTScalarProjection(v1: StaticVector, v2: StaticVector): number {
  return GTMath.DotProduct(v1, v2) / (v2.x ** 2 + v2.y ** 2);
}
