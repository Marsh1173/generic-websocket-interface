import { Resolution } from "../display/Resolution";
import { HumanInputConfig } from "../gamesytemio/humaninput/HumanInputConfig";
import { SystemStatsManager } from "../systemstatsmanager/SystemStatsManager";
import { UserStateData } from "../userstatemanager/UserState";
import { UserStateManager } from "../userstatemanager/UserStateManager";
import { GameSystemData } from "./GameSystem";

export interface ClientGameSystemData extends GameSystemData {
  human_input_config: HumanInputConfig;
  resolution: Resolution;
  user_state_data: UserStateData;
}

export interface IClientGameSystem {
  readonly system_stats_manager: SystemStatsManager;
  readonly user_state_manager: UserStateManager;
}
