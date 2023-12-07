import { Goblin, GoblinData } from "../../../entities/goblin/Goblin";
import { GameSystem } from "../../../gamesystem/GameSystem";
import { IUserState } from "../../managers/UserState";

export class PlayerState implements IUserState {
  public readonly type = "PlayerState";

  constructor(protected readonly goblin: Goblin, protected readonly game_system: GameSystem, data: PlayerStateData) {}

  public leave_state(): void {}
}

export interface PlayerStateData {
  readonly type: "PlayerStateData";
  readonly goblin_data: GoblinData;
}
