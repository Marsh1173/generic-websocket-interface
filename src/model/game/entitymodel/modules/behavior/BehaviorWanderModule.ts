import { Id, uuid } from "../../../../common/Id";
import { StaticVector } from "../../../../common/physics/geometry/Vector";
import { GTMath } from "../../../../common/physics/math/GTMath";
import { IBehaviorModule } from "../../../entitymodel/modules/behavior/BehaviorModule";
import { HasDynamicPoint } from "../../gamespacedata/dynamicpoint/DynamicPoint";

export interface BehaviorWanderModuleData {
  state: "wait" | "wander";
  wander_angle: number;
  state_remaining_time: number;
}

const DEFAULT_WANDER_DATA: BehaviorWanderModuleData = {
  state: "wander",
  wander_angle: 0,
  state_remaining_time: 0,
};

export interface BehaviorWanderModuleOptions {
  readonly wait_min_time: number;
  readonly wait_time_variation: number;
  readonly wander_min_time: number;
  readonly wander_time_variation: number;
  readonly wander_velocity: number;
}

const DEFAULT_WANDER_OPTIONS: BehaviorWanderModuleOptions = {
  wait_min_time: 4,
  wait_time_variation: 5,
  wander_min_time: 1,
  wander_time_variation: 2,
  wander_velocity: 0.4,
};

export class BehaviorWanderModule implements IBehaviorModule {
  protected readonly force_id: Id = uuid();

  protected readonly options: BehaviorWanderModuleOptions;

  constructor(
    protected readonly entity: HasDynamicPoint,
    options: Partial<BehaviorWanderModuleOptions>,
    protected readonly data: BehaviorWanderModuleData = {
      ...DEFAULT_WANDER_DATA,
    }
  ) {
    this.options = { ...DEFAULT_WANDER_OPTIONS, ...options };

    if (this.data.state === "wander") {
      this.set_wander_force();
    }
  }

  public update(elapsed_seconds: number): void {
    this.data.state_remaining_time -= elapsed_seconds;

    if (this.data.state_remaining_time <= 0) {
      if (this.data.state === "wait") {
        this.switch_to_wander();
      } else {
        this.switch_to_wait();
      }
    }
  }

  protected switch_to_wander() {
    this.data.state = "wander";
    this.data.state_remaining_time =
      this.options.wander_min_time +
      Math.random() * this.options.wander_time_variation;
    this.data.wander_angle = Math.random() * Math.PI * 2;
    this.set_wander_force();
  }

  protected set_wander_force() {
    this.entity.game_space_data.apply_constant_velocity(
      this.force_id,
      GTMath.VectorFromAngle(
        this.data.wander_angle,
        this.options.wander_velocity
      )
    );
  }

  protected switch_to_wait() {
    this.data.state = "wait";
    this.data.state_remaining_time =
      this.options.wait_min_time +
      Math.random() * this.options.wait_time_variation;
    this.entity.game_space_data.clear_constant_velocity(this.force_id);
  }
}
