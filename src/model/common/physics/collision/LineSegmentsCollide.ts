import { NearlyEquals } from "../Nearly/NearlyEquals";
import { NearlyGreaterThan } from "../Nearly/NearlyGreaterThan";
import { NearlyLessThan } from "../Nearly/NearlyLessThan";
import { StaticPoint } from "../geometry/Point";
import { StaticSegment } from "../geometry/Segment";
import { GTMath } from "../math/GTMath";

export type LineSegmentsCollideReturnData = {
  seg1_proportion: number;
  seg2_proportion: number;
};

/**
 * Get values from segment in the form of ax + by = c
 * @param seg
 * @returns
 */
function get_a_b_c(seg: StaticSegment): [number, number, number] {
  return [seg.p1.y - seg.p2.y, seg.p2.x - seg.p1.x, -1 * GTMath.CrossProductZScalar(seg.p1, seg.p2)];
}

/**
 * Finds the number that, when multiplied by seg, gives the point.
 * Assumes that the point has already been confirmed to fall along the segment.
 */
function get_segment_proportion(seg: StaticSegment, point: StaticPoint): number {
  if (!NearlyEquals(seg.p1.x, seg.p2.x)) {
    return (point.x - seg.p1.x) / (seg.p2.x - seg.p1.x);
  } else {
    //seg is vertical, use y instead of x
    return (point.y - seg.p1.y) / (seg.p2.y - seg.p1.y);
  }
}

/**
 * Returns the 0-1 proportion along `seg1` and `seg2` where the segments collide, or undefined if the segments do not collide.
 *
 * This is a comprehensive (and expensive) check, so do any possible narrowing beforehand.
 */
export function GTLineSegmentsCollide(
  seg1: StaticSegment,
  seg2: StaticSegment
): LineSegmentsCollideReturnData | undefined {
  const [a1, b1, c1] = get_a_b_c(seg1);
  const [a2, b2, c2] = get_a_b_c(seg2);
  const d = a1 * b2 - b1 * a2;

  if (NearlyEquals(d, 0)) {
    // lines are parallel
    return undefined;
  }

  const dx = c1 * b2 - b1 * c2;
  const dy = a1 * c2 - c1 * a2;
  const collision: StaticPoint = {
    x: dx / d,
    y: dy / d,
  };

  let seg1_proportion: number = get_segment_proportion(seg1, collision);
  let seg2_proportion: number = get_segment_proportion(seg2, collision);

  if (
    NearlyGreaterThan(seg1_proportion, 0) &&
    NearlyLessThan(seg1_proportion, 1) &&
    NearlyGreaterThan(seg2_proportion, 0) &&
    NearlyLessThan(seg2_proportion, 1)
  ) {
    // collision happened outside of segments
    return { seg1_proportion, seg2_proportion };
  } else {
    return undefined;
  }
}
