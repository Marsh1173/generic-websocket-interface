import { StaticPoint } from "../../../common/math/geometry/Point";
import { Observable, Observer } from "../../../common/observer/Observer";
import { PlayerInput } from "./PlayerInputEnum";

export type PlayerInputParams = PlayerInput;

export interface PlayerInputObserver extends Observer {
  on_input(params: PlayerInputParams): void;
  on_update_global_mouse_pos(params: StaticPoint): void;
}

export class PlayerInputObservable extends Observable<PlayerInputObserver> {
  public broadcast_input = this.broadcast((o) => o.on_input);
  public broadcast_global_mouse_pos = this.broadcast((o) => o.on_update_global_mouse_pos);
}
