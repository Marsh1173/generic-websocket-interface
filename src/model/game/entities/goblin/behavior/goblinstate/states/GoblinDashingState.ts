import { PlayerInput } from "../../../../../gamesytemio/playerinput/PlayerInputEnum";
import { BaseGoblinState, BaseGoblinStateData } from "../GoblinState";

export class GoblinDashingState extends BaseGoblinState {
  public readonly type = "GoblinDashingState";
  private readonly dash_multiplier: number = 1.5;

  public readonly allows_casting: boolean = false;

  constructor(base_data: BaseGoblinStateData, data: GoblinDashingStateData) {
    super(base_data);
    this.goblin.behavior_module.move.apply_move_multiplier(this.dash_multiplier);
  }

  public clear_state(): void {
    super.clear_state();
    this.goblin.behavior_module.move.remove_move_multiplier(this.dash_multiplier);
  }

  public on_input(input: PlayerInput): void {
    switch (input) {
      case PlayerInput.TertiaryActionEnd:
        this.goblin.behavior_module.state.set_state({
          type: "GoblinInactiveStateData",
        });
        break;
    }
  }
}

export interface GoblinDashingStateData {
  type: "GoblinDashingStateData";
}
