import { GLOBAL_INFO } from "../Model/Caches/GlobalInfo";
import { ServerTalker, ServerTalkerInterface, ServerTalkerObserverInterface } from "../Model/Network/ServerTalker";
import { AppStateType, ClientApp } from "./App";
import { AppState } from "./AppState";

export class ConnectingAppState extends AppState {
  public readonly state_type: AppStateType = "connecting";

  private done_connecting: boolean = false;
  private server_talker: ServerTalkerInterface | undefined = undefined;

  constructor(app: ClientApp) {
    super(app);

    this.start_connecting();
  }

  public start_connecting() {

    let dummy_server_talker_observer: ServerTalkerObserverInterface = {
      id: -1,
      receive_message: () => {},
      on_server_talker_close: () => {},
      on_server_talker_open: (server_talker) => {
        this.server_talker = server_talker;
        this.attempt_change_state_to_login();
      }
    }

    let server_talker: ServerTalker = new ServerTalker([dummy_server_talker_observer]);
  }

  private attempt_change_state_to_login() {
    if (this.server_talker) {
      this.app.chat_presenter.put_chat("System", "Connected to server.");
      this.app.change_state_to_logging_in(this.server_talker);
    }
  }
}
