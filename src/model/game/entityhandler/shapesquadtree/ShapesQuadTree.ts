import { Rect } from "../../../common/math/geometry/Rect";
import { QuadTree } from "../../../common/quadtree/QuadTree";
// import { DebugQuadTreeData } from "../../devtools/ShowEntityQuadTree";
import { StaticCollidableShapeWithId } from "../../entitymodel/gamespacedata/staticcollidableshape/StaticCollidableShape";
import { ShapesQuadTreeBranchNode } from "./ShapesQuadTreeBranchNode";
import { ShapesQuadTreeLeafNode } from "./ShapesQuadTreeLeafNode";
import { ShapesQuadTreeSearcher } from "./ShapesQuadTreeSearcher";

export class ShapesQuadTree extends QuadTree<
  StaticCollidableShapeWithId,
  ShapesQuadTreeLeafNode,
  ShapesQuadTreeBranchNode,
  ShapesQuadTreeSearcher
> {
  protected readonly root: ShapesQuadTreeBranchNode;
  public readonly search: ShapesQuadTreeSearcher;

  constructor(size: Rect) {
    super(size);

    this.root = new ShapesQuadTreeBranchNode(this.dim, 0, 0, this.max_depth, this.items, new Set());

    this.search = new ShapesQuadTreeSearcher(this.items, this.root);
  }

  // public debug_get_tree(): DebugQuadTreeData {
  //   return this.root.debug_get_tree();
  // }
}
