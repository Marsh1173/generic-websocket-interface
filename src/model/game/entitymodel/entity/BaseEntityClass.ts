import { HasId, Id } from "../../../common/Id";
import { DynamicPoint } from "../gamespacedata/dynamicpoint/DynamicPoint";
import { StaticCollidableShape } from "../gamespacedata/staticcollidableshape/StaticCollidableShape";
import { GameSpaceStaticPoint } from "../gamespacedata/staticpoint/StaticPoint";
import { HasBehaviorModule, IBehaviorModule } from "../modules/behavior/BehaviorModule";
import { DeconstructModule, HasDeconstructModule } from "../modules/deconstruct/DeconstructModule";
import { HasDropItemsOnDeathModule, IDropItemsOnDeathModule } from "../modules/dropitemsondeath/DropItemsOnDeathModule";
import { HasHealthModule, IHealthModule } from "../modules/health/HealthModule";
import { HasTeamModule, TeamModule } from "../modules/team/TeamModule";
import { BaseEntityData } from "./EntityData";

export abstract class BaseEntity
  implements
    Partial<HasHealthModule>,
    Partial<HasTeamModule>,
    Partial<HasBehaviorModule>,
    Partial<HasDropItemsOnDeathModule>,
    HasDeconstructModule,
    HasId
{
  public readonly id: Id;
  public readonly deconstruct_module: DeconstructModule = new DeconstructModule(this);

  constructor(data: BaseEntityData) {
    this.id = data.id;
  }

  public readonly health_module: IHealthModule | undefined;
  public readonly team_module: TeamModule | undefined;
  public readonly behavior_module: IBehaviorModule | undefined;
  public readonly drop_items_on_death: IDropItemsOnDeathModule | undefined;

  public abstract readonly game_space_data: DynamicPoint | StaticCollidableShape | GameSpaceStaticPoint;
}
