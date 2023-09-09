import { DEFAULT_HUMAN_INPUT_CONFIG } from "../gamesytemio/humaninput/HumanInputConfig";
import { LocalGameSystemData } from "../gamesystem/LocalGameSystem";
import "./styles.less";
import { ViewChanger } from "../../../client/main/ViewChanger";
import { Id, uuid } from "../../common/Id";
import { EntityData } from "../entitymodel/entity/EntityData";
import { TreeVariation } from "../entities/tree/Tree";

const goblin_id: Id = uuid();

const trees: EntityData[] = [];
for (let i: number = 0; i < 12; i++) {
  const x = (i % 4) * 4 + 2 + Math.random() * 1.5;
  const y = Math.floor(i / 4) * 4 + 3 + Math.random() * 1.5;
  const variation: TreeVariation = (Math.floor(Math.random() * 3) + 1) as TreeVariation;
  trees.push({
    type: "TreeData",
    game_space_data: { origin: { x: x, y: y } },
    health_module_data: { max_health: 100 },
    id: uuid(),
    variation,
  });
}

const sheep: EntityData[] = [];
for (let i: number = 0; i < 10; i++) {
  const x = 2 + Math.random() * 14;
  const y = 2 + Math.random() * 10;

  sheep.push({
    type: "SheepData",
    id: uuid(),
    game_space_data: {
      pos: { x, y },
    },
    health_module_data: { max_health: 100 },
  });
}

const game_data: LocalGameSystemData = {
  human_input_config: DEFAULT_HUMAN_INPUT_CONFIG,
  resolution: "standard",
  map_size: { w: 30, h: 30 },
  entities: [...sheep, ...trees],
  user_state_data: {
    type: "PlayerStateData",
    goblin_data: {
      type: "GoblinData",
      id: goblin_id,
      game_space_data: {
        pos: { x: -2, y: 0 },
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
