import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";
import { BaseEntityData } from "../../entitymodel/entity/EntityData";
import {
  DynamicPointModule,
  GameSpaceDynamicPoint,
  GameSpaceDynamicPointData,
  HasGameSpaceDynamicPoint,
} from "../../entitymodel/gamespacedata/dynamicpoint/GameSpaceDynamicPoint";
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
  game_space_data: GameSpaceDynamicPointData;
  health_module_data: HealthModuleData;
  behavior_data: GoblinBehaviorData;
}

export class Goblin
  extends BaseEntity
  implements HasHealthModule, HasGameSpaceDynamicPoint, HasBehaviorModule
{
  public readonly type = "Goblin";
  public readonly health_module: IHealthModule;
  public readonly game_space_data: GameSpaceDynamicPoint;
  public readonly behavior_module: GoblinBehaviorModule;

  constructor(data: GoblinData, public readonly game_system: GameSystem) {
    super(data);
    this.game_space_data = new DynamicPointModule(data.game_space_data);

    const health_observable = new HealthObservable();
    this.health_module = new HealthModule(
      health_observable,
      this,
      data.health_module_data
    );

    this.behavior_module = new GoblinBehaviorModule(data.behavior_data, this);
  }
}
