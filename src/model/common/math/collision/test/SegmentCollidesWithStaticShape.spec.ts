import { Tester } from "../../../../../tester/tester";
import { Assertions } from "../../../../../tester/assert";
import { StaticPoint } from "../../geometry/Point";
import { TestGTSegmentCollidesWithStaticShape } from "../SegmentCollidesWithStaticShape";
import { NearlyEquals } from "../../nearly/NearlyEquals";

Tester.run("SegmentCollidesWithStaticShape", [
  [
    "correctly check move_segment_skids_off_corner",
    () => {
      const seg = {
        p1: { x: 0, y: 0 },
        p2: { x: 4, y: 3 },
      };

      for (let i: number = -0.5; i < 1.5; i += 0.1) {
        Assertions.assertEquals(
          TestGTSegmentCollidesWithStaticShape.test_move_segment_skids_off_corner({ x: -2, y: 1 }, i, seg),
          NearlyEquals(i, 1)
        );
      }

      for (let i: number = -0.5; i < 1.5; i += 0.1) {
        Assertions.assertEquals(
          TestGTSegmentCollidesWithStaticShape.test_move_segment_skids_off_corner({ x: 4, y: 5 }, i, seg),
          NearlyEquals(i, 0)
        );
      }

      for (let i: number = 0; i < 4; i += 0.5) {
        Assertions.assertEquals(
          TestGTSegmentCollidesWithStaticShape.test_move_segment_skids_off_corner({ x: i, y: -4 }, 0, seg),
          i >= 3
        );
      }

      for (let i: number = 8; i < 12; i += 0.5) {
        Assertions.assertEquals(
          TestGTSegmentCollidesWithStaticShape.test_move_segment_skids_off_corner({ x: i, y: -5 }, 1, seg),
          i <= 10
        );
      }

      // orthogonal to edge_progress = 0
      Assertions.assertEquals(
        TestGTSegmentCollidesWithStaticShape.test_move_segment_skids_off_corner({ x: -3, y: 4 }, 0, seg),
        true
      );

      // orthogonal to edge_progress = 1
      Assertions.assertEquals(
        TestGTSegmentCollidesWithStaticShape.test_move_segment_skids_off_corner({ x: 1, y: 7 }, 1, seg),
        true
      );
    },
  ],
  [
    "correctly check move_segment_starts_inside_edge",
    () => {
      const seg = {
        p1: { x: 0, y: 0 },
        p2: { x: 3, y: 3 },
      };

      // on the line
      const p1: StaticPoint = { x: 2, y: 2 };
      Assertions.assertEquals(
        TestGTSegmentCollidesWithStaticShape.test_move_segment_starts_inside_edge(p1, seg),
        false
      );

      // on the line
      const p2: StaticPoint = { x: -1, y: 1 };
      Assertions.assertEquals(
        TestGTSegmentCollidesWithStaticShape.test_move_segment_starts_inside_edge(p2, seg),
        false
      );

      // outside the edge
      const p3: StaticPoint = { x: 3, y: 5 };
      Assertions.assertEquals(
        TestGTSegmentCollidesWithStaticShape.test_move_segment_starts_inside_edge(p3, seg),
        false
      );

      // inside the edge
      const p4: StaticPoint = { x: 4, y: 2 };
      Assertions.assertEquals(TestGTSegmentCollidesWithStaticShape.test_move_segment_starts_inside_edge(p4, seg), true);
    },
  ],
]);
