import { StateObservable } from "../../utils/observer/StateObserver";

export interface SystemStatsManagerState {
  fps: number;
}

const TICKS_PER_UPDATE: number = 120; //roughly 2 seconds

export class SystemStatsManager extends StateObservable<SystemStatsManagerState> {
  constructor() {
    super({ fps: 0 });
    this.begin_ticks_timestamp = Date.now();
  }

  private ticks_since_last_update: number = 0;
  private begin_ticks_timestamp: number = 0;

  public update() {
    if (this.ticks_since_last_update > TICKS_PER_UPDATE) {
      const time_diff = Date.now() - this.begin_ticks_timestamp;

      this.state = { fps: (1000 * TICKS_PER_UPDATE) / time_diff };

      this.ticks_since_last_update = 0;
      this.begin_ticks_timestamp = Date.now();
    } else {
      this.ticks_since_last_update += 1;
    }
  }
}
