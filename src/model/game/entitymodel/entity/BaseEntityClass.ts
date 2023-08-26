import { HasId, Id } from "../../../common/Id";
import { DynamicForceablePoint } from "../gamespacedata/dynamicpoint/dynamicforceablepoint/DynamicForceablePoint";
import { DynamicMovablePoint } from "../gamespacedata/dynamicpoint/dynamicmovablepoint/DynamicMovablePoint";
import { StaticCollidableShape } from "../gamespacedata/staticcollidableshape/StaticCollidableShape";
import { GameSpaceStaticPoint } from "../gamespacedata/staticpoint/StaticPoint";
import { HasBehaviorModule, IBehaviorModule } from "../modules/behavior/BehaviorModule";
import { DeconstructModule, HasDeconstructModule } from "../modules/deconstruct/DeconstructModule";
import { HasHealthModule, IHealthModule } from "../modules/health/HealthModule";
import { HasTeamModule, ITeamModule } from "../modules/team/TeamModule";
import { BaseEntityData } from "./EntityData";

export abstract class BaseEntity
  implements Partial<HasHealthModule>, Partial<HasTeamModule>, Partial<HasBehaviorModule>, HasDeconstructModule, HasId
{
  public readonly id: Id;
  public readonly deconstruct_module: DeconstructModule = new DeconstructModule(this);

  constructor(data: BaseEntityData) {
    this.id = data.id;
  }

  public readonly health_module?: IHealthModule | undefined;
  public readonly team_module?: ITeamModule | undefined;
  public readonly behavior_module?: IBehaviorModule | undefined;

  public abstract readonly game_space_data:
    | DynamicForceablePoint
    | DynamicMovablePoint
    | StaticCollidableShape
    | GameSpaceStaticPoint;
}
