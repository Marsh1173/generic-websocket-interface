import { DisplayObject } from "pixi.js";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";

export abstract class GameSprite {
  public abstract readonly display_object: DisplayObject;
  constructor(protected readonly game_system: LocalGameSystem) {}

  public abstract update(elapsed_seconds: number): void;
  public abstract on_destroy(): void;
}
