import { Point, StaticPoint } from "../../../common/math/geometry/Point";
import { PlayerInputObservable } from "./PlayerInputObserver";
import { Vector3 } from "three";
import { PlayerInputMap } from "./PlayerInputMap";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";

export class PlayerInputManager {
  private readonly mouse_position_manager = new MousePositionManager();
  private readonly input_listener = new InputListener();
  public readonly observable = new PlayerInputObservable();

  constructor(protected readonly game_system: LocalGameSystem) {
    this.initialize();
  }

  public process_inputs() {
    this.set_global_mouse_pos();
    this.observable.broadcast_global_mouse_pos(this._global_mouse_pos);

    for (const [input, starting] of this.input_listener.clear_input_buffer()) {
      const player_input = (starting ? PlayerInputMap.key_down_to_input : PlayerInputMap.key_up_to_input)[input];

      if (player_input !== undefined) this.observable.broadcast_input(player_input);
    }
  }

  /**
   * {x, y} of global 3d coords that mouse is pointing at, assuming z = 0
   */
  public get global_mouse_pos(): StaticPoint {
    return this._global_mouse_pos;
  }

  /**
   * {0, 0} top left to {1, 1} bottom right of screen
   */
  public get mouse_pos(): StaticPoint {
    return this.mouse_position_manager.mouse_pos;
  }

  private initialize() {
    this.mouse_position_manager.start_listening();
    this.input_listener.start_listening();
  }

  public deconstruct() {
    this.mouse_position_manager.stop_listening();
    this.input_listener.stop_listening();
    this.observable.on_deconstruct();
  }

  private readonly _global_mouse_pos: Point = {
    x: 0,
    y: 0,
  };

  private readonly camera_vec: Vector3 = new Vector3();

  private set_global_mouse_pos() {
    const p: StaticPoint = this.mouse_position_manager.mouse_pos;
    const camera = this.game_system.display._3d.camera.internal;

    this.camera_vec.set(p.x * 2 - 1, -p.y * 2 + 1, 0.5);
    this.camera_vec.unproject(camera);
    this.camera_vec.sub(camera.position).normalize();

    const distance = -camera.position.z / this.camera_vec.z;
    const scaled_camera_vec = this.camera_vec.multiplyScalar(distance);

    this._global_mouse_pos.x = camera.position.x + scaled_camera_vec.x;
    this._global_mouse_pos.y = camera.position.y + scaled_camera_vec.y;
  }
}

/**
 * Mouse position manager
 * Watches mouse and gives pos in a x: 0-1, y: 0-1 form
 */
class MousePositionManager {
  public readonly mouse_pos: Point = { x: 0, y: 0 };

  public start_listening() {
    window.onmousemove = (ev) => {
      this.mouse_pos.x = ev.x / window.innerWidth;
      this.mouse_pos.y = ev.y / window.innerHeight;
    };
  }

  public stop_listening() {
    window.onmousemove = null;
  }
}

/**
 * Input Listener
 * Enables and disables the callbacks, pushes input to a buffer, pops all input when asked. Doesn't register repeated key-downs.
 */
class InputListener {
  private input_buffer: [string, boolean][] = [];
  private readonly active_inputs: Set<string> = new Set();

  public clear_input_buffer(): [string, boolean][] {
    const current = this.input_buffer;
    this.input_buffer = [];
    return current;
  }

  private push_input_to_buffer(code: string, starting: boolean) {
    if (starting !== this.active_inputs.has(code)) {
      this.input_buffer.push([code, starting]);

      if (starting) {
        this.active_inputs.add(code);
      } else {
        this.active_inputs.delete(code);
      }
    }
  }

  public start_listening() {
    window.oncontextmenu = (ev) => {
      // stop right click from opening context menu
      ev.preventDefault();
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

  public stop_listening() {
    window.onmousedown = window.onmouseup = window.onkeydown = window.onkeyup = window.oncontextmenu = null;
  }
}
