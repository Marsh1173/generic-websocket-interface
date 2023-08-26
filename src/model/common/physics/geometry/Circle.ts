import { Point, StaticPoint } from "./Point";

export interface Circle {
  origin: Point;
  radius: number;
}

export interface StaticCircle {
  readonly origin: StaticPoint;
  readonly radius: number;
}
