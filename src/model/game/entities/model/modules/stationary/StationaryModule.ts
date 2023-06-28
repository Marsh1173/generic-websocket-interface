import { Point, StaticPoint } from "../../../../physics/geometry/Point";
import { Entity, BaseEntityData } from "../../entity/Entity";

export interface StationaryModuleData extends BaseEntityData {
  readonly pos: StaticPoint;
}

export interface IStationaryModule {
  readonly pos: Point;
}

export interface HasStationaryModule {
  readonly stationary_module: IStationaryModule;
}

export class StationaryModule implements IStationaryModule {
  public readonly pos: Point;

  constructor(
    public readonly entity: Entity & HasStationaryModule,
    data: StationaryModuleData
  ) {
    this.pos = data.pos;
  }
}
