import { BehaviorContainerModule } from "../../../entitymodel/modules/behavior/BehaviorContainerModule";
import { IBehaviorModule } from "../../../entitymodel/modules/behavior/BehaviorModule";
import { GameSystem } from "../../../gamesystem/GameSystem";
import { Goblin } from "../Goblin";
import {
  GoblinMoveBehavior,
  GoblinMoveBehaviorState,
} from "./GoblinMoveBehavior";
import {
  GoblinStateBehaviorData,
  GoblinStateBehaviorModule,
} from "./goblinstate/GoblinStateBehaviorModule";

export class GoblinBehaviorModule extends BehaviorContainerModule {
  public readonly move: GoblinMoveBehavior;
  public readonly state: GoblinStateBehaviorModule;
  protected behaviors: IBehaviorModule[];

  constructor(
    data: GoblinBehaviorData,
    goblin: Goblin,
    game_system: GameSystem
  ) {
    super();
    this.move = new GoblinMoveBehavior(goblin, data.move);
    this.state = new GoblinStateBehaviorModule(game_system, goblin, data.state);

    this.behaviors = [this.move, this.state];
  }
}

export interface GoblinBehaviorData {
  move?: GoblinMoveBehaviorState;
  state: GoblinStateBehaviorData;
}
