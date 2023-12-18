import { ArrayObservable } from "../../../../common/observer/ArrayObserver";
import { GameSystem } from "../../../gamesystem/GameSystem";
import { ItemData } from "../../../items/Item";
import { Entity } from "../../entity/Entity";

export interface InventoryModuleData {}

export interface IInventoryModule {}

export interface HasInventoryModule {
  readonly health_module: IInventoryModule;
}

export class InventoryModule implements IInventoryModule {
  protected readonly size: number = 23;
  protected readonly slots: (undefined | ItemData)[] = new Array(this.size).fill(undefined);
  public readonly observable: ArrayObservable<ItemData | undefined>;

  constructor(
    public readonly entity: Entity & HasInventoryModule,
    protected readonly game_system: GameSystem,
    data: InventoryModuleData
  ) {
    this.observable = new ArrayObservable(this.slots);
  }

  /**
   * Attempts to insert an item into a given slot index, or the first available slot if none is provided.
   * Fails if inventory is full, or if index is provided yet occupied, or if item cannot be put in index
   */
  public attempt_insert(item: ItemData, maybe_index?: number): boolean {
    // when gear slots are supported, prefer gear slots for equippables.
    const index: number = maybe_index ?? this.slots.findIndex((slot) => slot === undefined);

    if (this.slots[index] !== undefined || !this.can_insert(item, index)) {
      return false;
    }

    this.slots[index] = item;
    this.observable.notify();
    return true;
  }

  /**
   * Attempts to swap index and index. Fails if indices are out of bounds or items cannot be put in indices.
   */
  public attempt_swap(index_1: number, index_2: number): boolean {
    if (index_1 >= this.size || index_2 >= this.size) {
      return false;
    }

    const at_index_1: ItemData | undefined = this.slots[index_1];
    const at_index_2: ItemData | undefined = this.slots[index_2];

    if (at_index_1 && !this.can_insert(at_index_1, index_1)) {
      return false;
    }
    if (at_index_2 && !this.can_insert(at_index_2, index_2)) {
      return false;
    }

    this.slots[index_1] = at_index_2;
    this.slots[index_2] = at_index_1;
    this.observable.notify();

    return true;
  }

  /**
   * Returns true if item can be put in index
   */
  public can_insert(item: ItemData, index: number): boolean {
    if (index > 19) {
      // we haven't coded gear items yet
      return false;
    }

    return true;
  }

  /**
   * Attempts to use an item if possible.
   */
  public attempt_use_item(index: number): boolean {
    throw new Error("Method not implemented");
  }

  /**
   * Gets all item datas. Might be useful for dying?
   */
  public get_all_items(): ItemData[] {
    return this.slots.flatMap((slot) => (slot === undefined ? [] : [slot]));
  }

  /**
   * Gets exportable data
   */
  public get_data(): [number, ItemData][] {
    return this.slots.flatMap((slot, index) => (slot === undefined ? [] : [[index, slot]]));
  }

  /**
   * API
   *
   * remove(index): ItemData | undefined
   *    Useful for throwing out items
   *
   * attempt_remove(ItemType[], commit_fn?: () => boolean): boolean
   *    Tries to remove all of an item type passed in. If possible, runs the commit function, and if that succeeds, removes the items.
   */
}
