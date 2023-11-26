import { Id, uuid } from "../../../common/Id";
import { Goblin } from "../../entities/goblin/Goblin";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { PlayerInput } from "../../gamesytemio/playerinput/PlayerInputEnum";
import { PlayerInputObserver } from "../../gamesytemio/playerinput/PlayerInputObserver";
import { GoblinPlayerDashController } from "./GoblinPlayerDashController";
import { GoblinPlayerMoveController } from "./GoblinPlayerMoveController";

export class GoblinPlayerController implements PlayerInputObserver {
  public readonly id: Id = uuid();

  protected readonly move_controller: GoblinPlayerMoveController;
  protected readonly dash_controller: GoblinPlayerDashController;

  constructor(private readonly goblin: Goblin, private readonly game_system: LocalGameSystem) {
    this.move_controller = new GoblinPlayerMoveController(this.goblin);
    this.dash_controller = new GoblinPlayerDashController(this.goblin);
  }

  public readonly on_input = (params: PlayerInput) => {
    if (
      this.move_controller.attempt_parse_move_input(params) ||
      this.dash_controller.attempt_parse_dash_input(params)
    ) {
      return;
    }

    switch (params) {
      case PlayerInput.PrimaryActionStart:
        if (this.sc_goblin_state_inner.type === "GoblinInactiveState") {
          this.sc_goblin_state_inner.snipe(this.sc_global_mouse_pos);
        }
        break;
      case PlayerInput.SecondaryActionStart:
        if (this.sc_goblin_state_inner.type === "GoblinInactiveState") {
          this.sc_goblin_state_inner.shoot_arrow(this.sc_global_mouse_pos);
        }
        break;
    }
  };

  // Shortcuts
  public get sc_goblin_state() {
    return this.goblin.behavior_module.state;
  }
  public get sc_goblin_state_inner() {
    return this.goblin.behavior_module.state.inner;
  }
  public get sc_global_mouse_pos() {
    return this.game_system.game_system_io.player_input_manager.global_mouse_pos;
  }
}
