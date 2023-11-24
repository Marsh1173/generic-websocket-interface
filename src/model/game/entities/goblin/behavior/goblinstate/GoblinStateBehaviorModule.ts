import { IBehaviorModule } from "../../../../entitymodel/modules/behavior/BehaviorModule";
import { GameSystem } from "../../../../gamesystem/GameSystem";
import { Goblin } from "../../Goblin";
import { GoblinDashingState } from "./states/GoblinDashingState";
import { GoblinInactiveState } from "./states/GoblinInactiveState";
import { BaseGoblinStateData, GoblinState, GoblinStateData } from "./GoblinState";

export interface GoblinStateBehaviorData {
  state_data?: GoblinStateData;
}

export class GoblinStateBehaviorModule implements IBehaviorModule {
  public inner: GoblinState;

  public get allows_movement() {
    return this.inner.allows_movement;
  }
  public get allows_casting() {
    return this.inner.allows_casting;
  }

  constructor(
    protected readonly game_system: GameSystem,
    protected readonly goblin: Goblin,
    data: GoblinStateBehaviorData
  ) {
    this.inner = this.map_data_to_state(data.state_data ?? { type: "GoblinInactiveStateData" });
  }

  public update(elapsed_seconds: number): void {
    this.inner.update(elapsed_seconds);
  }

  public set_state(state_data: Exclude<GoblinStateData, BaseGoblinStateData>) {
    this.inner.clear_state();
    this.inner = this.map_data_to_state(state_data);
  }

  private map_data_to_state(state_data: GoblinStateData): GoblinState {
    const base_data: BaseGoblinStateData = {
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
