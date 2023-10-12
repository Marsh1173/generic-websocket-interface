import { GlobalRect } from "../../../common/math/geometry/Rect";
import { QuadTreeBranchNode } from "../../../common/quadtree/QuadTreeBranchNode";
import { QuadTreeBranchNodeChildIndex } from "../../../common/quadtree/QuadTreeNode";
import { DebugQuadTreeData } from "../../devtools/ShowEntityQuadTree";
import { StaticCollidableShapeWithId } from "../../entitymodel/gamespacedata/staticcollidableshape/StaticCollidableShape";
import { ShapesQuadTreeLeafNode } from "./ShapesQuadTreeLeafNode";

export class ShapesQuadTreeBranchNode extends QuadTreeBranchNode<
  StaticCollidableShapeWithId,
  ShapesQuadTreeLeafNode,
  ShapesQuadTreeBranchNode
> {
  public item_falls_inside(item: StaticCollidableShapeWithId): boolean {
    return this.bounding_box_intersects(item.shape.bounding_box);
  }

  protected make_this_leaf(
    parent: ShapesQuadTreeBranchNode,
    item_ids?: Set<string> | undefined
  ): ShapesQuadTreeLeafNode {
    return new ShapesQuadTreeLeafNode(this.dim, this.index, this.depth, this.max_depth, this.items, parent, item_ids);
  }

  protected make_child_leaf(dim: GlobalRect, index: QuadTreeBranchNodeChildIndex): ShapesQuadTreeLeafNode {
    return new ShapesQuadTreeLeafNode(dim, index, this.depth + 1, this.max_depth, this.items, this);
  }

  public debug_get_tree(): DebugQuadTreeData {
    return {
      dims: this.dim,
      children: this.children.map((child) => child.debug_get_tree()),
    };
  }
}
