import { Id } from "../utils/Id";
import { ITicker } from "./Ticker";
import { Updateable } from "./Updater";

export class ClientTicker implements ITicker {
  constructor(protected readonly updatings: Map<Id, Updateable>) {}

  private readonly max_tick_secs: number = 1 / 2;

  public going: boolean = false;
  public start() {
    if (this.going) {
      return;
    }

    this.going = true;
    window.requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  public stop() {
    if (!this.going) return;
    this.going = false;
  }

  private last_frame: number = 0;
  private loop(timestamp: number) {
    if (!this.going) {
      return;
    }

    const elapsedTime = Math.min(
      timestamp - this.last_frame,
      this.max_tick_secs
    );
    this.last_frame = timestamp;

    this.update_all(elapsedTime);
    window.requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  private update_all(elapsed_time: number) {
    for (const [id, updating] of this.updatings) {
      updating.update(elapsed_time);
    }
  }
}
