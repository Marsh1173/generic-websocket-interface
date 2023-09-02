import { NearlyEquals } from "../../NearlyEquals";

export interface Point {
  x: number;
  y: number;
}
export type StaticPoint = Readonly<Point>;

export abstract class Point {
  public static nearly_equals(p1: StaticPoint, p2: StaticPoint): boolean {
    return NearlyEquals(p1.x, p2.x) && NearlyEquals(p1.y, p2.y);
  }
}
