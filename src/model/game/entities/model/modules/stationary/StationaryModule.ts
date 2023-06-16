import { Point, StaticPoint } from "../../../../physics/geometry/Point";
import { Entity, EntityData } from "../../entity/Entity";

export interface StationaryModuleData extends EntityData {
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
    protected readonly entity: Entity & HasStationaryModule,
    data: StationaryModuleData
  ) {
    this.pos = data.pos;
  }
}
