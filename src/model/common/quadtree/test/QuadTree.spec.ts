import { Tester } from "../../../../tester/tester";
import { Assertions } from "../../../../tester/assert";
import { GlobalRect, Rect } from "../../math/geometry/Rect";
import {
  TestQuadTree,
  TestQuadTreeBranchNode,
  TestQuadTreeItem,
  TestQuadTreeLeafNode,
} from "./HelperClasses.test";

const size: Rect = { w: 16, h: 16 };

const dimension_equals = (d1: GlobalRect, d2: GlobalRect) => {
  return (
    d1.bottom === d2.bottom &&
    d1.top === d2.top &&
    d1.left === d2.left &&
    d1.right === d2.right
  );
};

Tester.run("QuadTree", [
  // Quad Tree tests
  [
    "throws error if same item is inserted twice",
    () => {
      const tree = new TestQuadTree(size);
      const item = new TestQuadTreeItem({ x: 0, y: 0 });

      tree.insert(item);

      Assertions.assert_throws_error(() => {
        tree.insert(item);
      });
    },
  ],
  [
    "calculates max depth correctly",
    () => {
      const tree1 = new TestQuadTree({ w: 2, h: 2 });
      Assertions.assertEquals(tree1.get_max_depth(), 0);

      const tree2 = new TestQuadTree({ w: 3, h: 3 });
      Assertions.assertEquals(tree2.get_max_depth(), 1);

      const tree3 = new TestQuadTree({ w: 20, h: 20 });
      Assertions.assertEquals(tree3.get_max_depth(), 4);

      const tree4 = new TestQuadTree({ w: 128, h: 128 });
      Assertions.assertEquals(tree4.get_max_depth(), 6);
    },
  ],
  [
    "calculates dimensions correctly",
    () => {
      const tree = new TestQuadTree({ w: 128, h: 128 });
      const dim = tree.get_dim();
      Assertions.assertEquals(
        dim,
        { top: 128, bottom: 0, left: 0, right: 128 },
        dimension_equals
      );
    },
  ],

  // Quad Tree branch node tests
  [
    "calculates child dimensions correctly",
    () => {
      const tree = new TestQuadTree({ w: 8, h: 8 });
      const children = tree.root.children;
      Assertions.assertEquals(
        children[0].get_dim(),
        {
          top: 8,
          bottom: 4,
          left: 4,
          right: 8,
        },
        dimension_equals
      );
      Assertions.assertEquals(
        children[1].get_dim(),
        {
          top: 8,
          bottom: 4,
          left: 0,
          right: 4,
        },
        dimension_equals
      );
      Assertions.assertEquals(
        children[2].get_dim(),
        {
          top: 4,
          bottom: 0,
          left: 0,
          right: 4,
        },
        dimension_equals
      );
      Assertions.assertEquals(
        children[3].get_dim(),
        {
          top: 4,
          bottom: 0,
          left: 4,
          right: 8,
        },
        dimension_equals
      );
    },
  ],
  [
    "calculates if a point falls inside correctly",
    () => {
      const tree = new TestQuadTree(size);
      Assertions.assertFalse(
        tree.root.point_falls_in_this_bounding_box({ x: -1, y: -1 })
      );
      Assertions.assertTrue(
        tree.root.point_falls_in_this_bounding_box({ x: 0, y: 0 })
      );
      Assertions.assertTrue(
        tree.root.point_falls_in_this_bounding_box({ x: 8, y: 8 })
      );
      Assertions.assertFalse(
        tree.root.point_falls_in_this_bounding_box({ x: 16, y: 16 })
      );
      Assertions.assertFalse(
        tree.root.point_falls_in_this_bounding_box({ x: 0, y: 16 })
      );
      Assertions.assertFalse(
        tree.root.point_falls_in_this_bounding_box({ x: 16, y: 0 })
      );
    },
  ],
  [
    "branch out if item count passes limit,\n\
    not branch out if item count passes limit but has already reached max depth,\n\
    collapse if children item count sum is less than or equal to limit,\n\
    inserts and removes correctly,\n\
    calculates depth correctly",
    () => {
      const tree = new TestQuadTree({ w: 8, h: 8 });
      const items: TestQuadTreeItem[] = [];
      for (let i: number = 0; i < 9; i++) {
        const item = new TestQuadTreeItem({ x: 7, y: 7 });
        tree.insert(item);
        items.push(item);
      }

      // branch out if item count passes limit
      let root_child = tree.root.children[0];
      Assertions.assertEquals(root_child.type, "Branch");

      //don't branch out if item count passes limit but has already reached max depth (2)
      const root_child_child = (tree.root.children[0] as TestQuadTreeBranchNode)
        .children[0];
      Assertions.assertEquals(root_child_child.type, "Leaf");
      Assertions.assertEquals(
        (root_child_child as TestQuadTreeLeafNode).get_depth(),
        tree.get_max_depth()
      );
      Assertions.assertEquals(root_child_child.item_ids.size, 9);

      // collapse if children item count sum is less than or equal to limit
      tree.remove(items[0].id);
      root_child = tree.root.children[0];
      Assertions.assertEquals(root_child.type, "Leaf");
      Assertions.assertEquals(root_child.get_depth(), 1);
      Assertions.assertEquals(root_child.item_ids.size, 8);
    },
  ],
]);
