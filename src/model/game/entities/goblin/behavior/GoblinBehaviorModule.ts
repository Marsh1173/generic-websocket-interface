import { BehaviorModule } from "../../../entitymodel/modules/behavior/BehaviorModule";
import { Goblin } from "../Goblin";
import {
  GoblinMoveBehavior,
  GoblinMoveBehaviorState,
} from "./GoblinMoveBehavior";

export class GoblinBehaviorModule extends BehaviorModule {
  public readonly move: GoblinMoveBehavior;

  constructor(data: GoblinBehaviorData, goblin: Goblin) {
    super();
    this.move = new GoblinMoveBehavior(goblin, data.move);
  }
  public update(elapsed_time: number): void {
    this.move.update();
  }
}

export interface GoblinBehaviorData {
  move?: GoblinMoveBehaviorState;
}
