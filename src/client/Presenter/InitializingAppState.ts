import { AppStateType, ClientApp } from "./App";
import { AppState } from "./AppState";

export class InitializingAppState extends AppState {
  public readonly state_type: AppStateType = "initializing";

  private done_main_rendering: boolean = false;
  private done_initializing: boolean = false;

  constructor(app: ClientApp) {
    super(app);

    this.finish_initializing();
  }

  public finish_main_rendering() {
    this.done_main_rendering = true;
    this.attempt_change_state_to_connecting();
  }
  public finish_initializing() {
    this.done_initializing = true;
    this.attempt_change_state_to_connecting();
  }

  private attempt_change_state_to_connecting() {
    if (this.done_initializing && this.done_main_rendering) {
      this.app.change_state_to_connecting();
    }
  }
}
