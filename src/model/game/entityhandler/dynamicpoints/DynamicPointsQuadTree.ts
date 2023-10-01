import { Id } from "../../../common/Id";
import { StaticPoint } from "../../../common/physics/geometry/Point";
import { Rect } from "../../../common/physics/geometry/Rect";
import { QuadTree } from "../../../common/quadtree/QuadTree";
import { DynamicPointWithId } from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { DynamicPointsQuadTreeNode } from "./DynamicPointsQuadTreeNode";

export class DynamicPointsQuadTree extends QuadTree<
  DynamicPointWithId,
  DynamicPointsQuadTreeNode
> {
  protected get_root_node(dimensions: Rect): DynamicPointsQuadTreeNode {
    return new DynamicPointsQuadTreeNode(
      dimensions.h,
      0,
      0,
      dimensions.w,
      undefined
    );
  }

  public re_insert_point(id: Id, prev_pos: StaticPoint) {
    this.root.re_insert_point(id, prev_pos);
  }
}
