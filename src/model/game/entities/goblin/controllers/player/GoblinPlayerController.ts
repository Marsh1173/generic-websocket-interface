import { Id, uuid } from "../../../../../common/Id";
import { LocalGameSystem } from "../../../../gamesystem/LocalGameSystem";
import { PlayerInput } from "../../../../gamesytemio/playerinput/PlayerInputEnum";
import { PlayerInputObserver } from "../../../../gamesytemio/playerinput/PlayerInputObserver";
import { Goblin } from "../../Goblin";
import { GoblinPlayerMoveController } from "./GoblinPlayerMoveController";

export class GoblinPlayerController implements PlayerInputObserver {
  public readonly id: Id = uuid();

  protected readonly move_controller: GoblinPlayerMoveController;

  constructor(private readonly goblin: Goblin, private readonly game_system: LocalGameSystem) {
    this.move_controller = new GoblinPlayerMoveController(this.goblin);
    this.goblin.behavior_module.state.set_target_focus(
      this.game_system.game_system_io.player_input_manager.global_mouse_pos
    );
  }

  public readonly on_input = (params: PlayerInput) => {
    if (this.move_controller.attempt_parse_move_input(params)) {
      return;
    }

    this.goblin.behavior_module.state.on_input(params);
  };
}
