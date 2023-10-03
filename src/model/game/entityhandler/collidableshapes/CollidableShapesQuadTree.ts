import { Rect } from "../../../common/math/geometry/Rect";
import { CollidableShapesQuadTreeNode } from "./CollidableShapesQuadTreeNode";
import { QuadTree } from "../../../common/quadtree/QuadTree";
import { StaticCollidableShapeWithId } from "../../entitymodel/gamespacedata/staticcollidableshape/StaticCollidableShape";
import { StaticSegment } from "../../../common/math/geometry/Segment";

export class CollidableShapesQuadTree extends QuadTree<StaticCollidableShapeWithId, CollidableShapesQuadTreeNode> {
  protected get_root_node(dimensions: Rect): CollidableShapesQuadTreeNode {
    return new CollidableShapesQuadTreeNode(dimensions.h, 0, 0, dimensions.w, undefined);
  }

  /**
   * Efficiently searches for all shapes that the segment intersects with. Guarantees
   * that the bounding box of the segment intersects the bounding box of any returned
   * shape.
   */
  public get_all_by_segment(seg: StaticSegment): StaticCollidableShapeWithId[] {
    return this.root.search_by_bounding_box({
      top: Math.max(seg.p1.y, seg.p2.y),
      left: Math.min(seg.p1.x, seg.p2.x),
      bottom: Math.min(seg.p1.y, seg.p2.y),
      right: Math.max(seg.p1.x, seg.p2.x),
    });
  }
}
