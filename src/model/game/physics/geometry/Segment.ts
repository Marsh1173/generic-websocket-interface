import { GTMath } from "../math/GTMath";
import { StaticPoint } from "./Point";

export class Segment {
  /**
   * Angle in radians to p2, assuming p1 is the origin and 0r is pointing right.
   */
  public readonly angle: number;
  public readonly length: number;
  constructor(
    public readonly p1: StaticPoint,
    public readonly p2: StaticPoint
  ) {
    this.length = GTMath.Distance(p1, p2);
    this.angle = GTMath.Angle(p1, p2);
  }
}
