export interface HasBehaviorModule {
  behavior_module: IBehaviorModule;
}

export interface IBehaviorModule {
  update(elapsed_seconds: number): void;
  on_entity_deconstruct?(): void;
}
