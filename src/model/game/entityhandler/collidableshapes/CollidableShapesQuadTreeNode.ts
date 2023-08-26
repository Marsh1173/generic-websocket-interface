import { GTCollision } from "../../../utils/physics/collision/GTCollision";
import { QuadTreeNode } from "../../../utils/quadtree/QuadTreeNode";
import { Point } from "../../../utils/physics/geometry/Point";
import { StaticCollidableShapeWithId } from "../../entitymodel/gamespacedata/staticcollidableshape/StaticCollidableShape";

export class CollidableShapesQuadTreeNode extends QuadTreeNode<
  StaticCollidableShapeWithId,
  CollidableShapesQuadTreeNode
> {
  public is_completely_in_bounding_box(item: StaticCollidableShapeWithId): boolean {
    for (const v_data of item.shape.vertices_data) {
      if (!this.point_falls_in_this_bounding_box(v_data.vertex)) {
        return false;
      }
    }
    return true;
  }

  protected get_child_node(top: number, left: number, bottom: number, right: number): CollidableShapesQuadTreeNode {
    return new CollidableShapesQuadTreeNode(top, left, bottom, right, this);
  }

  private point_falls_in_this_bounding_box(p: Point): boolean {
    return GTCollision.IsInBoundingBox(p, this.top, this.left, this.bottom, this.right);
  }
}
