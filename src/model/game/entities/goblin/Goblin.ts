import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";
import { BaseEntityData } from "../../entitymodel/entity/EntityData";
import {
  DynamicForceablePointModule,
  DynamicForceablePoint,
  HasDynamicForceablePoint,
} from "../../entitymodel/gamespacedata/dynamicforceablepoint/DynamicForceablePoint";
import { DynamicPointData } from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { HasBehaviorModule } from "../../entitymodel/modules/behavior/BehaviorModule";
import {
  HasHealthModule,
  HealthModule,
  HealthModuleData,
  IHealthModule,
} from "../../entitymodel/modules/health/HealthModule";
import { HealthObservable } from "../../entitymodel/modules/health/HealthObservable";
import { GameSystem } from "../../gamesystem/GameSystem";
import {
  GoblinBehaviorData,
  GoblinBehaviorModule,
} from "./behavior/GoblinBehaviorModule";

export interface GoblinData extends BaseEntityData {
  type: "GoblinData";
  game_space_data: DynamicPointData;
  health_module_data: HealthModuleData;
  behavior_data: GoblinBehaviorData;
}

export class Goblin
  extends BaseEntity
  implements HasHealthModule, HasDynamicForceablePoint, HasBehaviorModule
{
  public readonly type = "Goblin";
  public readonly health_module: IHealthModule;
  public readonly game_space_data: DynamicForceablePoint;
  public readonly behavior_module: GoblinBehaviorModule;

  constructor(data: GoblinData, protected readonly game_system: GameSystem) {
    super(data);
    this.game_space_data = new DynamicForceablePointModule(
      data.game_space_data,
      { friction_const: "default" }
    );

    const health_observable = new HealthObservable();
    this.health_module = new HealthModule(
      health_observable,
      this,
      data.health_module_data
    );

    this.behavior_module = new GoblinBehaviorModule(data.behavior_data, this);
  }
}
