import { Assertions } from "../../../../../tester/assert";
import { Tester } from "../../../../../tester/tester";
import { uuid } from "../../../../common/Id";
import { StaticVector } from "../../../../common/physics/geometry/Vector";
import { DynamicPoint, PositionPath } from "./DynamicPoint";

const nearly_equals = (v1: number, v2: number) => {
  return v2 < v1 + Number.EPSILON || v2 > v1 - Number.EPSILON;
};

Tester.run("DynamicPoint", [
  [
    "correctly affected by constant velocity",
    () => {
      const p: DynamicPoint = new DynamicPoint({ pos: { x: 0, y: 0 } });
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
        const p: DynamicPoint = new DynamicPoint({ pos: { x: 0, y: 0 } });
        p.apply_constant_velocity(uuid(), { x: Math.sqrt(2), y: Math.sqrt(3) });

        for (let j: number = 1; j <= i; j++) {
          p.update(1 / i);
        }

        Assertions.assertEquals(p.pos.x, Math.sqrt(2), nearly_equals);
        Assertions.assertEquals(p.pos.y, Math.sqrt(3), nearly_equals);
      }
    },
  ],
  [
    "correctly affected by position curves",
    () => {
      const p: DynamicPoint = new DynamicPoint({ pos: { x: 0, y: 0 } });
      const time: number = Math.PI;
      const path: PositionPath = {
        f: (t: number) => {
          return { x: Math.sin(t), y: Math.cos(t) };
        },
        duration: time,
      };

      p.apply_position_path(uuid(), path);

      p.update(time / 2);

      Assertions.assertEquals(p.pos.x, 1, nearly_equals);
      Assertions.assertEquals(p.pos.y, 0, nearly_equals);

      p.update(time / 2);

      Assertions.assertEquals(p.pos.x, 0, nearly_equals);
      Assertions.assertEquals(p.pos.y, -1, nearly_equals);
    },
  ],
  [
    "handle position paths consistently regardless of fps",
    () => {
      for (let i: number = 1; i <= 60; i++) {
        const p: DynamicPoint = new DynamicPoint({ pos: { x: 0, y: 0 } });
        const path: PositionPath = {
          f: (t: number) => {
            return { x: Math.sin(t), y: Math.cos(t) };
          },
          duration: 1,
        };
        p.apply_position_path(uuid(), path);

        for (let j: number = 1; j <= i; j++) {
          p.update(1 / i);
        }

        Assertions.assertEquals(p.pos.x, 0, nearly_equals);
        Assertions.assertEquals(p.pos.y, -1, nearly_equals);
      }
    },
  ],
]);
