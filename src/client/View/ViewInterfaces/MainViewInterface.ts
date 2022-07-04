import { ViewInterface } from "./ViewInterface";

export interface MainViewInterface extends ViewInterface {
  show_connecting_view: () => void;
  show_logging_in_view: () => void;
}
