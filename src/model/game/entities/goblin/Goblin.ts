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
import {
  HasInventoryModule,
  InventoryModule,
  InventoryModuleData,
} from "../../entitymodel/modules/inventory/InventoryModule";
import { HasTeamModule, TeamModule, TeamModuleData } from "../../entitymodel/modules/team/TeamModule";
import { GameSystem } from "../../gamesystem/GameSystem";
import { GoblinBehaviorData, GoblinBehaviorModule } from "./behavior/GoblinBehaviorModule";

export interface GoblinData extends BaseEntityData {
  type: "GoblinData";
  team_module_data: TeamModuleData;
  game_space_data: DynamicPointData;
  health_module_data: HealthModuleData;
  inventory_module_data: InventoryModuleData;
  behavior_data: GoblinBehaviorData;
}

export class Goblin
  extends BaseEntity
  implements HasHealthModule, HasDynamicPoint, HasBehaviorModule, HasTeamModule, HasInventoryModule
{
  public readonly type = "Goblin";
  public readonly team_module: TeamModule;
  public readonly health_module: IHealthModule;
  public readonly game_space_data: DynamicPoint;
  public readonly behavior_module: GoblinBehaviorModule;
  public readonly inventory_module: InventoryModule;

  constructor(data: GoblinData, protected readonly game_system: GameSystem) {
    super(data);
    const health_observable = new HealthObservable();

    this.inventory_module = new InventoryModule(this, this.game_system, data.inventory_module_data);
    this.team_module = new TeamModule(this, data.team_module_data);
    this.game_space_data = new DynamicPoint(data.game_space_data, true);
    this.health_module = new HealthModule(health_observable, this, this.game_system, data.health_module_data);
    this.behavior_module = new GoblinBehaviorModule(data.behavior_data, this, this.game_system);

    this.behavior_module.state.inner.activate_state();
  }
}
