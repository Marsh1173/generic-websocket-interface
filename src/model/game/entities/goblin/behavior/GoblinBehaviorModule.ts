import { BehaviorContainerModule } from "../../../entitymodel/modules/behavior/BehaviorContainerModule";
import { IBehaviorModule } from "../../../entitymodel/modules/behavior/BehaviorModule";
import { GameSystem } from "../../../gamesystem/GameSystem";
import { Goblin } from "../Goblin";
import { GoblinDashBehavior, GoblinDashBehaviorState } from "./GoblinDashBehavior";
import { GoblinMoveBehavior, GoblinMoveBehaviorState } from "./GoblinMoveBehavior";
import { GoblinStateBehaviorData, GoblinStateBehaviorModule } from "./goblinstate/GoblinStateBehaviorModule";

export class GoblinBehaviorModule extends BehaviorContainerModule {
  public readonly move: GoblinMoveBehavior;
  public readonly dash: GoblinDashBehavior;
  public readonly state: GoblinStateBehaviorModule;

  protected behaviors: IBehaviorModule[];

  constructor(data: GoblinBehaviorData, goblin: Goblin, game_system: GameSystem) {
    super();
    this.move = new GoblinMoveBehavior(goblin, data.move);
    this.dash = new GoblinDashBehavior(goblin, data.dash);
    this.state = new GoblinStateBehaviorModule(game_system, goblin, data.state);

    this.behaviors = [this.move, this.dash, this.state];
  }
}

export interface GoblinBehaviorData {
  move?: GoblinMoveBehaviorState;
  dash?: GoblinDashBehaviorState;
  state: GoblinStateBehaviorData;
}
