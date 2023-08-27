import { Observable } from "../../../common/observer/Observer";
import { Point, StaticPoint } from "../../../common/physics/geometry/Point";
import { StaticVector } from "../../../common/physics/geometry/Vector";
import { UnitsPerScreen } from "../../display/Resolution";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { HumanInputConfig } from "./HumanInputConfig";
import { HumanInputEnum } from "./HumanInputEnum";
import { HumanInputObserver } from "./HumanInputObserver";

export class HumanInputManager extends Observable<HumanInputObserver> {
  private readonly prev_mouse_global_pos: Point = { x: 0, y: 0 };
  private readonly mouse_screen_pos: Point = { x: 0, y: 0 };

  private input_buffer: HumanInputEnum[] = [];
  private held_inputs: Set<HumanInputEnum> = new Set();

  constructor(
    protected readonly config: HumanInputConfig,
    protected readonly game_system: LocalGameSystem
  ) {
    super();
    this.start_listening();
  }

  public update() {
    const global_mouse_pos: StaticPoint =
      this.get_global_mouse_pos_from_screen_pos(this.mouse_screen_pos);
    if (
      this.prev_mouse_global_pos.x !== global_mouse_pos.x ||
      this.prev_mouse_global_pos.y !== global_mouse_pos.y
    ) {
      this.broadcast_mouse_move(global_mouse_pos);
      this.prev_mouse_global_pos.x = global_mouse_pos.x;
      this.prev_mouse_global_pos.y = global_mouse_pos.y;
    }

    for (const input of this.input_buffer) {
      this.broadcast_input({ input, mouse_pos: global_mouse_pos });
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
        if (!this.held_inputs.has(input_mapping.start)) {
          this.input_buffer.push(input_mapping.start);
          this.held_inputs.add(input_mapping.start);
        }
      } else {
        if (this.held_inputs.has(input_mapping.start)) {
          this.input_buffer.push(input_mapping.end);
          this.held_inputs.delete(input_mapping.start);
        }
      }
    }
  }

  private get_global_mouse_pos_from_screen_pos(p: StaticPoint): StaticPoint {
    const camera_pos = this.game_system.display.camera.camera_center;

    // a vector with x and y ranging from -0.5 to 0.5, where 0,0 means the mouse is at the center of the screen
    const pos_proportion: StaticVector = {
      x: p.x / window.innerWidth - 0.5,
      y: p.y / window.innerHeight - 0.5,
    };

    return {
      x: camera_pos.x + pos_proportion.x * UnitsPerScreen.w,
      y: camera_pos.y + pos_proportion.y * UnitsPerScreen.h,
    };
  }

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
