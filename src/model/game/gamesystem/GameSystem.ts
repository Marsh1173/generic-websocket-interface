import { Rect } from "../../common/math/geometry/Rect";
import { IGameStateManager } from "../gamestatemanager/GameStateManager";
import { HasId } from "../../common/Id";
import { EntityData } from "../entitymodel/entity/EntityData";
import { GameSystemIO } from "../gamesytemio/GameSystemIO";
import { EntityHandlerApi } from "../entityhandler/EntityHandler";
import { TickerListener } from "../../ticker/ClientTicker";
import { Map, MapData } from "../map/model/Map";

export abstract class GameSystem extends HasId implements TickerListener {
  public abstract readonly entities: EntityHandlerApi;

  public abstract readonly game_state_manager: IGameStateManager;
  public abstract readonly game_system_io: GameSystemIO;

  public readonly map: Map;

  constructor(data: GameSystemData) {
    super();

    this.map = new Map(data.map_data);
  }

  public update(elapsed_seconds: number) {
    this.game_system_io.update();
    this.game_state_manager.update(elapsed_seconds);
    this.update_all_entities(elapsed_seconds);
  }

  protected deconstruct() {
    this.game_system_io.deconstruct();
  }

  protected abstract update_all_entities(elapsed_seconds: number): void;
}

export interface GameSystemData {
  map_data: MapData;
  entities: EntityData[];
}
