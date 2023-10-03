import { Tester } from "../../../../../tester/tester";
import { Assertions } from "../../../../../tester/assert";
import { StaticVector } from "../../geometry/Vector";
import { GTMath } from "../GTMath";

Tester.run("ScalarProjection", [
  [
    "correctly handle normal cases",
    () => {
      const v1: StaticVector = {
        x: 1,
        y: 1,
      };
      const v2: StaticVector = {
        x: 0,
        y: 2,
      };
      const v3: StaticVector = {
        x: 1,
        y: 1,
      };

      Assertions.assertEquals(GTMath.ScalarProjection(v1, v3), 1);
      Assertions.assertEquals(GTMath.ScalarProjection(v2, v3), 1);
    },
  ],
  [
    "correctly handle negative cases",
    () => {
      const v1: StaticVector = {
        x: -1,
        y: -1,
      };
      const v2: StaticVector = {
        x: 0,
        y: -2,
      };
      const v3: StaticVector = {
        x: 1,
        y: 1,
      };

      Assertions.assertEquals(GTMath.ScalarProjection(v1, v3), -1);
      Assertions.assertEquals(GTMath.ScalarProjection(v2, v3), -1);
    },
  ],
  [
    "correctly handle zero cases",
    () => {
      const v1: StaticVector = {
        x: -1,
        y: 1,
      };
      const v2: StaticVector = {
        x: 1,
        y: -1,
      };
      const v3: StaticVector = {
        x: 1,
        y: 1,
      };

      Assertions.assertEquals(GTMath.ScalarProjection(v1, v3), 0);
      Assertions.assertEquals(GTMath.ScalarProjection(v2, v3), 0);
    },
  ],
]);
