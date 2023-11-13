import { LocalGameSystem, LocalGameSystemData } from "../gamesystem/LocalGameSystem";
import { GameSystemIO } from "./GameSystemIO";
import { PlayerInputManager } from "./playerinput/PlayerInputManager";

export class LocalGameSystemIO extends GameSystemIO {
  public readonly player_input_manager: PlayerInputManager;
  constructor(protected readonly game_system: LocalGameSystem) {
    super();

    this.player_input_manager = new PlayerInputManager(game_system);
  }

  public deconstruct() {
    this.player_input_manager.deconstruct();
  }

  public update(): void {
    this.player_input_manager.process_inputs();
  }
}
