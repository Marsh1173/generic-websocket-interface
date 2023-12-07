import { DisplayConfig } from "../display/DisplayConfig";
import { SystemStatsManager } from "../systemstatsmanager/SystemStatsManager";
import { UserStateData } from "../userstatemanager/managers/UserState";
import { UserStateManager } from "../userstatemanager/managers/UserStateManager";
import { GameSystemData } from "./GameSystem";

export interface ClientGameSystemData extends GameSystemData {
  user_state_data: UserStateData;
  display_config: DisplayConfig;
}

export interface IClientGameSystem {
  readonly system_stats_manager: SystemStatsManager;
  readonly user_state_manager: UserStateManager;
}
