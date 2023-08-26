import { Rect } from "../../utils/physics/geometry/Rect";
import { IGameStateManager } from "../gamestatemanager/GameStateManager";
import { Updateable } from "../../ticker/Updater";
import { HasId } from "../../utils/Id";
import { EntityData } from "../entitymodel/entity/EntityData";
import { GameSystemIO } from "../gamesytemio/GameSystemIO";
import { EntityHandlerApi } from "../entityhandler/EntityHandler";

export abstract class GameSystem extends HasId implements Updateable {
  public abstract readonly entities: EntityHandlerApi;

  public abstract readonly game_state_manager: IGameStateManager;
  public abstract readonly game_system_io: GameSystemIO;

  constructor(data: GameSystemData) {
    super();
  }

  public update(elapsed_seconds: number) {
    this.game_system_io.update(elapsed_seconds);
    this.game_state_manager.update(elapsed_seconds);
    this.update_all_entities(elapsed_seconds);
  }

  protected deconstruct() {
    this.game_system_io.deconstruct();
  }

  protected abstract update_all_entities(elapsed_seconds: number): void;
}

export interface GameSystemData {
  map_size: Rect;
  entities: EntityData[];
}
