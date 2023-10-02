import { Id } from "../../../common/Id";
import { StaticPoint } from "../../../common/physics/geometry/Point";
import { GlobalRect, Rect } from "../../../common/physics/geometry/Rect";
import { QuadTree } from "../../../common/quadtree/QuadTree";
import { Entity } from "../../entitymodel/entity/Entity";
import { PointsQuadTreeNode } from "./PointsQuadTreeNode";

export class PointsQuadTree<EntityType extends Entity> extends QuadTree<
  EntityType,
  PointsQuadTreeNode<EntityType>
> {
  protected get_root_node(dimensions: Rect): PointsQuadTreeNode<EntityType> {
    return new PointsQuadTreeNode(dimensions.h, 0, 0, dimensions.w, undefined);
  }

  public re_insert_point(id: Id, prev_pos: StaticPoint) {
    this.root.re_insert_point(id, prev_pos);
  }

  public search_by_bounding_box(
    box: GlobalRect,
    filter?: (e: EntityType) => boolean
  ): EntityType[] {
    return this.root.search_by_bounding_box(box, filter);
  }
}
