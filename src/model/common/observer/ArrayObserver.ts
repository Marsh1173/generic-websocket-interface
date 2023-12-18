import { Observable, Observer } from "./Observer";

export interface ArrayObserver<T> extends Observer {
  on_change(items: T[]): void;
}

export class ArrayObservable<T> extends Observable<ArrayObserver<T>> {
  private _items: T[];

  constructor(initial_items: T[]) {
    super();
    this._items = initial_items;
  }

  public set_index(new_item: T, index: number): void {
    this._items[index] = new_item;
    this.notify();
  }

  public notify() {
    this.broadcast_change(this._items.slice());
  }
  private broadcast_change = this.broadcast((o) => o.on_change);

  public add_observer_and_get_state(observer: ArrayObserver<T>): T[] {
    super.add_observer(observer);
    return this._items.slice();
  }
}
