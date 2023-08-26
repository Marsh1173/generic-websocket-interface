import { LocalEntityHandler } from "../LocalEntityHandler";
import { EntityFinder } from "./EntityFinder";

export class LocalEntityFinder extends EntityFinder {
  constructor(protected readonly handler: LocalEntityHandler) {
    super(handler);
  }
  public readonly selectables = {
    /**
     * @returns a sorted list of Select modules within selection range, ordered closest to furthest.
     */
    by_proximity() {
      throw new Error("Not implemented yet");
    },
  };
}
