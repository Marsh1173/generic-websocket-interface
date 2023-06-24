import { GameSystem } from "../gamesystem/GameSystem";

export interface IGameStateManager {
  update(elapsed_time: number): void;
}

export class GameStateManager implements IGameStateManager {
  constructor(protected readonly game_system: GameSystem) {}

  public update(elapsed_time: number): void {}

  /**
   * ## Usage
   * All the internal game logic that runs when a game ends.
   */
  public deconstruct_game() {}
}
