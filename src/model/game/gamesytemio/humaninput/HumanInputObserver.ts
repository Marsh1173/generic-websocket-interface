import { Observer } from "../../../common/observer/Observer";
import { StaticPoint } from "../../../common/physics/geometry/Point";
import { HumanInputEnum } from "./HumanInputEnum";

export interface HumanInputParams {
  input: HumanInputEnum;
  starting: boolean;
}

export interface HumanInputObserver extends Observer {
  on_input(params: HumanInputParams): void;
  on_mouse_move(params: StaticPoint): void;
}
