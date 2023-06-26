import { Observable } from "../model/observer/Observable";
import { HasId } from "../../utils/Id";

export interface SystemStatsManagerObserver extends HasId {
  update_fps?(new_fps: number): void;
}

const TICKS_PER_UPDATE: number = 120; //roughly 2 seconds

export class SystemStatsManager extends Observable<SystemStatsManagerObserver> {
  constructor() {
    super();
    this.begin_ticks_timestamp = Date.now();
  }

  private ticks_since_last_update: number = 0;
  private begin_ticks_timestamp: number = 0;

  public update() {
    if (this.ticks_since_last_update > TICKS_PER_UPDATE) {
      const time_diff = Date.now() - this.begin_ticks_timestamp;
      this.update_fps((1000 * TICKS_PER_UPDATE) / time_diff);

      this.ticks_since_last_update = 0;
      this.begin_ticks_timestamp = Date.now();
    } else {
      this.ticks_since_last_update += 1;
    }
  }

  private readonly update_fps = this.broadcast((o) => o.update_fps);
}
