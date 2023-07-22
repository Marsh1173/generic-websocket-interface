import { GTIsInBoundingBox } from "./IsInBoundingBox";
import { GTLineSegmentsCollide } from "./LineSegmentsCollide";
import { GTMovableCollidesWithStaticShape } from "./MovableCollidesWithStaticShape";
import { GTPointIsInShape } from "./PointIsInShape";

export namespace GTCollision {
  export const IsInBoundingBox = GTIsInBoundingBox;
  export const PointIsInShape = GTPointIsInShape;
  export const LineSegmentsCollide = GTLineSegmentsCollide;
  export const MovableCollidesWithStaticShape =
    GTMovableCollidesWithStaticShape;
}
