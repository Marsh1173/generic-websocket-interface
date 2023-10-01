import { Id } from "../../../common/Id";
import { StaticPoint } from "../../../common/physics/geometry/Point";
import { QuadTreeNode } from "../../../common/quadtree/QuadTreeNode";
import { DynamicPointWithId } from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";

export class DynamicPointsQuadTreeNode extends QuadTreeNode<
  DynamicPointWithId,
  DynamicPointsQuadTreeNode
> {
  public is_completely_in_bounding_box(item: DynamicPointWithId): boolean {
    return this.point_falls_in_this_bounding_box(item.pos);
  }

  protected get_child_node(
    top: number,
    left: number,
    bottom: number,
    right: number
  ): DynamicPointsQuadTreeNode {
    return new DynamicPointsQuadTreeNode(top, left, bottom, right, this);
  }

  public re_insert_point(id: Id, prev_pos: StaticPoint) {
    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.point_falls_in_this_bounding_box(prev_pos)) {
          node.re_insert_point(id, prev_pos);
          return;
        }
      }
    }

    // If item couldn't be inserted into any children, delete and re-insert
    const item = this.items.get(id);
    if (item) {
      this.items.delete(item.id);
      this.recursive_insert(item);
    } else {
      console.error("COULD NOT FIND ITEM WITH ID: " + id);
    }
  }
}
