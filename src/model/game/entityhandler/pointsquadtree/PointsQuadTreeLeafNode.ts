import { GTCollision } from "../../../common/math/collision/GTCollision";
import { GlobalRect } from "../../../common/math/geometry/Rect";
import QuadTreeLeafNode from "../../../common/quadtree2/QuadTreeLeafNode";
import { Entity } from "../../entitymodel/entity/Entity";
import { PointsQuadTreeBranchNode } from "./PointsQuadTreeBranchNode";

export class PointsQuadTreeLeafNode<
  EntityType extends Entity
> extends QuadTreeLeafNode<EntityType, PointsQuadTreeBranchNode<EntityType>> {
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

  public bounding_box_intersects(box: GlobalRect): boolean {
    return GTCollision.BoundingBoxCollision(this.dim, box);
  }
}
