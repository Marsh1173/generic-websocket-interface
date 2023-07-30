import { StateObservable } from "../../../../utils/observer/StateObserver";
import { Goblin } from "../Goblin";

export class GoblinMoveBehavior extends StateObservable<GoblinMoveBehaviorState> {
  constructor(private readonly goblin: Goblin, data?: GoblinMoveBehaviorState) {
    super(data ?? default_move_data);
  }

  public update() {}
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
