import { Goblin } from "../../entities/goblin/Goblin";
import { GameSystem } from "../../gamesystem/GameSystem";
import { UserState, UserStateData } from "./UserState";
import { DeadUserState } from "../states/DeadUserState";
import { LoadingUserState } from "../states/LoadingUserState";
import { PlayerStateData } from "../states/playerstate/PlayerState";

export abstract class UserStateManager {
  public state: UserState = new LoadingUserState();

  constructor(protected readonly game_system: GameSystem, initial_state_data: UserStateData) {
    switch (initial_state_data.type) {
      case "PlayerStateData":
        this.set_player_state(initial_state_data);
        break;
      default:
        throw new Error("You did not provide an initial user state.");
    }
  }

  public set_player_state(data: PlayerStateData) {
    this.state.leave_state();

    const goblin = this.game_system.entities.make.goblin(data.goblin_data);
    this.state = this.get_player_state(data, goblin);
  }

  protected abstract get_player_state(data: PlayerStateData, goblin: Goblin): UserState;

  public set_loading_state() {
    this.state.leave_state();

    this.state = new LoadingUserState();
  }

  protected get_loading_state(): UserState {
    return new LoadingUserState();
  }

  public set_dead_state() {
    this.state.leave_state();

    this.state = new DeadUserState();
  }

  protected get_dead_state(): UserState {
    return new DeadUserState();
  }
}
