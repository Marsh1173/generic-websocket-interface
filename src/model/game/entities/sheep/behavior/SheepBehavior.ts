import { Id, uuid } from "../../../../common/Id";
import { StaticVector } from "../../../../common/physics/geometry/Vector";
import { IBehaviorModule } from "../../../entitymodel/modules/behavior/BehaviorModule";
import { Sheep } from "../Sheep";

export interface SheepBehaviorModuleData {
  readonly wander_countdown: number;
  readonly wander_runtime: number;
  readonly state: "waiting" | "wandering";
  readonly wander_direction: StaticVector;
}

export class SheepBehaviorModule implements IBehaviorModule {
  private wander_countdown: number = 0;
  private wander_runtime: number = 0;
  private wander_state: "waiting" | "wandering" = "wandering";
  private wander_direction: StaticVector = { x: 0, y: 0 };
  private wander_direction_id: Id = uuid();

  constructor(protected readonly sheep: Sheep, data?: SheepBehaviorModuleData) {
    if (data) {
      this.wander_countdown = data.wander_countdown;
      this.wander_runtime = data.wander_runtime;
      this.wander_state = data.state;
      this.wander_direction = data.wander_direction;
    }
  }

  public update(elapsed_seconds: number): void {
    this.wander_countdown += elapsed_seconds;

    if (this.wander_state === "waiting") {
      if (this.wander_countdown > this.wander_runtime) {
        this.wander_state = "wandering";
        this.reset_wander_countdown();
        this.reset_wander_direction();

        this.sheep.game_space_data.apply_constant_velocity(
          this.wander_direction_id,
          this.wander_direction
        );
      }
    } else {
      if (this.wander_countdown > this.wander_runtime) {
        this.wander_state = "waiting";
        this.reset_wander_countdown();

        this.sheep.game_space_data.clear_constant_velocity(
          this.wander_direction_id
        );
      }
    }
  }

  private reset_wander_countdown() {
    this.wander_countdown = 0;
    if (this.wander_state === "waiting") {
      this.wander_runtime = 3 + Math.random() * 5;
    } else {
      this.wander_runtime = 1 + Math.random();
    }
  }

  private reset_wander_direction() {
    this.wander_direction = {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
    };
  }
}
