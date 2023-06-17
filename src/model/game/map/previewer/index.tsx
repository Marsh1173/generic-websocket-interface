import { createRoot } from "react-dom/client";
import { safe_get_element_by_selector } from "../../../../client/utils/SafeGetElementBySelector";
import React from "react";
import "./PreviewStyles.less";
import { PerlinNoiseGenerator } from "../model/PerlinNoiseGenerator";
import { makeNoise2D, makeRectangle } from "../model/SimplexNoiseGenerator";

const map_canvas_element: JSX.Element = (
  <div>
    <canvas id="#canvas"></canvas>
  </div>
);

const dom_container = safe_get_element_by_selector("#react-dom");
const root = createRoot(dom_container);
root.render(map_canvas_element);

const run = async () => {
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 100)
  );

  const width = 100;
  const height = width;
  const res_factor = 2;

  const t_1 = 0,
    t_2 = 0.35,
    t_3 = 0.55,
    t_4 = 1;
  const v_1 = 0,
    v_2 = 0.35,
    v_3 = 0.5,
    v_4 = 1;

  const t_noise_level = 3; //8
  const v_noise_level = 5; //8

  // HTML PREP

  var canvas: HTMLCanvasElement = safe_get_element_by_selector("canvas") as HTMLCanvasElement;
  var ctx = canvas.getContext("2d")!;
  canvas.width = width * res_factor;
  canvas.height = height * res_factor;

  // CODE

  const snowy = "rgba(200,200,200,1)";
  const taiga = "rgba(150,150,150,1)";
  const plains = "rgba(50,130,70,1)";
  const forest = "rgba(30,100,50,1)";
  const desert = "rgba(189, 171, 94,1)";

  // [temperature][vegetation]
  const color_grid = [
    [snowy, snowy, taiga],
    [plains, plains, forest],
    [desert, plains, forest],
  ];

  // DRAW

  const frequency = 0.012;
  const t_octaves = 2;
  const v_octaves = 5;

  const temp_map = makeRectangle(width, height, makeNoise2D(Date.now()), { frequency, octaves: t_octaves });
  const vegetation_map = makeRectangle(width, height, makeNoise2D(Date.now()), { frequency, octaves: v_octaves });
  // const temp_map = PerlinNoiseGenerator.generate_map(width, height, t_noise_level);
  // const vegetation_map = PerlinNoiseGenerator.generate_map(width, height, v_noise_level);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      temp_map[x][y] = (temp_map[x][y] + 1) / 2;
      vegetation_map[x][y] = (vegetation_map[x][y] + 1) / 2;

      const temperature = temp_map[x][y];
      const vegetation = vegetation_map[x][y];

      const v_index = vegetation < v_3 ? (vegetation < v_2 ? 0 : 1) : 2;
      const t_index = temperature < t_3 ? (temperature < t_2 ? 0 : 1) : 2;
      ctx.fillStyle = color_grid[t_index][v_index];

      ctx.fillRect(x * res_factor, y * res_factor, res_factor, res_factor);
    }
  }

  const grid_size = 10 * res_factor;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if ((x * res_factor) % grid_size === 0 || (y * res_factor) % grid_size === 0) {
        ctx.fillStyle = "#00000022";
        ctx.fillRect(x * res_factor, y * res_factor, 1, 1);
      }
    }
  }
};

run();
