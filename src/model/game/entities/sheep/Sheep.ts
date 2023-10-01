import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";
import { BaseEntityData } from "../../entitymodel/entity/EntityData";
import {
  DynamicPoint,
  DynamicPointData,
  HasDynamicPoint,
} from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { HasBehaviorModule } from "../../entitymodel/modules/behavior/BehaviorModule";
import { BehaviorWanderModuleData } from "../../entitymodel/modules/behavior/BehaviorWanderModule";
import {
  HasHealthModule,
  HealthModule,
  HealthModuleData,
  IHealthModule,
} from "../../entitymodel/modules/health/HealthModule";
import { HealthObservable } from "../../entitymodel/modules/health/HealthObservable";
import { GameSystem } from "../../gamesystem/GameSystem";
import { SheepBehaviorModule } from "./behavior/SheepBehavior";

export interface SheepData extends BaseEntityData {
  type: "SheepData";
  game_space_data: DynamicPointData;
  health_module_data: HealthModuleData;
  behavior_data?: BehaviorWanderModuleData;
}
export class Sheep
  extends BaseEntity
  implements HasHealthModule, HasDynamicPoint, HasBehaviorModule
{
  public readonly type = "Sheep";
  public readonly health_module: IHealthModule;
  public readonly game_space_data: DynamicPoint;
  public readonly behavior_module: SheepBehaviorModule;

  constructor(data: SheepData, protected readonly game_system: GameSystem) {
    super(data);
    const health_observable = new HealthObservable();

    this.game_space_data = new DynamicPoint(data.game_space_data, true);
    this.health_module = new HealthModule(
      health_observable,
      this,
      data.health_module_data
    );

    this.behavior_module = new SheepBehaviorModule(this, data.behavior_data);
  }
}
