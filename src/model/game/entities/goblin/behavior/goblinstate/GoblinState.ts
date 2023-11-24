import { GameSystem } from "../../../../gamesystem/GameSystem";
import { Goblin } from "../../Goblin";
import { GoblinDashingState, GoblinDashingStateData } from "./states/GoblinDashingState";
import { GoblinInactiveState, GoblinInactiveStateData } from "./states/GoblinInactiveState";

export interface BaseGoblinStateData {
  game_system: GameSystem;
  goblin: Goblin;
}

export type GoblinState = GoblinInactiveState | GoblinDashingState;
export type GoblinStateData = GoblinInactiveStateData | GoblinDashingStateData;

export abstract class BaseGoblinState {
  public readonly allows_movement: boolean = true;
  public readonly allows_casting: boolean = true;

  protected readonly game_system: GameSystem;
  protected readonly goblin: Goblin;

  constructor(data: BaseGoblinStateData) {
    this.game_system = data.game_system;
    this.goblin = data.goblin;
  }

  public update(elapsed_seconds: number) {}
  public clear_state() {}
}
