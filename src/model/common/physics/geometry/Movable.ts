import { Point } from "./Point";
import { Vector } from "./Vector";

export interface Movable {
  pos: Point;
  prev_pos: Point;
  mom: Vector;
  prev_mom: Vector;
}
