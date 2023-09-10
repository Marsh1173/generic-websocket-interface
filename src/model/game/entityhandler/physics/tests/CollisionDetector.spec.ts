import { Assertions } from "../../../../../tester/assert";
import { Tester } from "../../../../../tester/tester";
import { uuid } from "../../../../common/Id";
import { Rect } from "../../../../common/physics/geometry/Rect";
import { Shape } from "../../../../common/physics/geometry/Shape";
import { CollidableShapesQuadTree } from "../../collidableshapes/CollidableShapesQuadTree";
import { CollisionDetector } from "../CollisionDetector";

const make_detector_and_collidables = (shapes: ConstructorParameters<typeof Shape>[]): CollisionDetector => {
  const tree = new CollidableShapesQuadTree({ w: 30, h: 30 });
  for (const shape of shapes) {
    make_collidable(shape, tree);
  }
  return new CollisionDetector(tree);
};

const make_collidable = (args: ConstructorParameters<typeof Shape>, tree: CollidableShapesQuadTree) => {
  const shape = new Shape(...args);
  tree.insert({ id: uuid(), shape, type: "StaticCollidableShape" });
};

Tester.run("CollisionDetector", [
  [
    "Detects head-on collisions",
    () => {
      const detector = make_detector_and_collidables([[Rect.to_vertices({ w: 2, h: 2 }), { x: 4, y: 4 }]]);

      const collision = detector.detect_collisions({
        p1: { x: 0, y: 4 },
        p2: { x: 4, y: 4 },
      });

      Assertions.assertIsDefined(collision);
      Assertions.assertEquals(collision.v_progress, 0.75);
      Assertions.assertEquals(collision.edge_progress, 0.5);
    },
  ],
  [
    "Detects normal collisions",
    () => {
      const detector = make_detector_and_collidables([[Rect.to_vertices({ w: 2, h: 2 }), { x: 4, y: 4 }]]);

      const collision = detector.detect_collisions({
        p1: { x: 0, y: 0 },
        p2: { x: 3.5, y: 4 },
      });

      Assertions.assertIsDefined(collision);
      Assertions.assertEquals(collision.v_progress, 0.8571428571428571);
      Assertions.assertEquals(collision.edge_progress, 0.2142857142857142);
    },
  ],
]);
