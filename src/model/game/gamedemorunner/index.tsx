import { DEFAULT_HUMAN_INPUT_CONFIG } from "../humaninput/HumanInputConfig";
import { LocalGameSystemData } from "../gamesystem/LocalGameSystem";
import "./styles.less";
import { ViewChanger } from "../../../client/main/ViewChanger";

const game_data: LocalGameSystemData = {
  human_input_config: DEFAULT_HUMAN_INPUT_CONFIG,
  resolution: "mini",
  map_size: { w: 10, h: 10 },
};

new ViewChanger().initialize({
  initial_state: {
    type: "loading-game",
    props: {
      local_game_data: game_data,
    },
  },
});

// import { createRoot } from "react-dom/client";
// import { safe_get_element_by_selector } from "../../../client/utils/SafeGetElementBySelector";
// import React from "react";
// import { LocalGameComponent } from "../../../client/game/local/LocalGameView";
// import { DEFAULT_HUMAN_INPUT_CONFIG } from "../humaninput/HumanInputConfig";
// import { LocalGameSystemData } from "../gamesystem/LocalGameSystem";
// import "./styles.less";

// const game_data: LocalGameSystemData = {
//   human_input_config: DEFAULT_HUMAN_INPUT_CONFIG,
//   resolution: "mini",
//   map_size: { w: 10, h: 10 },
// };

// const game_component: JSX.Element = (
//   <LocalGameComponent
//     props={{
//       local_game_data: game_data,
//     }}
//   ></LocalGameComponent>
// );

// const dom_container = safe_get_element_by_selector("#react-dom");
// const root = createRoot(dom_container);
// root.render(game_component);
