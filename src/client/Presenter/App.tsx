import { AppState } from "./AppState";
import { InitializingAppState } from "./InitializingAppState";
import { ViewHandler, ViewHandlerInterface } from "../View/Views/ViewHandler";
import { ConnectingAppState } from "./ConnectingAppState";
import { LoggingInAppState } from "./LoggingInAppState";
import { ServerTalkerInterface } from "../Model/Network/ServerTalker";
import { ChatPresenter, ChatPresenterInterface } from "./ChatPresenter";

export type AppStateType =
  | "initializing"
  | "connecting"
  | "logging-in"
  | "main-menu"
  | "lobby"
  | "loading-game"
  | "game";

export class ClientApp {

  public app_state: AppState;
  private readonly view_handler: ViewHandlerInterface;
  public readonly chat_presenter: ChatPresenterInterface;

  constructor() {
    this.view_handler = new ViewHandler();
    this.chat_presenter = new ChatPresenter();
    
    /* change state to initializing */
    this.view_handler.show_initializing_view();
    this.app_state = new InitializingAppState(this);
  }

  public change_state_to_connecting() {
    this.view_handler.show_connecting_view();
    this.app_state = new ConnectingAppState(this);
  }

  public change_state_to_logging_in(server_talker: ServerTalkerInterface) {
    let app_state: LoggingInAppState = new LoggingInAppState(this, server_talker);
    this.view_handler.show_login_view(app_state);
  }

  public change_state_to_main_menu() {}
  public change_state_to_lobby() {}
  public change_state_to_loading_game() {}
  public change_state_to_game() {}
}
