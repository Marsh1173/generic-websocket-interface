import { Rect } from "../../utils/physics/geometry/Rect";
import { IEntityContainer } from "../entitycontainer/EntityContainer";
import { IEntityFactory } from "../entityfactory/EntityFactory";
import { IGameStateManager } from "../gamestatemanager/GameStateManager";
import { Updateable } from "../../ticker/Updater";
import { HasId } from "../../utils/Id";
import { EntityData } from "../entitymodel/entity/EntityData";

export abstract class GameSystem extends HasId implements Updateable {
  public abstract readonly entity_container: IEntityContainer;
  public abstract readonly entity_factory: IEntityFactory;
  public abstract readonly game_state_manager: IGameStateManager;

  constructor(data: GameSystemData) {
    super();
  }

  public update(elapsed_seconds: number) {
    this.handle_inputs(elapsed_seconds);
    this.game_state_manager.update(elapsed_seconds);
    this.update_all_entities(elapsed_seconds);
  }

  protected cleanup() {
    // extendable observer cleanup file
  }

  protected abstract handle_inputs(elapsed_seconds: number): void;
  protected abstract update_all_entities(elapsed_seconds: number): void;
}

export interface GameSystemData {
  map_size: Rect;
  entities: EntityData[];
}
