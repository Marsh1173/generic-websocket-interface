import { StaticPoint } from "../geometry/Point";
import { StaticSegment } from "../geometry/Segment";
import { GTMath } from "./GTMath";

/**
 * Useful for finding if a point lies on the left or right side of a line.
 *
 * ---
 * Takes the cross product of the vector of the segment (assuming `seg.p1` is the origin) and the vector from `seg.p1` the the point.
 *
 * Depending on the rotation from the segment vector to the vector from `seg.p1` to the point, the z-scalar will be:
 * * positive if counter-clockwise.
 * * negative if clockwise.
 * * 0 if the point falls on the line.
 */

export function GTSegmentAndPointZScalar(
  seg: StaticSegment,
  point: StaticPoint
): number {
  return GTMath.CrossProductZScalar(
    { x: seg.p2.x - seg.p1.x, y: seg.p2.y - seg.p1.y },
    { x: point.x - seg.p1.x, y: point.y - seg.p1.y }
  );
}
