import { GameSystem } from "../gamesystem/GameSystem";

export interface IGameStateManager {
  update(elapsed_time: number): void;
}

export class GameStateManager implements IGameStateManager {
  constructor(protected readonly game_system: GameSystem) {}

  public update(elapsed_time: number): void {}
}
