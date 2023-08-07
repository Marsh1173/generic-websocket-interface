import { Id } from "../../../../utils/Id";
import { Goblin } from "../../../entities/goblin/Goblin";
import { GoblinPlayerController } from "../../../entities/goblin/controllers/GoblinPlayerController";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { PlayerState, PlayerStateData } from "./PlayerState";

export class LocalPlayerState extends PlayerState {
  protected readonly goblin_player_controller: GoblinPlayerController;
  constructor(
    goblin: Goblin,
    protected readonly game_system: LocalGameSystem,
    data: PlayerStateData
  ) {
    super(goblin, game_system, data);

    this.goblin_player_controller = new GoblinPlayerController(goblin);
    this.game_system.game_system_io.human_input_manager.add_observer(
      this.goblin_player_controller
    );
  }

  public leave_state(): void {
    super.leave_state();
    this.game_system.game_system_io.human_input_manager.remove_observer(
      this.goblin_player_controller.id
    );
  }
}
