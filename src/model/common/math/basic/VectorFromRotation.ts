import { Vector } from "../geometry/Vector";

/**
 *
 * @param angle Angle in radians
 * @param [magnitude=1] Magnitude of vector, defaults to 1 (unit vector)
 */
export function GTVectorFromAngle(
  angle: number,
  magnitude: number = 1
): Vector {
  return { x: Math.cos(angle) * magnitude, y: Math.sin(angle) * magnitude };
}
