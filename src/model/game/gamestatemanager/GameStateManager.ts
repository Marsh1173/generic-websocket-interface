import { GameSystem } from "../gamesystem/GameSystem";
import { DayNightCycle } from "./daynightcycle/DayNightCycle";

export interface IGameStateManager {
  update(elapsed_seconds: number): void;
}

export class GameStateManager implements IGameStateManager {
  public readonly day_night_cycle: DayNightCycle = new DayNightCycle();

  constructor(protected readonly game_system: GameSystem) {}

  public update(elapsed_seconds: number): void {
    this.day_night_cycle.update(elapsed_seconds);
  }
}
