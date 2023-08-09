import { Observable } from "../../../utils/observer/Observer";
import { Point } from "../../../utils/physics/geometry/Point";
import { HumanInputConfig } from "./HumanInputConfig";
import { HumanInputEnum } from "./HumanInputEnum";
import { HumanInputObserver } from "./HumanInputObserver";

export class HumanInputManager extends Observable<HumanInputObserver> {
  private readonly prev_mouse_pos: Point = { x: 0, y: 0 };
  private readonly mouse_pos: Point = { x: 0, y: 0 };

  private input_buffer: HumanInputEnum[] = [];
  private held_inputs: Set<HumanInputEnum> = new Set();

  constructor(protected readonly config: HumanInputConfig) {
    super();
    this.start_listening();
  }

  public update() {
    if (this.prev_mouse_pos.x !== this.mouse_pos.x || this.prev_mouse_pos.y !== this.mouse_pos.y) {
      this.broadcast_mouse_move(this.mouse_pos);
      this.prev_mouse_pos.x = this.mouse_pos.x;
      this.prev_mouse_pos.y = this.mouse_pos.y;
    }

    for (const input of this.input_buffer) {
      this.broadcast_input({ input, mouse_pos: this.mouse_pos });
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
      this.mouse_pos.x = ev.x;
      this.mouse_pos.y = ev.y;
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
