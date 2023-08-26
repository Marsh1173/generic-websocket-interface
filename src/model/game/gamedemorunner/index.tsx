import { DEFAULT_HUMAN_INPUT_CONFIG } from "../gamesytemio/humaninput/HumanInputConfig";
import { LocalGameSystemData } from "../gamesystem/LocalGameSystem";
import "./styles.less";
import { ViewChanger } from "../../../client/main/ViewChanger";
import { Id, uuid } from "../../common/Id";
import { EntityData } from "../entitymodel/entity/EntityData";
import { TreeVariation } from "../entities/tree/Tree";

const goblin_id: Id = uuid();

const trees: EntityData[] = [];
for (let i: number = 0; i < 14; i++) {
  const x = (i % 7) * 230 + 200;
  const y = Math.floor(i / 7) * 300 + 300 + Math.random() * 150;
  const variation: TreeVariation = (Math.floor(Math.random() * 3) + 1) as TreeVariation;
  trees.push({
    type: "TreeData",
    game_space_data: { origin: { x: x, y: y } },
    health_module_data: { max_health: 100 },
    id: uuid(),
    variation,
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
        pos: { x: 400, y: 500 },
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
