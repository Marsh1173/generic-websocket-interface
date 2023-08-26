import { StaticPoint } from "../../../../common/physics/geometry/Point";
import { Entity } from "../../entity/Entity";

export interface HasStaticPoint {
  readonly game_space_data: StaticPointData;
}

export interface StaticPointData {
  pos: StaticPoint;
}

export class GameSpaceStaticPoint {
  public readonly type = "GameSpaceStaticPoint";
  public readonly pos: StaticPoint;

  constructor(public readonly entity: Entity & HasStaticPoint, data: StaticPointData) {
    this.pos = data.pos;
  }
}
