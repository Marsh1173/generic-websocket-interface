import { Movable } from "../../../../utils/physics/geometry/Movable";
import { Point, StaticPoint } from "../../../../utils/physics/geometry/Point";
import {
  StaticVector,
  Vector,
} from "../../../../utils/physics/geometry/Vector";

export interface GameSpaceDynamicPoint extends Movable {
  readonly type: "GameSpaceDynamicPoint";
}

export class DynamicPointModule implements GameSpaceDynamicPoint {
  public readonly type = "GameSpaceDynamicPoint";

  public readonly pos: Point;
  public readonly prev_pos: Point;
  public readonly prev_mom: Vector;
  public readonly mom: Vector;

  constructor(data: GameSpaceDynamicPointData) {
    this.pos = data.pos;
    this.prev_pos = { ...data.pos };
    this.mom = data.mom;
    this.prev_mom = { ...data.mom };
  }

  //add force logic from forceable module
}

export interface GameSpaceDynamicPointData {
  pos: StaticPoint;
  mom: StaticVector;
}

export interface HasGameSpaceDynamicPoint {
  readonly game_space_data: GameSpaceDynamicPoint;
}
