import { StaticVector, Vector } from "../geometry/Vector";

export function GTScaleVector(v: StaticVector, scalar: number): Vector {
  return {
    x: v.x * scalar,
    y: v.y * scalar,
  };
}
