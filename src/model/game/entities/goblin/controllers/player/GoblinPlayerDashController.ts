import { PlayerInput } from "../../../../gamesytemio/playerinput/PlayerInputEnum";
import { Goblin } from "../../Goblin";

export class GoblinPlayerDashController {
  constructor(private readonly goblin: Goblin) {}

  public attempt_parse_dash_input(input: PlayerInput): boolean {
    switch (input) {
      case PlayerInput.TertiaryActionStart:
        if (this.goblin.behavior_module.state.inner.type === "GoblinInactiveState") {
          this.goblin.behavior_module.state.inner.start_dashing();
          return true;
        } else {
          return false;
        }
      case PlayerInput.TertiaryActionEnd:
        if (this.goblin.behavior_module.state.inner.type === "GoblinDashingState") {
          this.goblin.behavior_module.state.inner.stop_dashing();
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  }
}
