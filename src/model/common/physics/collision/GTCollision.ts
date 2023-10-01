import { GTIsInBoundingBox } from "./IsInBoundingBox";
import { GTLineSegmentsCollide } from "./LineSegmentsCollide";
import { GTSegmentCollidesWithStaticShape } from "./SegmentCollidesWithStaticShape";
import { GTPointIsInShape } from "./PointIsInShape";
import { GTIsWithinDistance } from "./IsWithinDistance";
import { GTCompareDistance } from "./CompareDistance";

export namespace GTCollision {
  export const IsInBoundingBox = GTIsInBoundingBox;
  export const PointIsInShape = GTPointIsInShape;
  export const LineSegmentsCollide = GTLineSegmentsCollide;
  export const SegmentCollidesWithStaticShape =
    GTSegmentCollidesWithStaticShape;
  export const IsWithinDistance = GTIsWithinDistance;
  export const CompareDistance = GTCompareDistance;
}
