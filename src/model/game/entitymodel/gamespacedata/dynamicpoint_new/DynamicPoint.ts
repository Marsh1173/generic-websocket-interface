import { Id } from "../../../../common/Id";
import { Point, StaticPoint } from "../../../../common/physics/geometry/Point";
import {
  StaticVector,
  Vector,
} from "../../../../common/physics/geometry/Vector";

export class DynamicPoint {
  protected readonly constant_velocities: Map<Id, StaticVector> = new Map();
  protected readonly position_curves: Map<
    Id,
    { curve: PositionCurve; run_time: number }
  > = new Map();

  public readonly prev_pos: Point;
  public readonly pos: Point;

  constructor(data: DynamicPointData) {
    this.prev_pos = { ...data.pos };
    this.pos = { ...data.pos };
  }

  public apply_constant_velocity(id: Id, v: StaticVector) {
    this.constant_velocities.set(id, v);
  }

  public clear_constant_velocity(id: Id) {
    this.constant_velocities.delete(id);
  }

  public apply_position_curve(id: Id, curve: PositionCurve) {
    this.position_curves.set(id, { curve, run_time: 0 });
  }

  public clear_position_curve(id: Id) {
    this.position_curves.delete(id);
  }

  public update(elapsed_seconds: number) {
    const v: Vector = { x: 0, y: 0 };

    const pos_curve_velocity =
      this.calc_position_curve_velocity(elapsed_seconds);
    const const_v_sum = this.sum_constant_velocities();

    this.prev_pos.x = this.pos.x;
    this.prev_pos.y = this.pos.y;

    this.pos.x += (pos_curve_velocity.x + const_v_sum.x) * elapsed_seconds;
    this.pos.y += (pos_curve_velocity.y + const_v_sum.y) * elapsed_seconds;
  }

  protected calc_position_curve_velocity(
    elapsed_seconds: number
  ): StaticVector {
    const result: Vector = { x: 0, y: 0 };
    const expired_curves: Id[] = [];

    for (const [curve_id, data] of this.position_curves) {
      const prev_p = data.curve.f(data.run_time);
      data.run_time = Math.min(
        data.curve.duration,
        data.run_time + elapsed_seconds
      );
      const current_p = data.curve.f(data.run_time);

      result.x += (current_p.x - prev_p.x) / elapsed_seconds;
      result.y += (current_p.y - prev_p.y) / elapsed_seconds;

      if (data.run_time >= data.curve.duration) {
        expired_curves.push(curve_id);
      }
    }

    for (const expired_curve of expired_curves) {
      this.position_curves.delete(expired_curve);
    }

    return result;
  }

  protected sum_constant_velocities(): StaticVector {
    const result: Vector = { x: 0, y: 0 };

    for (const v of this.constant_velocities.values()) {
      result.x += v.x;
      result.y += v.y;
    }

    return result;
  }
}

export interface PositionCurve {
  f(elapsed_seconds: number): StaticPoint;
  duration: number;
}

export interface DynamicPointData {
  pos: StaticPoint;
}

export interface HasDynamicPoint {
  readonly game_space_data: DynamicPoint;
}

//   export interface PositionUpdateData {
//     readonly pos: Point;
//     readonly mom?: Vector;
//   }
