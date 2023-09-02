import { StateObservable } from "../../../../common/observer/StateObserver";
import { Goblin } from "../Goblin";

const VERTICAL_MOVE_FORCE_ID = "vertical-move-force-id";
const HORIZONTAL_MOVE_FORCE_ID = "horizontal-move-force-id";

export class GoblinMoveBehavior extends StateObservable<GoblinMoveBehaviorState> {
  private readonly linear_move_force: number = 3;
  private readonly diagonal_move_force: number =
    this.linear_move_force / Math.sqrt(2);

  constructor(private readonly goblin: Goblin, data?: GoblinMoveBehaviorState) {
    super(data ?? default_move_data);
  }

  protected update_move_forces() {
    this.goblin.game_space_data.clear_constant_velocity(VERTICAL_MOVE_FORCE_ID);
    this.goblin.game_space_data.clear_constant_velocity(
      HORIZONTAL_MOVE_FORCE_ID
    );

    const horizontal =
      this.state.left === this.state.right
        ? "neither"
        : this.state.left
        ? "left"
        : "right";
    const vertical =
      this.state.up === this.state.down
        ? "neither"
        : this.state.up
        ? "up"
        : "down";

    if (horizontal !== "neither") {
      const h_force_magnitude =
        vertical === "neither"
          ? this.linear_move_force
          : this.diagonal_move_force;
      let v;
      if (horizontal === "left") {
        v = { x: -h_force_magnitude, y: 0 };
      } else {
        v = { x: h_force_magnitude, y: 0 };
      }
      this.goblin.game_space_data.apply_constant_velocity(
        HORIZONTAL_MOVE_FORCE_ID,
        v
      );
    }

    if (vertical !== "neither") {
      const v_force_magnitude =
        horizontal === "neither"
          ? this.linear_move_force
          : this.diagonal_move_force;
      let v;
      if (vertical === "up") {
        v = { x: 0, y: -v_force_magnitude };
      } else {
        v = { x: 0, y: v_force_magnitude };
      }
      this.goblin.game_space_data.apply_constant_velocity(
        VERTICAL_MOVE_FORCE_ID,
        v
      );
    }
  }

  public move_up(starting: boolean) {
    this.set_state({ up: starting });
    this.update_move_forces();
  }
  public move_down(starting: boolean) {
    this.set_state({ down: starting });
    this.update_move_forces();
  }
  public move_left(starting: boolean) {
    this.set_state({ left: starting });
    this.update_move_forces();
  }
  public move_right(starting: boolean) {
    this.set_state({ right: starting });
    this.update_move_forces();
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
