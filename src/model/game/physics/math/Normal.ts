import { StaticPoint } from "../geometry/Point";
import { StaticVector } from "../geometry/Vector";

export function Normal(p1: StaticPoint, p2: StaticPoint): StaticVector {
  return {
    x: -(p2.y - p1.y),
    y: p2.x - p1.x,
  };
}
