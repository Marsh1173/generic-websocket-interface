import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";
import { BaseEntityData } from "../../entitymodel/entity/EntityData";
import {
  DynamicPointData,
  DynamicPoint,
  HasDynamicPoint,
} from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
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
  implements HasHealthModule, HasDynamicPoint, HasBehaviorModule
{
  public readonly type = "Goblin";
  public readonly health_module: IHealthModule;
  public readonly game_space_data: DynamicPoint;
  public readonly behavior_module: GoblinBehaviorModule;

  constructor(data: GoblinData, protected readonly game_system: GameSystem) {
    super(data);
    const health_observable = new HealthObservable();

    this.game_space_data = new DynamicPoint(data.game_space_data);
    this.health_module = new HealthModule(
      health_observable,
      this,
      data.health_module_data
    );
    this.behavior_module = new GoblinBehaviorModule(data.behavior_data, this);
  }
}
