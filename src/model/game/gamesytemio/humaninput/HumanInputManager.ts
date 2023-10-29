import { Observable } from "../../../common/observer/Observer";
import { Point, StaticPoint } from "../../../common/math/geometry/Point";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { HumanInputConfig } from "./HumanInputConfig";
import { HumanInputEnum } from "./HumanInputEnum";
import { HumanInputObserver } from "./HumanInputObserver";
import { Vector3 } from "three";

export class HumanInputManager extends Observable<HumanInputObserver> {
  private readonly prev_mouse_global_pos: Point = { x: 0, y: 0 };
  private readonly mouse_screen_pos: Point = { x: 0, y: 0 };

  private input_buffer: [HumanInputEnum, boolean][] = [];
  private held_inputs: Set<HumanInputEnum> = new Set();

  constructor(protected readonly config: HumanInputConfig, protected readonly game_system: LocalGameSystem) {
    super();
    this.start_listening();
  }

  public update() {
    const global_mouse_pos: StaticPoint = this.get_global_mouse_pos_from_screen_pos(this.mouse_screen_pos);
    if (this.prev_mouse_global_pos.x !== global_mouse_pos.x || this.prev_mouse_global_pos.y !== global_mouse_pos.y) {
      this.broadcast_mouse_move(global_mouse_pos);
      this.prev_mouse_global_pos.x = global_mouse_pos.x;
      this.prev_mouse_global_pos.y = global_mouse_pos.y;
    }

    for (const [input, starting] of this.input_buffer) {
      this.broadcast_input({ input, starting });
    }
    this.input_buffer = [];
  }

  private broadcast_input = this.broadcast((o) => o.on_input);
  private broadcast_mouse_move = this.broadcast((o) => o.on_mouse_move);

  private start_listening() {
    window.oncontextmenu = (ev) => {
      // stop right click from opening context menu
      ev.preventDefault();
    };

    window.onmousemove = (ev) => {
      this.mouse_screen_pos.x = ev.x;
      this.mouse_screen_pos.y = ev.y;
    };
    window.onmousedown = (ev) => {
      this.push_input_to_buffer("Mouse" + ev.button.toString(), true);
    };
    window.onmouseup = (ev) => {
      this.push_input_to_buffer("Mouse" + ev.button.toString(), false);
    };
    window.onkeydown = (ev) => {
      this.push_input_to_buffer(ev.code, true);
    };
    window.onkeyup = (ev) => {
      this.push_input_to_buffer(ev.code, false);
    };
  }

  private push_input_to_buffer(code: string, starting: boolean) {
    const input_mapping = this.config[code];
    if (input_mapping !== undefined) {
      if (starting) {
        if (!this.held_inputs.has(input_mapping)) {
          this.input_buffer.push([input_mapping, starting]);
          this.held_inputs.add(input_mapping);
        }
      } else {
        if (this.held_inputs.has(input_mapping)) {
          this.input_buffer.push([input_mapping, starting]);
          this.held_inputs.delete(input_mapping);
        }
      }
    }
  }

  private readonly camera_vec: Vector3 = new Vector3();
  private readonly pos: Vector3 = new Vector3();

  private get_global_mouse_pos_from_screen_pos(p: StaticPoint): StaticPoint {
    const camera = this.game_system.display._3d.camera.internal;

    this.camera_vec.set((p.x / window.innerWidth) * 2 - 1, -(p.y / window.innerHeight) * 2 + 1, 0.5);

    this.camera_vec.unproject(camera);

    this.camera_vec.sub(camera.position).normalize();

    const distance = -camera.position.z / this.camera_vec.z;

    this.pos.copy(camera.position).add(this.camera_vec.multiplyScalar(distance));

    return { x: this.pos.x, y: this.pos.y };
  }

  // private get_global_mouse_pos_from_screen_pos(p: StaticPoint): StaticPoint {
  //   const camera_pos = this.game_system.display.camera.camera_center;

  //   // a vector with x and y ranging from -0.5 to 0.5, where 0,0 means the mouse is at the center of the screen
  //   const pos_proportion: StaticVector = {
  //     x: p.x / window.innerWidth - 0.5,
  //     y: p.y / window.innerHeight - 0.5,
  //   };

  //   return {
  //     x: camera_pos.x + pos_proportion.x * UnitsPerScreen.w,
  //     y: camera_pos.y + pos_proportion.y * UnitsPerScreen.h,
  //   };
  // }

  public stop_listening() {
    window.onmousemove = null;
    window.onmousedown = null;
    window.onmouseup = null;
    window.onkeydown = null;
    window.onkeyup = null;
    window.oncontextmenu = null;

    this.on_deconstruct();
  }
}
