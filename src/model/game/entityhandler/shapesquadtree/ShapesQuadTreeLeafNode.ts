import QuadTreeLeafNode from "../../../common/quadtree/QuadTreeLeafNode";
// import { DebugQuadTreeData } from "../../devtools/ShowEntityQuadTree";
import { StaticCollidableShapeWithId } from "../../entitymodel/gamespacedata/staticcollidableshape/StaticCollidableShape";
import { ShapesQuadTreeBranchNode } from "./ShapesQuadTreeBranchNode";

export class ShapesQuadTreeLeafNode extends QuadTreeLeafNode<StaticCollidableShapeWithId, ShapesQuadTreeBranchNode> {
  public make_branch_from_this(): ShapesQuadTreeBranchNode {
    return new ShapesQuadTreeBranchNode(
      this.dim,
      this.index,
      this.depth,
      this.max_depth,
      this.items,
      this.item_ids,
      this.parent
    );
  }

  public item_falls_inside(item: StaticCollidableShapeWithId): boolean {
    return this.bounding_box_intersects(item.shape.bounding_box);
  }

  // public debug_get_tree(): DebugQuadTreeData {
  //   return {
  //     dims: this.dim,
  //     item_count: this.item_ids.size,
  //   };
  // }
}
