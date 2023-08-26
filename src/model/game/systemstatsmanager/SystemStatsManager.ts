import { StateObservable } from "../../common/observer/StateObserver";

export interface SystemStatsManagerState {
  fps: number;
}

const TICKS_PER_UPDATE: number = 60; //approx. 1 second

export class SystemStatsManager extends StateObservable<SystemStatsManagerState> {
  constructor() {
    super({ fps: 0 });
    this.last_update_timestamp = Date.now();
  }

  private ticks_since_last_update: number = 0;
  private last_update_timestamp: number = 0;

  public update() {
    if (this.ticks_since_last_update > TICKS_PER_UPDATE) {
      const time_diff = Date.now() - this.last_update_timestamp;

      this.set_state({ fps: (1000 * TICKS_PER_UPDATE) / time_diff });

      this.ticks_since_last_update = 0;
      this.last_update_timestamp = Date.now();
    } else {
      this.ticks_since_last_update += 1;
    }
  }
}
