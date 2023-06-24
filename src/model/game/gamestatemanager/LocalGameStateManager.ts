import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { GameStateManager } from "./GameStateManager";

export class LocalGameStateManager extends GameStateManager {
  declare game_system: LocalGameSystem;
  constructor(game_system: LocalGameSystem) {
    super(game_system);
  }

  public deconstruct_game() {
    this.game_system.human_input_manager.stop_listening();
    super.deconstruct_game();
  }
}
