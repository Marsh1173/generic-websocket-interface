import { HasId, Id } from "../Id";

const update_prepend_str: string = "update_";
type update_prepend = "update_";

export type StateObserver<StateType> = Partial<{
  [Property in keyof StateType as `${update_prepend}${string & Property}`]: (
    new_value: StateType[Property]
  ) => void;
}> &
  HasId & { on_dispose?(): void };

export class StateObservable<StateType extends Record<string, any>> {
  protected readonly observer_map: Map<Id, StateObserver<StateType>> =
    new Map();
  private _state: StateType;
  private readonly update_value: Record<string, (new_value: any) => void> = {};

  constructor(initial_state: StateType) {
    this._state = initial_state;

    Object.keys(initial_state).forEach((value_name) => {
      this.update_value[value_name] = (new_value: any) => {
        for (const [id, observer] of this.observer_map) {
          (
            (observer as Record<string, any>)[
              update_prepend_str + value_name
            ] as ((new_value: any) => void) | undefined
          )?.(new_value);
        }
      };
    });
  }

  protected set state(new_state: Partial<StateType>) {
    for (const key of Object.keys(new_state)) {
      if (new_state[key] !== this._state[key]) {
        this.update_value[key](new_state[key]);
      }
    }
    this._state = { ...this._state, ...new_state };
  }

  public get state() {
    return this._state;
  }

  public add_observer(observer: StateObserver<StateType>): StateType {
    this.observer_map.set(observer.id, observer);
    return this._state;
  }

  public remove_observer(id: Id): boolean {
    return this.observer_map.delete(id);
  }

  public on_dispose() {
    for (const [id, observer] of this.observer_map) {
      observer.on_dispose?.();
    }
  }
}
