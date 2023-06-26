import { Resolution } from "../display/Resolution";
import { HumanInputConfig } from "../humaninput/HumanInputConfig";
import { SystemStatsManager } from "../systemstatsmanager/SystemStatsManager";
import { GameSystemData } from "./GameSystem";

export interface ClientGameSystemData extends GameSystemData {
  human_input_config: HumanInputConfig;
  resolution: Resolution;
}

export interface IClientGameSystem {
  readonly system_stats_manager: SystemStatsManager;
}
