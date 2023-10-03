import { StaticVector } from "../geometry/Vector";
import { GTMath } from "./GTMath";

/**
 * Returns a normalized version of v, i.e. a unit vector in the same direction as v.
 */
export function GTNormalize(v: StaticVector): StaticVector {
  const magnitude = GTMath.Magnitude(v);
  return { x: v.x / magnitude, y: v.y / magnitude };
}
