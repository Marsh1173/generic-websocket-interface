import { StaticVector } from "../../../common/physics/geometry/Vector";
import { GTMath } from "../../../common/physics/math/GTMath";
import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";
import { BaseEntityData } from "../../entitymodel/entity/EntityData";
import { DynamicPointData } from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import {
  HasDynamicMovablePoint,
  DynamicMovablePoint,
  DynamicMovablePointModule,
} from "../../entitymodel/gamespacedata/dynamicpoint/dynamicmovablepoint/DynamicMovablePoint";
import { GameSystem } from "../../gamesystem/GameSystem";

export interface ArrowData extends BaseEntityData {
  type: "ArrowData";
  game_space_data: Omit<DynamicPointData, "mom">;
  rotation: number;
}

export class Arrow extends BaseEntity implements HasDynamicMovablePoint {
  public readonly type = "Arrow";
  public readonly game_space_data: DynamicMovablePoint;

  constructor(data: ArrowData, protected readonly game_system: GameSystem) {
    super(data);

    const mom: StaticVector = GTMath.VectorFromRotation(data.rotation, 10);

    this.game_space_data = new DynamicMovablePointModule({ ...data.game_space_data, mom });
  }
}
