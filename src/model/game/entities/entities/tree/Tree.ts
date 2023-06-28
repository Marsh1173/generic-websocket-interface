import { Entity, BaseEntityData } from "../../model/entity/Entity";
import {
  HasHealthModule,
  HealthModule,
  HealthModuleData,
  IHealthModule,
} from "../../model/modules/health/HealthModule";
import { HealthObservable } from "../../model/modules/health/HealthObservable";
import {
  HasStationaryModule,
  IStationaryModule,
  StationaryModule,
  StationaryModuleData,
} from "../../model/modules/stationary/StationaryModule";

export interface TreeData
  extends BaseEntityData,
    HealthModuleData,
    StationaryModuleData {
  type: "TreeData";
}

export class Tree
  extends Entity
  implements HasHealthModule, HasStationaryModule
{
  declare health_module: IHealthModule;
  declare stationary_module: IStationaryModule;

  constructor(data: TreeData) {
    super(data);

    const health_observable = new HealthObservable();
    this.health_module = new HealthModule(health_observable, this, data);

    this.stationary_module = new StationaryModule(this, data);
  }
}
