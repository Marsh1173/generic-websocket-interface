import { Observable, Observer } from "../../../common/observer/Observer";
import { PlayerInput } from "./PlayerInputEnum";

export type PlayerInputParams = PlayerInput;

export interface PlayerInputObserver extends Observer {
  on_input(params: PlayerInputParams): void;
}

export class PlayerInputObservable extends Observable<PlayerInputObserver> {
  public broadcast_input = this.broadcast((o) => o.on_input);
}
