import { Ticker } from "./Ticker";

export class ServerTicker extends Ticker {
  protected tick_duration_ms: number = 16;

  private interval_id?: NodeJS.Timeout;

  protected start_tick_function(): void {
    this.interval_id = setInterval(() => {
      this.tick(Date.now());
    }, this.tick_duration_ms);
  }
  protected continue_tick_function(): void {
    return;
  }
  protected stop_tick_function(): void {
    if (this.interval_id) {
      clearInterval(this.interval_id);
      this.interval_id = undefined;
    }
  }

  /* SINGLETON IMPLEMENTATION */
  private static instance: ServerTicker | undefined;
  public static get_instance(): ServerTicker {
    if (!ServerTicker.instance) {
      ServerTicker.instance = new ServerTicker();
    }
    return ServerTicker.instance;
  }

  private constructor() {
    super();
  }
}
