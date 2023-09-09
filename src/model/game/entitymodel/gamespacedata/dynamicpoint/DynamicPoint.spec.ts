import { Assertions } from "../../../../../tester/assert";
import { Tester } from "../../../../../tester/tester";
import { uuid } from "../../../../common/Id";
import { NearlyEquals } from "../../../../common/physics/Nearly/NearlyEquals";
import { StaticVector } from "../../../../common/physics/geometry/Vector";
import { DynamicPoint, PositionPath } from "./DynamicPoint";

Tester.run("DynamicPoint", [
  [
    "correctly affected by constant velocity",
    () => {
      const p: DynamicPoint = new DynamicPoint({ pos: { x: 0, y: 0 } }, false);
      const force: StaticVector = { x: 10, y: 5 };
      const time: number = 1000;
      p.apply_constant_velocity(uuid(), force);
      p.update(time);

      Assertions.assertEquals(p.pos.x, force.x * time);
      Assertions.assertEquals(p.pos.y, force.y * time);
    },
  ],
  [
    "handle constant velocity consistently regardless of fps",
    () => {
      for (let i: number = 1; i <= 60; i++) {
        const p: DynamicPoint = new DynamicPoint({ pos: { x: 0, y: 0 } }, false);
        p.apply_constant_velocity(uuid(), { x: Math.sqrt(2), y: Math.sqrt(3) });

        for (let j: number = 1; j <= i; j++) {
          p.update(1 / i);
        }

        Assertions.assertEquals(p.pos.x, Math.sqrt(2), NearlyEquals);
        Assertions.assertEquals(p.pos.y, Math.sqrt(3), NearlyEquals);
      }
    },
  ],
  [
    "correctly affected by position curves",
    () => {
      const p: DynamicPoint = new DynamicPoint({ pos: { x: 0, y: 0 } }, false);
      const time: number = Math.PI;
      const path: PositionPath = {
        f: (t: number) => {
          return { x: Math.sin(t), y: Math.sin(t) / 2 };
        },
        duration: time,
      };

      p.apply_position_path(uuid(), path);

      p.update(time / 2);

      Assertions.assertEquals(p.pos.x, 1, NearlyEquals);
      Assertions.assertEquals(p.pos.y, 0.5, NearlyEquals);

      p.update(time / 2);

      Assertions.assertEquals(p.pos.x, 0, NearlyEquals);
      Assertions.assertEquals(p.pos.y, 0, NearlyEquals);
    },
  ],
  [
    "handle position paths consistently regardless of fps",
    () => {
      for (let i: number = 1; i <= 60; i++) {
        const p: DynamicPoint = new DynamicPoint({ pos: { x: 0, y: 0 } }, false);
        const path: PositionPath = {
          f: (t: number) => {
            return { x: Math.sin(t), y: Math.sin(t / 2) };
          },
          duration: 1,
        };
        p.apply_position_path(uuid(), path);

        for (let j: number = 1; j <= i; j++) {
          p.update(1 / i);
        }

        Assertions.assertEquals(p.pos.x, Math.sin(1), NearlyEquals);
        Assertions.assertEquals(p.pos.y, Math.sin(0.5), NearlyEquals);
      }
    },
  ],
]);
