import { GameSystem } from "../../../../gamesystem/GameSystem";
import { Goblin } from "../../Goblin";
import { GoblinInactiveState, GoblinInactiveStateData } from "./states/GoblinInactiveState";

export interface BaseGoblinStateData {
  game_system: GameSystem;
  goblin: Goblin;
}

export type GoblinState = GoblinInactiveState;
export type GoblinStateData = GoblinInactiveStateData;

export abstract class BaseGoblinState {
  private readonly allows_movement: boolean = true;
  private readonly allows_dashing: boolean = true;
  public readonly allows_casting: boolean = true;

  protected readonly game_system: GameSystem;
  protected readonly goblin: Goblin;

  constructor(data: BaseGoblinStateData) {
    this.game_system = data.game_system;
    this.goblin = data.goblin;
  }

  public update(elapsed_seconds: number) {}
  public activate_state() {
    this.goblin.behavior_module.dash.update_state({ can_dash: this.allows_dashing });
    this.goblin.behavior_module.move.update_state({ can_move: this.allows_movement });
  }
  public clear_state() {}
}
