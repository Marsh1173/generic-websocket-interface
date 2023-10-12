import { Id } from "../../../common/Id";
import { StaticPoint } from "../../../common/math/geometry/Point";
import QuadTreeLeafNode from "../../../common/quadtree/QuadTreeLeafNode";
import { DebugQuadTreeData } from "../../devtools/ShowEntityQuadTree";
import { Entity } from "../../entitymodel/entity/Entity";
import { PointsQuadTreeBranchNode } from "./PointsQuadTreeBranchNode";

export class PointsQuadTreeLeafNode<EntityType extends Entity> extends QuadTreeLeafNode<
  EntityType,
  PointsQuadTreeBranchNode<EntityType>
> {
  public make_branch_from_this(): PointsQuadTreeBranchNode<EntityType> {
    return new PointsQuadTreeBranchNode(
      this.dim,
      this.index,
      this.depth,
      this.max_depth,
      this.items,
      this.item_ids,
      this.parent
    );
  }

  public item_falls_inside(item: EntityType): boolean {
    return this.point_falls_in_this_bounding_box(item.game_space_data.pos);
  }

  public re_insert_point() {
    // if we get here, the point we're recalculating hasn't moved out of this leaf, so it doesn't matter
  }

  public remove_by_prev_pos(prev_pos: StaticPoint, id: Id) {
    const item = this.items.get(id);
    if (item) {
      this.remove(item);
    }
  }

  public debug_get_tree(): DebugQuadTreeData {
    return {
      dims: this.dim,
      item_count: this.item_ids.size,
    };
  }
}
