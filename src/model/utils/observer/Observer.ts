import { HasId, Id } from "../Id";

export interface Observer extends HasId {
  on_deconstruct?(): void;
}

export abstract class Observable<ObserverType extends Observer> {
  protected readonly observer_map: Map<Id, ObserverType> = new Map();

  public add_observer(observer: ObserverType) {
    this.observer_map.set(observer.id, observer);
  }

  public remove_observer(id: Id): boolean {
    return this.observer_map.delete(id);
  }

  protected broadcast<ParamsType>(
    f: (observer: ObserverType) => ((params: ParamsType) => void) | undefined
  ) {
    return (params: ParamsType) => {
      for (const [id, observer] of this.observer_map) {
        f(observer)?.(params);
      }
    };
  }

  public readonly on_deconstruct = this.broadcast((o) => o.on_deconstruct);
}
