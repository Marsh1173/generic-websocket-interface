import { ConnectingViewInterface } from "./ConnectingViewInterface";
import { LoginViewInterface } from "./LoginViewInterface";
import { ViewInterface } from "./ViewInterface";

export type MainViewType = "connecting" | "lobbies" | "lobby" | "game" | "gameresults";

export interface MainInterface extends ViewInterface {
  show_connecting: () => ConnectingViewInterface;
  show_login: () => LoginViewInterface;
}
