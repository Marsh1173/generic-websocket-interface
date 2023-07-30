import { BaseEntityData } from "../../entity/EntityData";

export interface HasBehaviorModule extends BaseEntityData {
  behavior_module: IBehaviorModule;
}

export interface IBehaviorModule {
  update(elapsed_time: number): void;
}

export abstract class BehaviorModule implements IBehaviorModule {
  public abstract update(elapsed_time: number): void;
}
