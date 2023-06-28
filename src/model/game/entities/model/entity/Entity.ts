import { HasId, Id, uuid } from "../../../../utils/Id";
import { HasHealthModule, IHealthModule } from "../modules/health/HealthModule";
import {
  HasMovableModule,
  IMovableModule,
} from "../modules/movable/MovableModule";
import {
  HasStationaryModule,
  IStationaryModule,
} from "../modules/stationary/StationaryModule";
import { HasTeamModule, ITeamModule } from "../modules/team/TeamModule";

export interface BaseEntityData {
  readonly id?: Id;
}

export abstract class Entity
  implements
    Partial<HasHealthModule>,
    Partial<HasStationaryModule>,
    Partial<HasMovableModule>,
    Partial<HasTeamModule>,
    HasId
{
  public readonly id: Id;
  constructor(data: BaseEntityData) {
    this.id = data.id ?? uuid();
  }

  public readonly health_module?: IHealthModule | undefined;
  public readonly stationary_module?: IStationaryModule | undefined;
  public readonly movable_module?: IMovableModule | undefined;
  public readonly team_module?: ITeamModule | undefined;
}
