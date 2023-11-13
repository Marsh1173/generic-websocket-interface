import { Point, StaticPoint } from "../../../../../common/math/geometry/Point";
import { IBehaviorModule } from "../../../../entitymodel/modules/behavior/BehaviorModule";
import { GameSystem } from "../../../../gamesystem/GameSystem";
import { Goblin } from "../../Goblin";
import { GoblinDashingState } from "./states/GoblinDashingState";
import { GoblinInactiveState } from "./states/GoblinInactiveState";
import { BaseGoblinStateData, GoblinState, GoblinStateData } from "./GoblinState";
import { PlayerInput } from "../../../../gamesytemio/playerinput/PlayerInputEnum";

export interface GoblinStateBehaviorData {
  state_data?: GoblinStateData;
}

export class GoblinStateBehaviorModule implements IBehaviorModule {
  protected inner_state: GoblinState;

  public get allows_movement() {
    return this.inner_state.allows_movement;
  }
  public get allows_casting() {
    return this.inner_state.allows_casting;
  }

  protected target_focus_pos?: StaticPoint;
  protected readonly shared_focus_pos: Point = { x: 0, y: 0 };

  constructor(
    protected readonly game_system: GameSystem,
    protected readonly goblin: Goblin,
    data: GoblinStateBehaviorData
  ) {
    this.inner_state = this.map_data_to_state(data.state_data ?? { type: "GoblinInactiveStateData" });
  }

  public update(elapsed_seconds: number): void {
    if (this.target_focus_pos) {
      this.shared_focus_pos.x = this.target_focus_pos.x;
      this.shared_focus_pos.y = this.target_focus_pos.y;
    }

    this.inner_state.update(elapsed_seconds);
  }

  public set_state(state_data: Exclude<GoblinStateData, BaseGoblinStateData>) {
    this.inner_state.clear_state();
    this.inner_state = this.map_data_to_state(state_data);

    //update anything that could be affected by new state
    this.goblin.behavior_module.move.update_move_forces();
  }

  public on_input(input: PlayerInput) {
    this.inner_state.on_input(input);
  }

  public set_target_focus(new_focus_pos: StaticPoint | undefined) {
    this.target_focus_pos = new_focus_pos;
  }

  private map_data_to_state(state_data: GoblinStateData): GoblinState {
    const base_data = {
      focus_pos: this.shared_focus_pos,
      game_system: this.game_system,
      goblin: this.goblin,
    };

    switch (state_data.type) {
      case "GoblinDashingStateData":
        return new GoblinDashingState(base_data, state_data);
      case "GoblinInactiveStateData":
        return new GoblinInactiveState(base_data, state_data);
    }
  }
}
