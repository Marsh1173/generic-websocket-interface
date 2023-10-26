import { StaticPoint, Point } from "../../../common/math/geometry/Point";
import { StaticVector } from "../../../common/math/geometry/Vector";
import { GTMath } from "../../../common/math/basic/GTMath";
import { DisplayConfig } from "../DisplayConfig";
import { ResolutionDimensions, UnitsPerScreen } from "../Resolution";
import { Vector3 } from "three";

export class GameCamera {
  private focus: StaticPoint | undefined = undefined;
  public readonly camera_center: Point = { x: 0, y: 0 };
  private readonly camera_offset_units: StaticVector = { x: 0, y: -1 };

  constructor(private readonly config: DisplayConfig) {}

  public set_focus(focus: StaticPoint | undefined) {
    this.focus = focus;
    if (focus) {
      this.camera_center.x = focus.x + this.camera_offset_units.x;
      this.camera_center.y = focus.y + this.camera_offset_units.y;
    }
  }

  private readonly follow_delay_const: number = 0.05;
  public update(elapsed_seconds: number) {
    if (this.focus) {
      const focus_diff = GTMath.Difference(this.camera_center, {
        x: this.focus.x + this.camera_offset_units.x,
        y: this.focus.y + this.camera_offset_units.y,
      });
      this.camera_center.x = this.camera_center.x + focus_diff.x * this.follow_delay_const;
      this.camera_center.y = this.camera_center.y + focus_diff.y * this.follow_delay_const;
    }
  }

  public global_2d_units_to_pixel_coords(p: StaticPoint): StaticPoint {
    // eventually remove
    return {
      x: ((p.x - this.camera_center.x) / UnitsPerScreen.w + 0.5) * ResolutionDimensions[this.config.res].w,
      y: ((p.y - this.camera_center.y) / UnitsPerScreen.h + 0.5) * ResolutionDimensions[this.config.res].h,
    };
  }
}
