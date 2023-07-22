import { StaticPoint } from "../../../../utils/physics/geometry/Point";
import { Entity } from "../../entity/Entity";

export interface HasGameSpaceStaticPoint {
  readonly game_space_data: GameSpaceStaticPointData;
}

export interface GameSpaceStaticPointData {
  pos: StaticPoint;
}

export class GameSpaceStaticPoint {
  public readonly type = "GameSpaceStaticPoint";
  public readonly pos: StaticPoint;

  constructor(
    public readonly entity: Entity & HasGameSpaceStaticPoint,
    data: GameSpaceStaticPointData
  ) {
    this.pos = data.pos;
  }
}
