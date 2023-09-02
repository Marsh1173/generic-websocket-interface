import { IBehaviorModule } from "../../../entitymodel/modules/behavior/BehaviorModule";
import { Goblin } from "../Goblin";
import {
  GoblinMoveBehavior,
  GoblinMoveBehaviorState,
} from "./GoblinMoveBehavior";

export class GoblinBehaviorModule implements IBehaviorModule {
  public readonly move: GoblinMoveBehavior;

  constructor(data: GoblinBehaviorData, goblin: Goblin) {
    this.move = new GoblinMoveBehavior(goblin, data.move);
  }

  public update(elapsed_seconds: number): void {}

  public on_entity_deconstruct(): void {
    this.move.on_deconstruct();
  }
}

export interface GoblinBehaviorData {
  move?: GoblinMoveBehaviorState;
}
