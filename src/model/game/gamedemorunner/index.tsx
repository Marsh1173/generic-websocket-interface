import { LocalGameSystemData } from "../gamesystem/LocalGameSystem";
import "./styles.less";
import { ViewChanger } from "../../../client/main/ViewChanger";
import { Id, uuid } from "../../common/Id";
import { EntityData } from "../entitymodel/entity/EntityData";
import { TreeVariation } from "../entities/tree/Tree";
import { MapPresets } from "../map/presets/Presets";
import { Chunk } from "../map/model/chunk/Chunk";
import { Point } from "../../common/math/geometry/Point";

const goblin_id: Id = uuid();
const chunk_data = MapPresets.Basic;

function get_random_pos(): Point {
  return {
    x: Math.random() * chunk_data.length * Chunk.size,
    y: Math.random() * chunk_data[0].length * Chunk.size,
  };
}

const trees: EntityData[] = [];
for (let i: number = 0; i < 12; i++) {
  const pos = get_random_pos();
  const variation: TreeVariation = (Math.floor(Math.random() * 3) + 1) as TreeVariation;
  trees.push({
    type: "TreeData",
    game_space_data: { pos: { x: Math.floor(pos.x), y: Math.floor(pos.y) } },
    health_module_data: { max_health: 100 },
    id: uuid(),
    variation,
  });
}

const sheep: EntityData[] = [];
for (let i: number = 0; i < 40; i++) {
  const pos = get_random_pos();

  sheep.push({
    type: "SheepData",
    id: uuid(),
    game_space_data: {
      pos,
    },
    health_module_data: { max_health: 100 },
  });
}

const game_data: LocalGameSystemData = {
  display_config: {
    res: "standard",
  },
  map_data: { chunk_data },
  entities: [...sheep, ...trees],
  user_state_data: {
    type: "PlayerStateData",
    goblin_data: {
      type: "GoblinData",
      team_module_data: {
        team: 1,
      },
      id: goblin_id,
      game_space_data: {
        pos: get_random_pos(),
      },
      health_module_data: { max_health: 100 },
      behavior_data: { state: {} },
      inventory_module_data: {},
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
