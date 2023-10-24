import { PerspectiveCamera, Vector3 } from "three";
import { _3DDisplayConfig } from "../3D";
import { Rect } from "../../../../common/math/geometry/Rect";
import { ResolutionDimensions } from "../../Resolution";
import { StaticPoint } from "../../../../common/math/geometry/Point";
import { GTMath } from "../../../../common/math/basic/GTMath";

const FOV: number = 15;
const view_angle: number = -Math.PI / 4;
const offset = GTMath.VectorFromAngle(-view_angle, 40);

export class _3DCamera {
  public readonly internal: PerspectiveCamera;
  protected readonly camera_center: StaticPoint;

  constructor(config: _3DDisplayConfig) {
    this.camera_center = config.camera_center;

    const res: Rect = ResolutionDimensions[config.res];
    this.internal = new PerspectiveCamera(FOV, res.w / res.h, 0.1, 1000);

    this.internal.rotation.x = view_angle;
    this.internal.position.y = offset.y;
  }

  public update() {
    this.internal.position.x = this.camera_center.x;
    this.internal.position.z = this.camera_center.y + offset.x;
  }
}
