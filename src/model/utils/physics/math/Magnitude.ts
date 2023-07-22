import { StaticVector } from "../geometry/Vector";

/**
 * Finds the magnitude of a vector
 */
export function GTMagnitude(v: StaticVector): number {
  return Math.sqrt(v.x ** 2 + v.y ** 2);
}
