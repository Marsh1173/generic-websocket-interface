import { GTIsInBoundingBox } from "./IsInBoundingBox";
import { GTLineSegmentsCollide } from "./LineSegmentsCollide";
import { GTSegmentCollidesWithStaticShape } from "./SegmentCollidesWithStaticShape";
import { GTPointIsInShape } from "./PointIsInShape";

export namespace GTCollision {
  export const IsInBoundingBox = GTIsInBoundingBox;
  export const PointIsInShape = GTPointIsInShape;
  export const LineSegmentsCollide = GTLineSegmentsCollide;
  export const SegmentCollidesWithStaticShape = GTSegmentCollidesWithStaticShape;
}
