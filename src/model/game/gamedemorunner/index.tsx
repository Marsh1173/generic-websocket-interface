import { DEFAULT_HUMAN_INPUT_CONFIG } from "../gamesytemio/humaninput/HumanInputConfig";
import { LocalGameSystemData } from "../gamesystem/LocalGameSystem";
import "./styles.less";
import { ViewChanger } from "../../../client/main/ViewChanger";
import { Id, uuid } from "../../utils/Id";

const goblin_id: Id = uuid();

const game_data: LocalGameSystemData = {
  human_input_config: DEFAULT_HUMAN_INPUT_CONFIG,
  resolution: "standard",
  map_size: { w: 10, h: 10 },
  entities: [
    {
      type: "TreeData",
      game_space_data: { origin: { x: 500, y: 700 } },
      health_module_data: { max_health: 100 },
      id: uuid(),
    },
    {
      type: "TreeData",
      game_space_data: { origin: { x: 800, y: 750 } },
      health_module_data: { max_health: 100 },
      id: uuid(),
    },
  ],
  user_state_data: {
    type: "PlayerStateData",
    goblin_data: {
      type: "GoblinData",
      id: goblin_id,
      game_space_data: {
        pos: { x: 400, y: 400 },
        mom: { x: 0, y: 0 },
      },
      health_module_data: { max_health: 100 },
      behavior_data: {},
    },
  },
};

new ViewChanger().initialize({
  initial_state: {
    type: "loading-game",
    props: {
      local_game_data: game_data,
    },
  },
});
