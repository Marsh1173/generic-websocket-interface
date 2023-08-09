import { DEFAULT_HUMAN_INPUT_CONFIG } from "../gamesytemio/humaninput/HumanInputConfig";
import { LocalGameSystemData } from "../gamesystem/LocalGameSystem";
import "./styles.less";
import { ViewChanger } from "../../../client/main/ViewChanger";
import { Id, uuid } from "../../utils/Id";
import { EntityData } from "../entitymodel/entity/EntityData";

const goblin_id: Id = uuid();

const trees: EntityData[] = [];
for (let i: number = 0; i < 30; i++) {
  const x = (i % 10) * 170 + 200;
  const y = Math.floor(i / 10) * 300 + 300;
  trees.push({
    type: "TreeData",
    game_space_data: { origin: { x: x, y: y } },
    health_module_data: { max_health: 100 },
    id: uuid(),
  });
}

const game_data: LocalGameSystemData = {
  human_input_config: DEFAULT_HUMAN_INPUT_CONFIG,
  resolution: "standard",
  map_size: { w: 10, h: 10 },
  entities: trees,
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
