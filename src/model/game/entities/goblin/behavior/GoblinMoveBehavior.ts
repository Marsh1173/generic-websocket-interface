import { GTMath } from "../../../../common/math/basic/GTMath";
import { StateObservable } from "../../../../common/observer/StateObserver";
import { IBehaviorModule } from "../../../entitymodel/modules/behavior/BehaviorModule";
import { Goblin } from "../Goblin";

const MOVE_FORCE_ID = "move-force-id";

export interface GoblinMoveBehaviorState {
  angle: number | undefined;
}

const default_move_data: GoblinMoveBehaviorState = {
  angle: undefined,
};

export class GoblinMoveBehavior extends StateObservable<GoblinMoveBehaviorState> implements IBehaviorModule {
  private move_force: number = 2.5;

  constructor(private readonly goblin: Goblin, data?: GoblinMoveBehaviorState) {
    super(data ?? default_move_data);
  }

  public update(elapsed_seconds: number): void {}

  protected update_move_forces() {
    this.goblin.game_space_data.clear_constant_velocity(MOVE_FORCE_ID);

    if (!this.goblin.behavior_module.state.allows_movement || this.state.angle === undefined) {
      return;
    }

    const v = GTMath.VectorFromAngle(this.state.angle, this.move_force);
    this.goblin.game_space_data.apply_constant_velocity(MOVE_FORCE_ID, v);
  }

  public update_state(update: GoblinMoveBehaviorState) {
    this.set_state(update);
    this.update_move_forces();
  }

  // Force Multipliers
  public apply_move_multiplier(m: number) {
    this.move_force *= m;
    this.update_move_forces();
  }
  public remove_move_multiplier(m: number) {
    this.move_force /= m;
    this.update_move_forces();
  }
}
