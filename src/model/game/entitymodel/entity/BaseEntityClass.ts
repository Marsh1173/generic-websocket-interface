import { HasId, Id, uuid } from "../../../utils/Id";
import { GameSpaceDynamicPoint } from "../gamespacedata/dynamicpoint/GameSpaceDynamicPoint";
import { GameSpaceStaticCollidableShape } from "../gamespacedata/staticcollidableshape/GameSpaceStaticCollidableShape";
import { GameSpaceStaticPoint } from "../gamespacedata/staticpoint/GameSpaceStaticPoint";
import {
  HasBehaviorModule,
  IBehaviorModule,
} from "../modules/behavior/BehaviorModule";
import {
  DeconstructModule,
  HasDeconstructModule,
} from "../modules/deconstruct/DeconstructModule";
import { HasHealthModule, IHealthModule } from "../modules/health/HealthModule";
import { HasTeamModule, ITeamModule } from "../modules/team/TeamModule";
import { BaseEntityData } from "./EntityData";

export abstract class BaseEntity
  implements
    Partial<HasHealthModule>,
    Partial<HasTeamModule>,
    Partial<HasBehaviorModule>,
    HasDeconstructModule,
    HasId
{
  public readonly id: Id;
  public readonly deconstruct_module: DeconstructModule =
    new DeconstructModule();

  constructor(data: BaseEntityData) {
    this.id = data.id ?? uuid();
  }

  public readonly health_module?: IHealthModule | undefined;
  public readonly team_module?: ITeamModule | undefined;
  public readonly behavior_module?: IBehaviorModule | undefined;

  public abstract readonly game_space_data:
    | GameSpaceDynamicPoint
    | GameSpaceStaticCollidableShape
    | GameSpaceStaticPoint;
}
