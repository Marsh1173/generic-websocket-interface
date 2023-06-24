import { Rect } from "../physics/geometry/Rect";
import { IEntityContainer } from "../entitycontainer/EntityContainer";
import { IEntityFactory } from "../entityfactory/EntityFactory";
import { IGameStateManager } from "../gamestatemanager/GameStateManager";

export abstract class GameSystem {
  public abstract readonly entity_container: IEntityContainer;
  public abstract readonly entity_factory: IEntityFactory;
  public abstract readonly game_state_manager: IGameStateManager;

  constructor(data: GameSystemData) {}

  public update(elapsed_time: number) {
    this.handle_inputs(elapsed_time);
    this.game_state_manager.update(elapsed_time);
    this.update_all_entities(elapsed_time);
  }

  protected abstract handle_inputs(elapsed_time: number): void;
  protected abstract update_all_entities(elapsed_time: number): void;
}

export interface GameSystemData {
  map_size: Rect;
}
