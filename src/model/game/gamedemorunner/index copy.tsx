// import React from "react";
// import "./styles.less";
// import { safe_get_element_by_selector } from "../../../client/utils/SafeGetElementBySelector";
// import { createRoot } from "react-dom/client";

// const game_element: JSX.Element = (
//   <div>
//     <canvas id="#canvas"></canvas>
//   </div>
// );

// const dom_container = safe_get_element_by_selector("#react-dom");
// const root = createRoot(dom_container);
// root.render(game_element);

// import { Assets, Application, Sprite } from "pixi.js";
import { Application, Sprite, Assets } from "pixi.js";
// const imageSrc = require("./test.png");
// import imageSrc from './test.png';

const run = async () => {
  const app = new Application<HTMLCanvasElement>({
    width: 800,
    height: 800,
    autoDensity: false,
  });

  document.body.appendChild(app.view);

  // load the texture we need
  const texture = await Assets.load("assets/images/test.png");

  // This creates a texture from a 'bunny.png' image
  const img = new Sprite(texture);

  // Setup the position of the bunny
  img.x = app.renderer.width / 2;
  img.y = app.renderer.height / 2;

  // Rotate around the center
  img.anchor.x = 0.5;
  img.anchor.y = 0.5;

  // Add the bunny to the scene we are building
  app.stage.addChild(img);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    img.rotation += 0.001;
  });
};

run();
