import { StaticPoint } from "./Point";
import { Shape } from "./Shape";

export interface Rect {
  w: number;
  h: number;
}
export type StaticRect = Readonly<Rect>;

export class RectShape extends Shape {
  constructor(rect: StaticRect, bottom_left: StaticPoint) {
    super([
      bottom_left,
      { x: bottom_left.x + rect.w, y: bottom_left.y },
      { x: bottom_left.x + rect.w, y: bottom_left.y + rect.h },
      { x: bottom_left.x, y: bottom_left.y + rect.h },
    ]);
  }
}
