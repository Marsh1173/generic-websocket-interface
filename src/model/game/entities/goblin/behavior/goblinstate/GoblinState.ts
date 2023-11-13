import { StaticPoint } from "../../../../../common/math/geometry/Point";
import { GameSystem } from "../../../../gamesystem/GameSystem";
import { PlayerInput } from "../../../../gamesytemio/playerinput/PlayerInputEnum";
import { Goblin } from "../../Goblin";
import { GoblinDashingState, GoblinDashingStateData } from "./states/GoblinDashingState";
import { GoblinInactiveState, GoblinInactiveStateData } from "./states/GoblinInactiveState";

export interface BaseGoblinStateData {
  focus_pos: StaticPoint;
  game_system: GameSystem;
  goblin: Goblin;
}

export type GoblinState = GoblinInactiveState | GoblinDashingState;
export type GoblinStateData = GoblinInactiveStateData | GoblinDashingStateData;

export abstract class BaseGoblinState {
  public readonly allows_movement: boolean = true;
  public readonly allows_casting: boolean = true;

  protected readonly focus_pos: StaticPoint;
  protected readonly game_system: GameSystem;
  protected readonly goblin: Goblin;

  constructor(data: BaseGoblinStateData) {
    this.focus_pos = data.focus_pos;
    this.game_system = data.game_system;
    this.goblin = data.goblin;
  }

  public update(elapsed_seconds: number) {}
  public clear_state() {}

  public abstract on_input(input: PlayerInput): void;
}
