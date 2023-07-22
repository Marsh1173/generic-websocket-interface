import { StaticPoint } from "../../../../utils/physics/geometry/Point";

export interface HasGameSpaceStaticCollidableCircle {
  readonly game_space_data: GameSpaceStaticCollidableCircleData;
}

export interface GameSpaceStaticCollidableCircleData {
  origin: StaticPoint;
  radius: number;
}

export interface GameSpaceStaticCollidableCircle {
  readonly type: "GameSpaceStaticCollidableCircle";
  readonly origin: StaticPoint;
  readonly radius: number;
}
