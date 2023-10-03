import { StaticPoint } from "../../../../../common/math/geometry/Point";
import { GameSystem } from "../../../../gamesystem/GameSystem";
import { HumanInputEnum } from "../../../../gamesytemio/humaninput/HumanInputEnum";
import { Goblin } from "../../Goblin";
import { GoblinDashingState, GoblinDashingStateData } from "./states/GoblinDashingState";
import { GoblinInactiveState, GoblinInactiveStateData } from "./states/GoblinInactiveState";

export interface BaseGoblinStateData {
  focus_pos: StaticPoint;
  active_inputs: Set<HumanInputEnum>;
  game_system: GameSystem;
  goblin: Goblin;
}

export type GoblinState = GoblinInactiveState | GoblinDashingState;
export type GoblinStateData = GoblinInactiveStateData | GoblinDashingStateData;

export abstract class BaseGoblinState {
  public readonly allows_movement: boolean = true;
  public readonly allows_casting: boolean = true;

  protected readonly focus_pos: StaticPoint;
  protected readonly active_inputs: Set<HumanInputEnum>;
  protected readonly game_system: GameSystem;
  protected readonly goblin: Goblin;

  constructor(data: BaseGoblinStateData) {
    this.focus_pos = data.focus_pos;
    this.active_inputs = data.active_inputs;
    this.game_system = data.game_system;
    this.goblin = data.goblin;
  }

  public abstract update(elapsed_seconds: number): void;
  public clear_state() {}
}
