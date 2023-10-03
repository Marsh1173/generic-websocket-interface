import { Rect } from "../../../common/math/geometry/Rect";
import { NearlyThreshold } from "../../../common/math/nearly/config";
import { DynamicPoint } from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";

export function ForceInsideMap(map_dimensions: Rect, physics_module: DynamicPoint) {
  if (physics_module.pos.x < 0) {
    physics_module.pos.x = 0;
  } else if (physics_module.pos.x >= map_dimensions.w) {
    physics_module.pos.x = map_dimensions.w - NearlyThreshold;
  }

  if (physics_module.pos.y < 0) {
    physics_module.pos.y = 0;
  } else if (physics_module.pos.y >= map_dimensions.h) {
    physics_module.pos.y = map_dimensions.h - NearlyThreshold;
  }
}
