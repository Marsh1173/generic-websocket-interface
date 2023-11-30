import { StateObservable } from "../../../../common/observer/StateObserver";
import { IBehaviorModule } from "../../../entitymodel/modules/behavior/BehaviorModule";
import { Goblin } from "../Goblin";

export interface GoblinDashBehaviorState {
  is_dashing: boolean;
  can_dash: boolean;
}

const default_dash_data: GoblinDashBehaviorState = {
  is_dashing: false,
  can_dash: true,
};

export class GoblinDashBehavior extends StateObservable<GoblinDashBehaviorState> implements IBehaviorModule {
  private readonly dash_multiplier: number = 1.5;

  constructor(private readonly goblin: Goblin, data?: GoblinDashBehaviorState) {
    super(data ?? default_dash_data);
  }

  public update(elapsed_seconds: number): void {}

  public update_state(update: Partial<GoblinDashBehaviorState>) {
    const currently_actively_dashing = this.is_actively_dashing;
    const will_actively_dash = (update.can_dash ?? this.state.can_dash) && (update.is_dashing ?? this.state.is_dashing);

    if (will_actively_dash && !currently_actively_dashing) {
      this.goblin.behavior_module.move.apply_move_multiplier(this.dash_multiplier);
    } else if (!will_actively_dash && currently_actively_dashing) {
      this.goblin.behavior_module.move.remove_move_multiplier(this.dash_multiplier);
    }

    this.set_state(update);
  }

  public get is_actively_dashing(): boolean {
    return this.state.can_dash && this.state.is_dashing;
  }
}
