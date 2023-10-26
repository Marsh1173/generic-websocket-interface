import { StateObservable } from "../../../../common/observer/StateObserver";
import { IBehaviorModule } from "../../../entitymodel/modules/behavior/BehaviorModule";
import { Goblin } from "../Goblin";

const VERTICAL_MOVE_FORCE_ID = "vertical-move-force-id";
const HORIZONTAL_MOVE_FORCE_ID = "horizontal-move-force-id";

export class GoblinMoveBehavior extends StateObservable<GoblinMoveBehaviorState> implements IBehaviorModule {
  private linear_move_force: number = 3;
  private get diagonal_move_force(): number {
    return this.linear_move_force / Math.sqrt(2);
  }

  constructor(private readonly goblin: Goblin, data?: GoblinMoveBehaviorState) {
    super(data ?? default_move_data);
  }

  public update(elapsed_seconds: number): void {}

  public update_move_forces() {
    this.goblin.game_space_data.clear_constant_velocity(VERTICAL_MOVE_FORCE_ID);
    this.goblin.game_space_data.clear_constant_velocity(HORIZONTAL_MOVE_FORCE_ID);

    if (!this.goblin.behavior_module.state.allows_movement) {
      return;
    }

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
      this.goblin.game_space_data.apply_constant_velocity(HORIZONTAL_MOVE_FORCE_ID, v);
    }

    if (vertical !== "neither") {
      const v_force_magnitude = horizontal === "neither" ? this.linear_move_force : this.diagonal_move_force;
      let v;
      if (vertical === "up") {
        v = { x: 0, y: v_force_magnitude };
      } else {
        v = { x: 0, y: -v_force_magnitude };
      }
      this.goblin.game_space_data.apply_constant_velocity(VERTICAL_MOVE_FORCE_ID, v);
    }
  }

  public update_state(update: Partial<GoblinMoveBehaviorState>) {
    this.set_state(update);
    this.update_move_forces();
  }

  public apply_move_multiplier(m: number) {
    this.linear_move_force *= m;
  }

  public remove_move_multiplier(m: number) {
    this.linear_move_force /= m;
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
