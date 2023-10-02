import { Entity } from "../../entity/Entity";

export type Team = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface TeamModuleData {
  readonly team: Team;
}

export interface HasTeamModule {
  readonly team_module: TeamModule;
}

export class TeamModule {
  public readonly team: Team;

  constructor(
    public readonly entity: Entity & HasTeamModule,
    data: TeamModuleData
  ) {
    this.team = data.team;
  }
}
