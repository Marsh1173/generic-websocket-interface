import { StaticPoint, Point } from "../../../common/math/geometry/Point";
import { GTMath } from "../../../common/math/basic/GTMath";

export class GameCamera {
  private focus: StaticPoint | undefined = undefined;
  public readonly camera_center: Point = { x: 0, y: 0 };

  constructor() {}

  public set_focus(focus: StaticPoint | undefined) {
    this.focus = focus;
    if (focus) {
      this.camera_center.x = focus.x;
      this.camera_center.y = focus.y;
    }
  }

  public update(elapsed_seconds: number) {
    if (this.focus) {
      const focus_diff = GTMath.Difference(this.camera_center, {
        x: this.focus.x,
        y: this.focus.y,
      });
      if (GTMath.Magnitude(focus_diff) > 0.02) {
        const follow_delay: number = Math.min(1, elapsed_seconds * 3);
        this.camera_center.x = this.camera_center.x + focus_diff.x * follow_delay;
        this.camera_center.y = this.camera_center.y + focus_diff.y * follow_delay;
      }
    }
  }
}
