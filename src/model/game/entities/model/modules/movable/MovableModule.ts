import { Point } from "../../../../physics/geometry/Point";
import { Vector } from "../../../../physics/geometry/Vector";
import { Entity, EntityData } from "../../entity/Entity";
import { HasStationaryModule } from "../stationary/StationaryModule";
import { MovableObservable } from "./MovableObservable";

export interface PositionUpdateData {
  readonly pos: Point;
  readonly mom?: Vector;
}

export interface MovableModuleData extends EntityData {
  readonly pos: Point;
  readonly mom?: Vector;
}

export interface IMovableModule {
  readonly observable: MovableObservable;
  readonly pos: Point;
  readonly mom: Vector;

  /**
   * Updates the position of an object based on their momentum and the time period of the current frame.
   * @param elapsed_seconds The amount of time passed from previous update.
   */
  update_position(elapsed_seconds: number): void;
  /**
   * Overwrites the position and momentum of the object with the position and momentum passed in.
   * @param data New position vector and optional momentum vector.
   */
  process_pos_mom_delta(data: PositionUpdateData): void;
  /**
   * Exerts a force on the object for the time period of the current frame.
   * @param force Force vector
   * @param cap The force will not bring the momentum outside of the cap
   */
  constant_act_on(force: Vector, cap?: Vector): void;
  /**
   * Adds the force directly to the momentum of the object.
   * @param force Force vector
   */
  instant_act_on(force: Vector): void;
}

export interface HasMovableModule {
  readonly movable_module: IMovableModule;
}

export class MovableModule implements IMovableModule {
  public readonly pos: Point;
  public readonly mom: Vector;

  /**
   * [force, cap]
   */
  private constant_forces: [Vector, Vector][] = [];
  private readonly previous_mom: Vector = { x: 0, y: 0 };

  protected friction_const: number;

  constructor(
    public readonly observable: MovableObservable,
    protected readonly entity: Entity & HasMovableModule,
    data: MovableModuleData,
    options: {
      friction_const?: number;
    }
  ) {
    this.pos = data.pos;
    this.mom = data.mom ?? { x: 0, y: 0 };

    this.friction_const = options.friction_const ?? 3000;
  }

  public update_position(elapsed_seconds: number) {
    this.apply_friction(elapsed_seconds);
    this.apply_constant_forces(elapsed_seconds);

    this.pos.x += ((this.mom.x + this.previous_mom.x) * elapsed_seconds) / 2;
    this.pos.y += ((this.mom.y + this.previous_mom.y) * elapsed_seconds) / 2;

    this.previous_mom.x = this.mom.x;
    this.previous_mom.y = this.mom.y;
  }

  public instant_act_on(force: Vector): void {
    this.mom.x += force.x;
    this.mom.y += force.y;

    this.previous_mom.x = this.mom.x;
    this.previous_mom.y = this.mom.y;
  }

  public process_pos_mom_delta(data: PositionUpdateData) {
    this.pos.x = data.pos.x;
    this.pos.y = data.pos.y;

    if (data.mom) {
      this.mom.x = data.mom.x;
      this.mom.y = data.mom.y;

      this.previous_mom.x = data.mom.x;
      this.previous_mom.y = data.mom.y;
    }
  }

  protected apply_friction(elapsed_seconds: number) {
    if (this.mom.x != 0 || this.mom.y != 0) {
      let len: number = Math.sqrt(this.mom.x ** 2 + this.mom.y ** 2);
      let normalized_anti_momentum: Vector = {
        x: (this.mom.x * this.friction_const * elapsed_seconds) / len,
        y: (this.mom.y * this.friction_const * elapsed_seconds) / len,
      };
      if (this.mom.x > 0) {
        this.mom.x = Math.max(0, this.mom.x - normalized_anti_momentum.x);
      } else if (this.mom.x < 0) {
        this.mom.x = Math.min(0, this.mom.x - normalized_anti_momentum.x);
      }
      if (this.mom.y > 0) {
        this.mom.y = Math.max(0, this.mom.y - normalized_anti_momentum.y);
      } else if (this.mom.y < 0) {
        this.mom.y = Math.min(0, this.mom.y - normalized_anti_momentum.y);
      }
    }
  }

  public constant_act_on(force: Vector, cap: Vector = { x: 0, y: 0 }) {
    this.constant_forces.push([force, cap]);
  }

  protected apply_constant_forces(elapsed_seconds: number) {
    if (this.constant_forces.length == 0) {
      return;
    }

    let positive_xs: [number, number][] = [];
    let negative_xs: [number, number][] = [];
    let positive_ys: [number, number][] = [];
    let negative_ys: [number, number][] = [];

    let new_x_force = 0,
      new_y_force = 0;

    this.constant_forces.forEach(([force, cap]) => {
      if (force.x > 0 && cap.x > 0 && cap.x >= this.mom.x) {
        positive_xs.push([force.x * elapsed_seconds, cap.x - this.mom.x]);
      } else if (force.x < 0 && cap.x < 0 && cap.x <= this.mom.x) {
        negative_xs.push([force.x * elapsed_seconds, cap.x - this.mom.x]);
      } else if (cap.x == 0) {
        new_x_force += force.x * elapsed_seconds;
      }
      if (force.y > 0 && cap.y > 0 && cap.y >= this.mom.y) {
        positive_ys.push([force.y * elapsed_seconds, cap.y - this.mom.y]);
      } else if (force.y < 0 && cap.y < 0 && cap.y <= this.mom.y) {
        negative_ys.push([force.y * elapsed_seconds, cap.y - this.mom.y]);
      } else if (cap.y == 0) {
        new_y_force += force.y * elapsed_seconds;
      }
    });

    if (
      positive_xs.length == 0 &&
      positive_ys.length == 0 &&
      negative_xs.length == 0 &&
      negative_ys.length == 0 &&
      new_x_force == 0 &&
      new_y_force == 0
    ) {
      return; // returns false if no constant force affected the momentum
    }

    let [pxf, pxo] = this.get_force_and_overflow(positive_xs, false);
    let [nxf, nxo] = this.get_force_and_overflow(negative_xs, true);
    let [pyf, pyo] = this.get_force_and_overflow(positive_ys, false);
    let [nyf, nyo] = this.get_force_and_overflow(negative_ys, true);

    new_x_force += Math.max(nxf, Math.min(pxf + pxo + nxf + nxo, pxf));
    new_y_force += Math.max(nyf, Math.min(pyf + pyo + nyf + nyo, pyf));

    this.mom.x += new_x_force;
    this.mom.y += new_y_force;

    this.constant_forces = [];
  }

  protected get_force_and_overflow(
    pairs: [number, number][],
    is_negative: boolean
  ): [number, number] {
    let force = 0,
      overflow = 0;
    pairs.sort(([x1, c1], [x2, c2]) => (!is_negative ? c1 - c2 : c2 - c1));
    pairs.forEach(([x, c]) => {
      if ((x > c && !is_negative) || (x < c && is_negative)) {
        force += c;
        overflow += x - c;
      } else {
        force += x;
      }
    });
    return [force, overflow];
  }
}
