import { LocalGameSystem, LocalGameSystemData } from "../gamesystem/LocalGameSystem";
import { GameSystemIO } from "./GameSystemIO";
import { HumanInputManager } from "./humaninput/HumanInputManager";

export class LocalGameSystemIO extends GameSystemIO {
  public readonly human_input_manager: HumanInputManager;
  constructor(data: LocalGameSystemData, protected readonly game_system: LocalGameSystem) {
    super();

    this.human_input_manager = new HumanInputManager(data.human_input_config, game_system);
  }

  public deconstruct() {
    this.human_input_manager.stop_listening();
  }

  public update(elapsed_seconds: number): void {
    this.human_input_manager.update();
  }
}
