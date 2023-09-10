import { Rect } from "../../common/physics/geometry/Rect";
import { StaticVector } from "../../common/physics/geometry/Vector";

export type Resolution = "standard" | "4k" | "mini";

export const ResolutionDimensions: Record<Resolution, Rect> = {
  "4k": { w: 3840, h: 2160 },
  standard: { w: 1920, h: 1080 },
  //   720p: { w: 1280, h: 720 },
  mini: { w: 960, h: 540 },
};

const STANDARD_PX_PER_UNIT: number = 80;
export const PixelsPerUnit: Record<Resolution, StaticVector> = {
  "4k": {
    x: (ResolutionDimensions["4k"].w / ResolutionDimensions["standard"].w) * STANDARD_PX_PER_UNIT,
    y: (ResolutionDimensions["4k"].h / ResolutionDimensions["standard"].h) * STANDARD_PX_PER_UNIT,
  },
  standard: {
    x: STANDARD_PX_PER_UNIT,
    y: STANDARD_PX_PER_UNIT,
  },
  mini: {
    x: (ResolutionDimensions["mini"].w / ResolutionDimensions["standard"].w) * STANDARD_PX_PER_UNIT,
    y: (ResolutionDimensions["mini"].h / ResolutionDimensions["standard"].h) * STANDARD_PX_PER_UNIT,
  },
};

export const UnitsPerScreen: Rect = {
  w: ResolutionDimensions["standard"].w / STANDARD_PX_PER_UNIT,
  h: ResolutionDimensions["standard"].h / STANDARD_PX_PER_UNIT,
};

export const ResolutionScale: Record<Resolution, number> = {
  "4k": 1,
  standard: 0.5,
  mini: 0.25,
};
