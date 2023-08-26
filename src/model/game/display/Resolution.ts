import { Rect } from "../../common/physics/geometry/Rect";

export type Resolution = "standard" | "4k" | "mini";
export const ResolutionDimensions: Record<Resolution, Rect> = {
  "4k": { w: 3840, h: 2160 },
  standard: { w: 1920, h: 1080 },
  mini: { w: 960, h: 540 },
  //   mini: { w: 1280, h: 720 },
};
