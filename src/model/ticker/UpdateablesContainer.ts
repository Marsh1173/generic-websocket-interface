import { HasId, Id } from "../utils/Id";
import { ITicker } from "./Ticker";

export interface Updateable extends HasId {
  update(elapsed_time: number): void;
}

export interface IUpdater {
  /**
   * Adds an updateable interface to the looper if no other updateable has been added with the same id. The looper will not start updating the updateable until "start_updating()" has been called on the id.
   * @param updateable Interface that will be registered with the looper.
   * @returns true if successful, false if not.
   */
  register_updateable(updateable: Updateable): boolean;
  /**
   * If an updateable has been registered with given id, they will start being updated.
   * @param updateable_id Id of updateable that will start being updated.
   */
  start_updating(updateable_id: Id): void;
  /**
   * If an updateable has been registered with given id, they will stop being updated.
   * @param updateable_id Id of updateable that will cease to be updated.
   */
  stop_updating(updateable_id: Id): void;
  /**
   * Removes any updateable registered with the looper with the given id, and stops updating the updateable if necessary.
   * @param updateable_id Id of updateable that will be de-registered with the looper.
   */
  remove_updateable(updateable_id: Id): void;
}

export abstract class Updater implements IUpdater {
  protected abstract readonly ticker: ITicker;

  /**
   * Map of updateables and their ids that are currently being updated.
   */
  protected updatings: Map<Id, Updateable> = new Map<Id, Updateable>();
  /**
   * Map of updateables and their ids that are not being updated.
   */
  protected not_updatings: Map<Id, Updateable> = new Map<Id, Updateable>();

  public register_updateable(updateable: Updateable): boolean {
    if (!this.updatings.has(updateable.id) && !this.not_updatings.has(updateable.id)) {
      this.not_updatings.set(updateable.id, updateable);
      return true;
    }
    return false;
  }

  public start_updating(updateable_id: Id) {
    let updateable: Updateable | undefined = this.not_updatings.get(updateable_id);
    if (updateable) {
      this.not_updatings.delete(updateable_id);
      this.updatings.set(updateable.id, updateable);

      if (!this.ticker.going) {
        this.ticker.start();
      }
    }
  }

  public stop_updating(updateable_id: Id) {
    let updateable: Updateable | undefined = this.updatings.get(updateable_id);
    if (updateable) {
      this.updatings.delete(updateable_id);
      this.not_updatings.set(updateable.id, updateable);

      if (this.updatings.size === 0) {
        this.ticker.going = false;
      }
    }
  }

  public remove_updateable(updateable_id: Id) {
    this.stop_updating(updateable_id);
    this.not_updatings.delete(updateable_id);
  }
}
