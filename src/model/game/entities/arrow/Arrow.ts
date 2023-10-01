import { StaticVector } from "../../../common/physics/geometry/Vector";
import { GTMath } from "../../../common/physics/math/GTMath";
import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";
import { BaseEntityData } from "../../entitymodel/entity/EntityData";
import {
  DynamicPointData,
  HasDynamicPoint,
  DynamicPoint,
  DynamicPointModule,
} from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { GameSystem } from "../../gamesystem/GameSystem";

export interface ArrowData extends BaseEntityData {
  type: "ArrowData";
  game_space_data: Omit<DynamicPointData, "mom">;
  rotation: number;
}

const ARROW_VELOCITY: number = 7;

export class Arrow extends BaseEntity implements HasDynamicPoint {
  public readonly type = "Arrow";
  public readonly game_space_data: DynamicPoint;
  public readonly rotation: number;

  constructor(data: ArrowData, protected readonly game_system: GameSystem) {
    super(data);

    this.rotation = data.rotation;
    const mom: StaticVector = GTMath.VectorFromAngle(
      this.rotation,
      ARROW_VELOCITY
    );

    this.game_space_data = new DynamicPointModule(
      {
        ...data.game_space_data,
      },
      true
    );

    this.game_space_data.apply_constant_velocity("", mom);
  }
}
