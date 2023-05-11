import { IClientTalker } from "./ClientTalker";

export class UserTimeout {
  constructor(
    private readonly user: IClientTalker,
    private readonly user_name: string,
    private readonly TIMEOUT_SECONDS: number
  ) {
    this.reset_timeout_timer();
  }

  private timeout_handle: NodeJS.Timeout | undefined = undefined;
  public reset_timeout_timer() {
    if (this.timeout_handle) clearTimeout(this.timeout_handle);
    this.timeout_handle = setTimeout(() => {
      console.log(
        "Timed out after " +
          this.TIMEOUT_SECONDS.toString() +
          " seconds: " +
          this.user_name
      );
      this.user.force_close();
      this.timeout_handle = undefined;
    }, this.TIMEOUT_SECONDS * 1000);
  }

  public stop_timeout_timer() {
    if (this.timeout_handle) {
      clearTimeout(this.timeout_handle);
      this.timeout_handle = undefined;
    }
  }
}
