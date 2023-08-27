import { GTRotation } from "./Rotation";
import { GTCrossProductZScalar } from "./CrossProductZScalar";
import { GTDistance } from "./Distance";
import { GTDotProduct } from "./DotProduct";
import { GTMagnitude } from "./Magnitude";
import { GTNormal } from "./Normal";
import { GTNormalize } from "./Normalize";
import { GTSegmentAndPointZScalar } from "./SegmentAndPointZScalar";
import { GTVectorFromRotation } from "./VectorFromRotation";
import { GTVectorProjection } from "./VectorProjection";
import { GTDifference } from "./Difference";

export namespace GTMath {
  export const Normal = GTNormal;
  export const Rotation = GTRotation;
  export const Distance = GTDistance;
  export const Difference = GTDifference;
  export const VectorProjection = GTVectorProjection;
  export const DotProduct = GTDotProduct;
  export const Magnitude = GTMagnitude;
  export const Normalize = GTNormalize;
  export const CrossProductZScalar = GTCrossProductZScalar;
  export const SegmentAndPointZScalar = GTSegmentAndPointZScalar;
  export const VectorFromRotation = GTVectorFromRotation;
}
