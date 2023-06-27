import { Rect } from "../physics/geometry/Rect";
import { IEntityContainer } from "../entitycontainer/EntityContainer";
import { IEntityFactory } from "../entityfactory/EntityFactory";
import { IGameStateManager } from "../gamestatemanager/GameStateManager";
import { Updateable } from "../../ticker/Updater";
import { HasId } from "../../utils/Id";

export abstract class GameSystem extends HasId implements Updateable {
  public abstract readonly entity_container: IEntityContainer;
  public abstract readonly entity_factory: IEntityFactory;
  public abstract readonly game_state_manager: IGameStateManager;

  constructor(data: GameSystemData) {
    super();
  }

  public update(elapsed_time: number) {
    this.handle_inputs(elapsed_time);
    this.game_state_manager.update(elapsed_time);
    this.update_all_entities(elapsed_time);
  }

  protected cleanup() {}

  protected abstract handle_inputs(elapsed_time: number): void;
  protected abstract update_all_entities(elapsed_time: number): void;
}

export interface GameSystemData {
  map_size: Rect;
}
