import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";
import { BaseEntityData } from "../../entitymodel/entity/EntityData";
import {
  DynamicMovablePoint,
  DynamicMovablePointModule,
  HasDynamicMovablePoint,
} from "../../entitymodel/gamespacedata/dynamicmovablepoint/DynamicMovablePoint";
import { DynamicPointData } from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { GameSystem } from "../../gamesystem/GameSystem";

export interface ArrowData extends BaseEntityData {
  type: "ArrowData";
  game_space_data: DynamicPointData;
}

export class Arrow extends BaseEntity implements HasDynamicMovablePoint {
  public readonly type = "Arrow";
  public readonly game_space_data: DynamicMovablePoint;

  constructor(data: ArrowData, protected readonly game_system: GameSystem) {
    super(data);

    this.game_space_data = new DynamicMovablePointModule(data.game_space_data);
  }
}
