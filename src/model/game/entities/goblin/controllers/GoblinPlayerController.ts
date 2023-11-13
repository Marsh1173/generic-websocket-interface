import { Id, uuid } from "../../../../common/Id";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { PlayerInput } from "../../../gamesytemio/playerinput/PlayerInputEnum";
import { PlayerInputObserver } from "../../../gamesytemio/playerinput/PlayerInputObserver";
import { Goblin } from "../Goblin";

export class GoblinPlayerController implements PlayerInputObserver {
  public readonly id: Id = uuid();

  constructor(private readonly goblin: Goblin, private readonly game_system: LocalGameSystem) {
    this.goblin.behavior_module.state.set_target_focus(
      this.game_system.game_system_io.player_input_manager.global_mouse_pos
    );
  }

  public readonly on_input = (params: PlayerInput) => {
    switch (params) {
      case PlayerInput.MoveUpStart:
        this.goblin.behavior_module.move.update_state({ up: true });
        break;
      case PlayerInput.MoveUpEnd:
        this.goblin.behavior_module.move.update_state({ up: false });
        break;
      case PlayerInput.MoveDownStart:
        this.goblin.behavior_module.move.update_state({
          down: true,
        });
        break;
      case PlayerInput.MoveDownEnd:
        this.goblin.behavior_module.move.update_state({
          down: false,
        });
        break;
      case PlayerInput.MoveLeftStart:
        this.goblin.behavior_module.move.update_state({
          left: true,
        });
        break;
      case PlayerInput.MoveLeftEnd:
        this.goblin.behavior_module.move.update_state({
          left: false,
        });
        break;
      case PlayerInput.MoveRightStart:
        this.goblin.behavior_module.move.update_state({
          right: true,
        });
        break;
      case PlayerInput.MoveRightEnd:
        this.goblin.behavior_module.move.update_state({
          right: false,
        });
        break;
    }
    this.goblin.behavior_module.state.on_input(params);
  };
}
