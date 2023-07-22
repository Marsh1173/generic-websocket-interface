import { Observable } from "../../utils/observer/Observer";
import { Point, StaticPoint } from "../../utils/physics/geometry/Point";
import { HumanInputConfig } from "./HumanInputConfig";
import { HumanInputEnum } from "./HumanInputEnum";
import { HumanInputObserver } from "./HumanInputObserver";

export interface HumanInputParams {
  event: HumanInputEnum;
  mouse_pos: StaticPoint;
}

export class HumanInputManager extends Observable<HumanInputObserver> {
  private readonly mouse_pos: Point = { x: 0, y: 0 };

  constructor(protected readonly config: HumanInputConfig) {
    super();

    window.onmousemove = (ev) => {
      this.mouse_pos.x = ev.clientX;
      this.mouse_pos.y = ev.clientY;
    };
    window.onmousedown = (ev) => {
      this.interpret_input(ev.button.toString(), true);
    };
    window.onmouseup = (ev) => {
      this.interpret_input(ev.button.toString(), false);
    };
    window.onkeydown = (ev) => {
      this.interpret_input(ev.code, true);
    };
    window.onkeyup = (ev) => {
      this.interpret_input(ev.code, false);
    };
  }

  public stop_listening() {
    window.onmousemove = null;
    window.onmousedown = null;
    window.onmouseup = null;
    window.onkeydown = null;
    window.onkeyup = null;
  }

  private interpret_input(code: string, starting: boolean) {
    const input_mapping = this.config.find((mapping) => mapping.code === code);
    if (input_mapping !== undefined) {
      if (starting) {
        this.broadcast_input(input_mapping.start);
      } else if (input_mapping.end) {
        this.broadcast_input(input_mapping.end);
      }
    }
  }

  private broadcast_input(event: HumanInputEnum) {
    this.broadcast((o) => o.on_human_input)({
      event,
      mouse_pos: this.mouse_pos,
    });
  }
}

/**
 * Input states (handled by goblin)
 *  Empty (targeting)
 *  Building (building to be placed, is valid location)
 *  Casting
 *  Inventory
 *
 */
