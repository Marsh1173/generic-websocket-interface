import { StateObservable } from "../../../../utils/observer/StateObserver";
import { Goblin } from "../Goblin";

export class GoblinMoveBehavior extends StateObservable<GoblinMoveBehaviorState> {
  private readonly linear_move_force: number = 10;
  private readonly diagonal_move_force: number = this.linear_move_force / Math.sqrt(2);
  private readonly max_move_speed: number = 6;
  private readonly cap_division_const: number = this.linear_move_force / this.max_move_speed;

  constructor(private readonly goblin: Goblin, data?: GoblinMoveBehaviorState) {
    super(data ?? default_move_data);
  }

  public update() {
    const horizontal = this.state.left === this.state.right ? "neither" : this.state.left ? "left" : "right";
    const vertical = this.state.up === this.state.down ? "neither" : this.state.up ? "up" : "down";

    if (horizontal !== "neither") {
      const h_force_magnitude = vertical === "neither" ? this.linear_move_force : this.diagonal_move_force;
      let v;
      if (horizontal === "left") {
        v = { x: -h_force_magnitude, y: 0 };
      } else {
        v = { x: h_force_magnitude, y: 0 };
      }
      this.goblin.game_space_data.constant_act_on(v, { x: v.x / this.cap_division_const, y: 0 });
    }

    if (vertical !== "neither") {
      const v_force_magnitude = horizontal === "neither" ? this.linear_move_force : this.diagonal_move_force;
      let v;
      if (vertical === "up") {
        v = { x: 0, y: -v_force_magnitude };
      } else {
        v = { x: 0, y: v_force_magnitude };
      }
      this.goblin.game_space_data.constant_act_on(v, { x: 0, y: v.y / this.cap_division_const });
    }
  }

  public move_up(starting: boolean) {
    this.set_state({ up: starting });
  }
  public move_down(starting: boolean) {
    this.set_state({ down: starting });
  }
  public move_left(starting: boolean) {
    this.set_state({ left: starting });
  }
  public move_right(starting: boolean) {
    this.set_state({ right: starting });
  }
}

export interface GoblinMoveBehaviorState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

const default_move_data: GoblinMoveBehaviorState = {
  up: false,
  down: false,
  left: false,
  right: false,
};
