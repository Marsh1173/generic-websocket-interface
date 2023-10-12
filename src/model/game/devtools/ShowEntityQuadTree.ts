import { Graphics } from "pixi.js";
import { GlobalRect } from "../../common/math/geometry/Rect";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { GameCamera } from "../display/gamecamera/GameCamera";

export interface DebugQuadTreeData {
  dims: GlobalRect;
  children?: DebugQuadTreeData[];
  item_count?: number;
}

export namespace ShowEntityQuadTree {
  let graphics_sprite: undefined | Graphics = undefined;

  function recursive_draw_tree(data: DebugQuadTreeData, sprite: Graphics, camera: GameCamera) {
    const top_left = camera.global_units_to_pixel_coords({
      y: data.dims.top,
      x: data.dims.left,
    });
    const bottom_right = camera.global_units_to_pixel_coords({
      y: data.dims.bottom,
      x: data.dims.right,
    });

    sprite.drawRect(
      top_left.x + 1,
      bottom_right.y + 1,
      bottom_right.x - top_left.x - 2,
      top_left.y - bottom_right.y - 2
    );

    if (data.children) {
      for (const child of data.children) {
        recursive_draw_tree(child, sprite, camera);
      }
    }

    if (data.item_count) {
      for (let i: number = 1; i <= data.item_count; i++) {
        sprite.drawRect(top_left.x + i * 10, bottom_right.y + 6, 3, 3);
      }
    }
  }

  export function update(local_game_system: LocalGameSystem) {
    if (!graphics_sprite) {
      graphics_sprite = new Graphics();
      local_game_system.display.canvas.debug_manage_layers(undefined, undefined, graphics_sprite);
    }

    graphics_sprite.clear();
    graphics_sprite.beginFill(undefined, 0);
    graphics_sprite.lineStyle(2, 0x00ffff);

    const tree = local_game_system.entities.entity_points.debug_get_tree();
    recursive_draw_tree(tree, graphics_sprite, local_game_system.display.camera);

    graphics_sprite.endFill();
  }
}
