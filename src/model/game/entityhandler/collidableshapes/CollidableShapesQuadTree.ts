import { Rect } from "../../../utils/physics/geometry/Rect";
import { CollidableShapesQuadTreeNode } from "./CollidableShapesQuadTreeNode";
import { QuadTree } from "../../../utils/quadtree/QuadTree";
import { StaticCollidableShapeWithId } from "../../entitymodel/gamespacedata/staticcollidableshape/StaticCollidableShape";

export class CollidableShapesQuadTree extends QuadTree<StaticCollidableShapeWithId, CollidableShapesQuadTreeNode> {
  protected get_root_node(dimensions: Rect): CollidableShapesQuadTreeNode {
    return new CollidableShapesQuadTreeNode(dimensions.h, 0, 0, dimensions.w, undefined);
  }
}
