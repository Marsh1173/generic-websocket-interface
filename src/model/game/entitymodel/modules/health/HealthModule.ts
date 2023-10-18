import { Id } from "../../../../common/Id";
import { GameSystem } from "../../../gamesystem/GameSystem";
import { Entity } from "../../entity/Entity";
import { HealthObservable } from "./HealthObservable";

export interface HealthModuleData {
  readonly max_health: number;
  readonly current_health?: number;
}

export interface IHealthModule {
  readonly observable: HealthObservable;
  readonly max_health: number;
  current_health: number;
  receive_damage(params: ReceiveDamageData): ReceiveDamageReturnData;
  receive_heal(params: ReceiveHealData): void;
}

export interface HasHealthModule {
  readonly health_module: IHealthModule;
}

export class HealthModule implements IHealthModule {
  public readonly max_health: number;
  public current_health: number;

  constructor(
    public readonly observable: HealthObservable,
    public readonly entity: Entity & HasHealthModule,
    protected readonly game_system: GameSystem,
    data: HealthModuleData
  ) {
    this.max_health = data.max_health;
    this.current_health = data.current_health ?? data.max_health;
  }

  public receive_damage(params: ReceiveDamageData): ReceiveDamageReturnData {
    const old_health = this.current_health;
    this.current_health = Math.max(this.current_health - params.amount, 0);

    this.observable.on_lose_health({
      issuer_id: params.issuer_id,
      new_health: this.current_health,
      old_health,
    });

    if (this.current_health <= 0) {
      this.die(params.issuer_id);
    }

    return { killed: this.current_health === 0 };
  }

  public receive_heal(params: ReceiveHealData) {
    const old_health = this.current_health;
    this.current_health = Math.min(this.current_health + params.amount, this.max_health);

    this.observable.on_gain_health({
      issuer_id: params.issuer_id,
      new_health: this.current_health,
      old_health,
    });
  }

  private die(killer_id?: Id) {
    this.observable.on_die({ killer_id });

    this.entity.drop_items_on_death?.drop_items(this.entity.game_space_data.pos);
    this.game_system.entities.remove(this.entity);
  }
}

export interface ReceiveDamageData {
  issuer_id?: Id;
  amount: number;
}

export interface ReceiveDamageReturnData {
  killed: boolean;
}

export interface ReceiveHealData {
  issuer_id?: Id;
  amount: number;
}
