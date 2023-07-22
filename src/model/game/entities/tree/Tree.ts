import { GameSystem } from "../../gamesystem/GameSystem";
import { BaseEntity } from "../../entitymodel/entity/Entity";
import { BaseEntityData } from "../../entitymodel/entity/EntityData";
import {
  GameSpaceStaticCollidableShape,
  GameSpaceStaticCollidableShapeData,
  HasGameSpaceStaticCollidableShape,
  StaticCollidableShapeModule,
} from "../../entitymodel/gamespacedata/staticcollidableshape/GameSpaceStaticCollidableShape";
import {
  HasHealthModule,
  HealthModule,
  HealthModuleData,
  IHealthModule,
} from "../../entitymodel/modules/health/HealthModule";
import { HealthObservable } from "../../entitymodel/modules/health/HealthObservable";
import { TreeShapeData } from "./TreeShape";

export interface TreeData extends BaseEntityData {
  type: "TreeData";
  game_space_data: GameSpaceStaticCollidableShapeData;
  health_module_data: HealthModuleData;
}

export class Tree
  extends BaseEntity
  implements HasHealthModule, HasGameSpaceStaticCollidableShape
{
  public readonly type = "Tree";
  declare health_module: IHealthModule;
  declare game_space_data: GameSpaceStaticCollidableShape;

  constructor(data: TreeData, public readonly game_system: GameSystem) {
    super(data);

    const health_observable = new HealthObservable();
    this.health_module = new HealthModule(
      health_observable,
      this,
      data.health_module_data
    );

    this.game_space_data = new StaticCollidableShapeModule(
      data.game_space_data,
      TreeShapeData
    );

    /**
     * Behavior
     *  on death spawn trunk, particles (leaves, falling animation)
     *  on death spawn item
     *  slowly regen health
     */
  }
}
