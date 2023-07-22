import { StaticPoint } from "./Point";
import { LocalShapeVertices, Shape } from "./Shape";

export interface Rect {
  w: number;
  h: number;
}
export type StaticRect = Readonly<Rect>;
export abstract class Rect {
  public static to_vertices(
    rect: Rect,
    origin: StaticPoint = { x: 0, y: 0 }
  ): LocalShapeVertices {
    return {
      vertices: [
        { x: -rect.w / 2 + origin.x, y: -rect.h / 2 + origin.y },
        { x: rect.w / 2 + origin.x, y: -rect.h / 2 + origin.y },
        { x: rect.w / 2 + origin.x, y: rect.h / 2 + origin.y },
        { x: -rect.w / 2 + origin.x, y: rect.h / 2 + origin.y },
      ],
    };
  }
}

export interface GlobalRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
export type StaticGlobalRect = Readonly<GlobalRect>;

export class RectShape extends Shape {
  constructor(rect: StaticRect, origin: StaticPoint) {
    super(Rect.to_vertices(rect, origin), origin);
  }
}
