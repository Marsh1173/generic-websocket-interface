import { Entity, EntityData } from "../../entity/Entity";

export type Team = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface TeamModuleData extends EntityData {
  readonly team: Team;
}

export interface ITeamModule {
  readonly team: Team;
}

export interface HasTeamModule {
  readonly team_module: ITeamModule;
}

export class TeamModule implements ITeamModule {
  public readonly team: Team;

  constructor(
    public readonly entity: Entity & HasTeamModule,
    data: TeamModuleData
  ) {
    this.team = data.team;
  }
}
