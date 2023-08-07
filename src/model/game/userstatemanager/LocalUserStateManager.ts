import { Goblin } from "../entities/goblin/Goblin";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { LocalUserState, UserStateData } from "./UserState";
import { UserStateManager } from "./UserStateManager";
import { LocalPlayerState } from "./states/playerstate/LocalPlayerState";
import { PlayerStateData } from "./states/playerstate/PlayerState";

export class LocalUserStateManager extends UserStateManager {
  public declare state: LocalUserState;

  constructor(
    protected readonly game_system: LocalGameSystem,
    initial_state_data: UserStateData
  ) {
    super(game_system, initial_state_data);
  }

  protected get_player_state(
    data: PlayerStateData,
    goblin: Goblin
  ): LocalPlayerState {
    return new LocalPlayerState(goblin, this.game_system, data);
  }
}
