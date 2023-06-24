import { Observer } from "../model/observer/Observer";
import { HumanInputParams } from "./HumanInputManager";

export interface HumanInputObserver extends Observer {
  on_human_input(params: HumanInputParams): void;
}
