import { Id } from "../../../common/Id";
import { StaticPoint } from "../../../common/math/geometry/Point";
import { GlobalRect } from "../../../common/math/geometry/Rect";
import { QuadTreeBranchNode } from "../../../common/quadtree/QuadTreeBranchNode";
import { QuadTreeBranchNodeChildIndex } from "../../../common/quadtree/QuadTreeNode";
// import { DebugQuadTreeData } from "../../devtools/ShowEntityQuadTree";
import { Entity } from "../../entitymodel/entity/Entity";
import { PointsQuadTreeLeafNode } from "./PointsQuadTreeLeafNode";

export class PointsQuadTreeBranchNode<EntityType extends Entity> extends QuadTreeBranchNode<
  EntityType,
  PointsQuadTreeLeafNode<EntityType>,
  PointsQuadTreeBranchNode<EntityType>
> {
  public re_insert_point(id: Id, prev_pos: StaticPoint, item: EntityType) {
    for (const child of this.children) {
      if (child.point_falls_in_this_bounding_box(prev_pos)) {
        if (!child.point_falls_in_this_bounding_box(item.game_space_data.pos)) {
          // we've found where the item should be removed
          child.remove_by_prev_pos(prev_pos, id);

          // insert item into the first valid node, looking upward from the child node
          let parent: PointsQuadTreeBranchNode<EntityType> | undefined = this;
          do {
            if (parent.point_falls_in_this_bounding_box(item.game_space_data.pos)) {
              parent.insert(item);
            }
          } while ((parent = parent.parent));
        } else {
          // otherwise, keep checking down
          child.re_insert_point(id, prev_pos, item);
        }
        return;
      }
    }

    //if we ever get to this point, we know we're in the root branch and the item is out of bounds (and not in any of the children).
  }

  public remove_by_prev_pos(prev_pos: StaticPoint, id: Id) {
    this.children.forEach((child) => {
      if (child.point_falls_in_this_bounding_box(prev_pos)) {
        child.remove_by_prev_pos(prev_pos, id);
      }
    });
  }

  public item_falls_inside(item: EntityType): boolean {
    return this.point_falls_in_this_bounding_box(item.game_space_data.pos);
  }

  protected make_this_leaf(
    parent: PointsQuadTreeBranchNode<EntityType>,
    item_ids?: Set<string> | undefined
  ): PointsQuadTreeLeafNode<EntityType> {
    return new PointsQuadTreeLeafNode(this.dim, this.index, this.depth, this.max_depth, this.items, parent, item_ids);
  }

  protected make_child_leaf(dim: GlobalRect, index: QuadTreeBranchNodeChildIndex): PointsQuadTreeLeafNode<EntityType> {
    return new PointsQuadTreeLeafNode(dim, index, this.depth + 1, this.max_depth, this.items, this);
  }

  // public debug_get_tree(): DebugQuadTreeData {
  //   return {
  //     dims: this.dim,
  //     children: this.children.map((child) => child.debug_get_tree()),
  //   };
  // }
}
