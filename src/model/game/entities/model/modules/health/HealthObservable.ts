import { Id } from "../../../../../utils/Id";
import { Observer, Observable } from "../../../../../utils/observer/Observer";

export interface OnLoseHealthParams {
  new_health: number;
  old_health: number;
  issuer_id?: Id;
}

export interface OnGainHealthParams extends OnLoseHealthParams {
  new_health: number;
  old_health: number;
  issuer_id?: Id;
}

export interface OnDieParams {
  killer_id?: Id;
}

export interface HealthObserver extends Observer {
  on_lose_health?(params: OnLoseHealthParams): void;
  on_gain_health?(params: OnGainHealthParams): void;
  on_die?(params: OnDieParams): void;
}

export class HealthObservable extends Observable<HealthObserver> {
  public readonly on_lose_health = this.broadcast((o) => o.on_lose_health);
  public readonly on_gain_health = this.broadcast((o) => o.on_gain_health);
  public readonly on_die = this.broadcast((o) => o.on_die);
}
