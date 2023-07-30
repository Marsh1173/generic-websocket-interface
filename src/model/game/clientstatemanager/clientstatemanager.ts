import { Goblin } from "../entities/goblin/Goblin";
import { Entity } from "../entitymodel/entity/Entity";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { ErrorStateManager } from "./errorstatemanager";
import {
  LivePlayerStateData,
  LivePlayerStateManager,
} from "./liveplayerstatemanager";

export class ClientStateManager {
  public state: ClientState;

  constructor(
    initial_data: ClientStateData,
    private readonly game_system: LocalGameSystem
  ) {
    switch (initial_data.type) {
      case "LivePlayerStateData":
        this.state = this.get_live_player_state(initial_data);
        break;
    }
  }

  public set_to_live_player_state(data: LivePlayerStateData) {
    this.state = this.get_live_player_state(data);
  }

  private get_live_player_state(data: LivePlayerStateData): ClientState {
    const possible_entity: Entity | undefined =
      this.game_system.entity_container.get_by_id(data.goblin_player_id);
    if (possible_entity && possible_entity.type === "Goblin") {
      return new LivePlayerStateManager(possible_entity);
    } else {
      return this.get_error_state();
    }
  }

  private get_error_state(): ClientState {
    return new ErrorStateManager();
  }
}

export type ClientState = LivePlayerStateManager | ErrorStateManager;

export type ClientStateData = LivePlayerStateData;
