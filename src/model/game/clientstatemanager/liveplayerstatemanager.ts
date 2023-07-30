import { Id } from "../../utils/Id";
import { Goblin } from "../entities/goblin/Goblin";

export interface LivePlayerStateData {
  readonly type: "LivePlayerStateData";
  readonly goblin_player_id: Id;
}

export class LivePlayerStateManager {
  public readonly type = "LivePlayerStateManager";

  constructor(goblin: Goblin) {}
}
