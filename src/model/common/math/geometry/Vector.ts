import { StaticPoint } from "./Point";

export interface Vector {
  x: number;
  y: number;
}
export type StaticVector = Readonly<Vector>;

export abstract class Vector {
  public static add(v1: StaticVector | StaticPoint, v2: StaticVector | StaticPoint): StaticVector {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y,
    };
  }
}
