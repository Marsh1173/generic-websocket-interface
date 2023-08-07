export interface HasBehaviorModule {
  behavior_module: IBehaviorModule;
}

export interface IBehaviorModule {
  update(elapsed_seconds: number): void;
}

export abstract class BehaviorModule implements IBehaviorModule {
  public abstract update(elapsed_seconds: number): void;
}
