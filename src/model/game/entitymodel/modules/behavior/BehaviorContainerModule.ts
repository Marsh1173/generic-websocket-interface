import { IBehaviorModule } from "./BehaviorModule";

export abstract class BehaviorContainerModule implements IBehaviorModule {
  protected abstract behaviors: IBehaviorModule[];

  public update(elapsed_seconds: number): void {
    for (const behavior of this.behaviors) {
      behavior.update(elapsed_seconds);
    }
  }

  public on_entity_deconstruct(): void {
    for (const behavior of this.behaviors) {
      behavior.on_entity_deconstruct?.();
    }
  }
}
