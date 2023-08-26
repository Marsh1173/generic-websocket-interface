import { StaticPoint } from "../../../../common/physics/geometry/Point";

export interface HasStaticCollidableCircle {
  readonly game_space_data: StaticCollidableCircleData;
}

export interface StaticCollidableCircleData {
  origin: StaticPoint;
  radius: number;
}

export interface StaticCollidableCircle {
  readonly type: "StaticCollidableCircle";
  readonly origin: StaticPoint;
  readonly radius: number;
}
