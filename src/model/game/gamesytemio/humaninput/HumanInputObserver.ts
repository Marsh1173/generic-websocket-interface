import { Observer } from "../../../utils/observer/Observer";
import { StaticPoint } from "../../../utils/physics/geometry/Point";
import { HumanInputEnum } from "./HumanInputEnum";

export interface HumanInputObserver extends Observer {
  on_input(params: HumanInputEnum): void;
  on_mouse_move(params: StaticPoint): void;
}
