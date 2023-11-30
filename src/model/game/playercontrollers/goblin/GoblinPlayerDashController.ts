import { GoblinStateBehaviorModule } from "../../entities/goblin/behavior/goblinstate/GoblinStateBehaviorModule";
import { PlayerInput } from "../../gamesytemio/playerinput/PlayerInputEnum";

export class GoblinPlayerDashController {
  public attempt_parse_dash_input(input: PlayerInput, goblin_state: GoblinStateBehaviorModule): boolean {
    switch (input) {
      case PlayerInput.TertiaryActionStart:
        goblin_state.attempt_start_dashing();
        break;
      case PlayerInput.TertiaryActionEnd:
        goblin_state.attempt_stop_dashing();
        break;
      default:
        return false;
    }
    return true;
  }
}
