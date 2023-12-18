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
import {
  DropPresetItemsOnDeathModule,
  HasDropItemsOnDeathModule,
  IDropItemsOnDeathModule,
} from "../../entitymodel/modules/dropitemsondeath/DropItemsOnDeathModule";
import { ItemEnum } from "../../items/Item";

export type TreeVariation = 1 | 2 | 3;

export interface TreeData extends BaseEntityData {
  type: "TreeData";
  game_space_data: StaticCollidableShapeData;
  health_module_data: HealthModuleData;
  variation: TreeVariation;
}

export class Tree extends BaseEntity implements HasHealthModule, HasStaticCollidableShape, HasDropItemsOnDeathModule {
  public readonly type = "Tree";
  public readonly health_module: IHealthModule;
  public readonly drop_items_on_death: IDropItemsOnDeathModule;
  public readonly game_space_data: StaticCollidableShape;

  public readonly variation: TreeVariation;

  constructor(data: TreeData, protected readonly game_system: GameSystem) {
    super(data);

    this.variation = data.variation;

    const health_observable = new HealthObservable();
    this.health_module = new HealthModule(health_observable, this, this.game_system, data.health_module_data);

    this.game_space_data = new StaticCollidableShapeModule(data.game_space_data, TreeShapeData);

    this.drop_items_on_death = new DropPresetItemsOnDeathModule(this.game_system, [
      { item_data: { type: ItemEnum.Wood }, probability: 1 },
    ]);

    /**
     * Behavior
     *  on death spawn trunk, particles (leaves, falling animation)
     *  slowly regen health
     */
  }
}
