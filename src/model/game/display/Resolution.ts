import { Rect } from "../../common/math/geometry/Rect";
import { StaticVector } from "../../common/math/geometry/Vector";

export type Resolution = "standard" | "4k" | "mini";

export const ResolutionDimensions: Record<Resolution, Rect> = {
  "4k": { w: 3840, h: 2160 },
  standard: { w: 1920, h: 1080 },
  //   720p: { w: 1280, h: 720 },
  mini: { w: 960, h: 540 },
};

export const ResolutionScale: Record<Resolution, number> = {
  "4k": 1,
  standard: 0.5,
  mini: 0.25,
};
