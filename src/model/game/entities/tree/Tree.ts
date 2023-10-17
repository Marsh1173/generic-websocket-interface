import { GameSystem } from "../../gamesystem/GameSystem";
import { BaseEntityData } from "../../entitymodel/entity/EntityData";
import {
  StaticCollidableShape,
  StaticCollidableShapeData,
  HasStaticCollidableShape,
  StaticCollidableShapeModule,
} from "../../entitymodel/gamespacedata/staticcollidableshape/StaticCollidableShape";
import {
  HasHealthModule,
  HealthModule,
  HealthModuleData,
  IHealthModule,
} from "../../entitymodel/modules/health/HealthModule";
import { HealthObservable } from "../../entitymodel/modules/health/HealthObservable";
import { TreeShapeData } from "./TreeShape";
import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";

export type TreeVariation = 1 | 2 | 3;

export interface TreeData extends BaseEntityData {
  type: "TreeData";
  game_space_data: StaticCollidableShapeData;
  health_module_data: HealthModuleData;
  variation: TreeVariation;
}

export class Tree extends BaseEntity implements HasHealthModule, HasStaticCollidableShape {
  public readonly type = "Tree";
  public readonly health_module: IHealthModule;
  public readonly game_space_data: StaticCollidableShape;

  public readonly variation: TreeVariation;

  constructor(data: TreeData, protected readonly game_system: GameSystem) {
    super(data);

    this.variation = data.variation;

    const health_observable = new HealthObservable();
    this.health_module = new HealthModule(health_observable, this, this.game_system, data.health_module_data);

    this.game_space_data = new StaticCollidableShapeModule(data.game_space_data, TreeShapeData);

    /**
     * Behavior
     *  on death spawn trunk, particles (leaves, falling animation)
     *  on death spawn item
     *  slowly regen health
     */
  }
}
