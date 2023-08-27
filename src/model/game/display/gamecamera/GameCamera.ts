import { StaticPoint, Point } from "../../../common/physics/geometry/Point";
import { Rect } from "../../../common/physics/geometry/Rect";
import { GTMath } from "../../../common/physics/math/GTMath";
import {
  Resolution,
  ResolutionDimensions,
  UnitsPerScreen,
} from "../Resolution";

export class GameCamera {
  private focus: StaticPoint | undefined = undefined;
  public readonly camera_center: Point = { x: 0, y: 0 };

  constructor(public readonly resolution: Resolution) {}

  public set_focus(focus: StaticPoint | undefined) {
    this.focus = focus;
    if (focus) {
      this.camera_center.x = focus.x;
      this.camera_center.y = focus.y;
    }
  }

  private readonly follow_delay_const: number = 0.08;
  public update(elapsed_seconds: number) {
    if (this.focus) {
      const focus_diff = GTMath.Difference(this.camera_center, this.focus);
      this.camera_center.x += focus_diff.x * this.follow_delay_const;
      this.camera_center.y += focus_diff.y * this.follow_delay_const;
    }
  }

  public global_units_to_pixel_coords(p: StaticPoint): StaticPoint {
    return {
      x:
        ((p.x - this.camera_center.x) / UnitsPerScreen.w + 0.5) *
        ResolutionDimensions[this.resolution].w,
      y:
        ((p.y - this.camera_center.y) / UnitsPerScreen.h + 0.5) *
        ResolutionDimensions[this.resolution].h,
    };
  }
}
