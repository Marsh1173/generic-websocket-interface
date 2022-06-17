import { ViewInterface } from "./ViewInterface";

export type MainViewType = "connecting" | "lobbies" | "lobby" | "game" | "gameresults";

export interface HomeInterface extends ViewInterface {
  change_page: (type: MainViewType) => void;
}
