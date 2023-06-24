import React from "react";
import "./styles.less";
import { safe_get_element_by_selector } from "../../../client/utils/SafeGetElementBySelector";
import { createRoot } from "react-dom/client";

const game_element: JSX.Element = (
  <div>
    <canvas id="#canvas"></canvas>
  </div>
);

const dom_container = safe_get_element_by_selector("#react-dom");
const root = createRoot(dom_container);
root.render(game_element);
