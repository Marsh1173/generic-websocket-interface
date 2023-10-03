import { Tester } from "../../../../../tester/tester";
import { Assertions } from "../../../../../tester/assert";
import { GTCollision } from "../GTCollision";

Tester.run("LineSegmentsCollide", [
  [
    "correctly handle normal cases",
    () => {
      const seg1 = {
        p1: { x: 0, y: 0 },
        p2: { x: 3, y: 3 },
      };
      const result1 = GTCollision.LineSegmentsCollide(seg1, {
        p1: { x: 0, y: 2 },
        p2: { x: 2, y: 0 },
      });
      Assertions.assertIsDefined(result1);
      Assertions.assertEquals(result1.seg1_proportion, 1 / 3);
      Assertions.assertEquals(result1.seg2_proportion, 1 / 2);

      const result2 = GTCollision.LineSegmentsCollide(seg1, {
        p1: { x: 2, y: 0 },
        p2: { x: 3, y: 1 },
      });
      Assertions.assertEquals(result2, undefined);
    },
  ],
  [
    "correctly handle an endpoint landing on a segment",
    () => {
      const seg1 = {
        p1: { x: 0, y: 2 },
        p2: { x: 2, y: 0 },
      };
      const result1 = GTCollision.LineSegmentsCollide(seg1, {
        p1: { x: 1, y: 1 },
        p2: { x: 2, y: 2 },
      });
      Assertions.assertIsDefined(result1);
      Assertions.assertEquals(result1.seg1_proportion, 0.5);

      const result2 = GTCollision.LineSegmentsCollide(seg1, {
        p1: { x: 1, y: -1 },
        p2: { x: 3, y: 1 },
      });
      Assertions.assertIsDefined(result2);
      Assertions.assertEquals(result2.seg1_proportion, 1);
    },
  ],
  [
    "correctly handle 2 touching endpoints",
    () => {
      const result = GTCollision.LineSegmentsCollide(
        {
          p1: { x: 0, y: 0 },
          p2: { x: 2, y: 0 },
        },
        {
          p1: { x: 2, y: 0 },
          p2: { x: 2, y: 1 },
        }
      );
      Assertions.assertIsDefined(result);
      Assertions.assertEquals(result.seg1_proportion, 1);
    },
  ],
  [
    "correctly handle two vertical segments",
    () => {
      const result = GTCollision.LineSegmentsCollide(
        {
          p1: { x: 0, y: 0 },
          p2: { x: 0, y: 2 },
        },
        {
          p1: { x: 0, y: 0 },
          p2: { x: 0, y: 3 },
        }
      );
      Assertions.assertEquals(result, undefined);
    },
  ],
  [
    "correctly handle a vertical segment",
    () => {
      const vertical_segment = {
        p1: { x: 0, y: 0 },
        p2: { x: 0, y: 2 },
      };
      const happy_result = GTCollision.LineSegmentsCollide(vertical_segment, {
        p1: { x: -1, y: 2 },
        p2: { x: 2, y: -1 },
      });
      Assertions.assertIsDefined(happy_result);
      Assertions.assertEquals(happy_result.seg1_proportion, 0.5);

      const sad_result = GTCollision.LineSegmentsCollide(vertical_segment, {
        p1: { x: 1, y: 1 },
        p2: { x: 2, y: 0 },
      });
      Assertions.assertEquals(sad_result, undefined);
    },
  ],
  [
    "correctly handle a horizontal segment",
    () => {
      const horizontal_segment = {
        p1: { x: 0, y: 0 },
        p2: { x: 2, y: 0 },
      };
      const happy_result = GTCollision.LineSegmentsCollide(horizontal_segment, {
        p1: { x: 0, y: 1 },
        p2: { x: 3, y: -2 },
      });
      Assertions.assertIsDefined(happy_result);
      Assertions.assertEquals(happy_result.seg1_proportion, 0.5);

      const sad_result = GTCollision.LineSegmentsCollide(horizontal_segment, {
        p1: { x: 0, y: 2 },
        p2: { x: 1, y: 1 },
      });
      Assertions.assertEquals(sad_result, undefined);
    },
  ],
  [
    "return undefined if parallel",
    () => {
      const seg1 = {
        p1: { x: 0, y: 0 },
        p2: { x: 1, y: 1 },
      };
      // parallel
      const result1 = GTCollision.LineSegmentsCollide(seg1, {
        p1: { x: 1, y: 0 },
        p2: { x: 2, y: 1 },
      });
      Assertions.assertEquals(result1, undefined);

      // run along each other
      const result2 = GTCollision.LineSegmentsCollide(seg1, {
        p1: { x: -1, y: -1 },
        p2: { x: 2, y: 2 },
      });
      Assertions.assertEquals(result2, undefined);
    },
  ],
]);
