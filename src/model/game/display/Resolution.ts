import { Rect } from "../physics/geometry/Rect";

export type Resolution = "standard" | "4k" | "mini";
export const ResolutionDimensions: Record<Resolution, Rect> = {
  standard: { w: 1920, h: 1080 },
  "4k": { w: 3840, h: 2160 },
  mini: { w: 1280, h: 720 },
};
