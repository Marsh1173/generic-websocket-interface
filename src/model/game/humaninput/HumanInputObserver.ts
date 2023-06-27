import { Observer } from "../../utils/observer/Observer";
import { HumanInputParams } from "./HumanInputManager";

export interface HumanInputObserver extends Observer {
  on_human_input(params: HumanInputParams): void;
}
