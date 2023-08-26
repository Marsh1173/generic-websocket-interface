import { Goblin } from "../entities/goblin/Goblin";
import { Entity } from "../entitymodel/entity/Entity";
import { GameSystem } from "../gamesystem/GameSystem";
import { UserState, UserStateData } from "./UserState";
import { LoadingUserState } from "./states/LoadingUserState";
import { PlayerStateData } from "./states/playerstate/PlayerState";

export abstract class UserStateManager {
  public state: UserState = new LoadingUserState();

  constructor(protected readonly game_system: GameSystem, initial_state_data: UserStateData) {
    switch (initial_state_data.type) {
      case "PlayerStateData":
        this.set_player_state(initial_state_data);
        break;
    }
  }

  public set_player_state(data: PlayerStateData) {
    this.state.leave_state();

    const goblin = this.game_system.entities.make.goblin(data.goblin_data);
    this.state = this.get_player_state(data, goblin);
  }

  protected abstract get_player_state(data: PlayerStateData, goblin: Goblin): UserState;

  protected get_loading_state(): UserState {
    return new LoadingUserState();
  }
}
