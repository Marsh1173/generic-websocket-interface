import { uuid } from "../../../../common/Id";
import { Goblin } from "../../../entities/goblin/Goblin";
import { GoblinPlayerController } from "../../../entities/goblin/controllers/GoblinPlayerController";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { PlayerState, PlayerStateData } from "./PlayerState";

export class LocalPlayerState extends PlayerState {
  protected readonly goblin_player_controller: GoblinPlayerController;
  constructor(goblin: Goblin, protected readonly game_system: LocalGameSystem, data: PlayerStateData) {
    super(goblin, game_system, data);

    this.goblin_player_controller = new GoblinPlayerController(goblin, this.game_system);
    this.game_system.display.camera.set_focus(goblin.game_space_data.pos);
    this.game_system.game_system_io.player_input_manager.observable.add_observer(this.goblin_player_controller);

    this.goblin.deconstruct_module.add_observer({
      id: uuid(),
      on_observable_deconstruct: () => {
        this.game_system.user_state_manager.set_dead_state();
      },
    });
  }

  public leave_state(): void {
    super.leave_state();
    this.game_system.display.camera.set_focus(undefined);
    this.game_system.game_system_io.player_input_manager.observable.remove_observer(this.goblin_player_controller.id);
  }
}
