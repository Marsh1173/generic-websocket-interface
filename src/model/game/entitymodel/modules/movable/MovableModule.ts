import { HasId } from "../../../../utils/Id";
import { Point } from "../../../../utils/physics/geometry/Point";
import { Vector } from "../../../../utils/physics/geometry/Vector";
import { Entity } from "../../entity/Entity";
import { MovableObservable } from "./MovableObservable";

export interface MovableModuleData {
  readonly pos: Point;
  readonly mom?: Vector;
}

export interface IMovableModule {
  readonly observable: MovableObservable;
  readonly pos: Point;
  readonly prev_pos: Point;
  readonly mom: Vector;
  /**
   * Updates the position of an object based on their momentum and the time period of the current frame.
   * @param elapsed_seconds The amount of time passed from previous update.
   */
  update_position(elapsed_seconds: number): void;
}

export interface HasMovableModule extends HasId {
  readonly movable_module: IMovableModule;
}

export class MovableModule implements IMovableModule {
  public readonly pos: Point;
  public readonly prev_pos: Point;
  public readonly mom: Vector;

  constructor(
    public readonly observable: MovableObservable,
    public readonly entity: Entity & HasMovableModule,
    data: MovableModuleData
  ) {
    this.pos = data.pos;
    this.prev_pos = { ...data.pos };
    this.mom = data.mom ?? { x: 0, y: 0 };
  }

  protected readonly prev_mom: Vector = { x: 0, y: 0 };
  public update_position(elapsed_seconds: number) {
    this.prev_pos.x = this.pos.x;
    this.prev_pos.y = this.pos.y;

    this.pos.x += ((this.mom.x + this.prev_mom.x) * elapsed_seconds) / 2;
    this.pos.y += ((this.mom.y + this.prev_mom.y) * elapsed_seconds) / 2;

    this.prev_mom.x = this.mom.x;
    this.prev_mom.y = this.mom.y;
  }
}
