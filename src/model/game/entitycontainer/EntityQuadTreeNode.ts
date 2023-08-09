import { Entity } from "../entitymodel/entity/Entity";
import { GTCollision } from "../../utils/physics/collision/GTCollision";
import { QuadTreeNode } from "../../utils/quadtree/QuadTreeNode";
import { Shape } from "../../utils/physics/geometry/Shape";
import { Point } from "../../utils/physics/geometry/Point";

export class EntityQuadTreeNode extends QuadTreeNode<Entity, EntityQuadTreeNode> {
  /**
   * Top and right are not inclusive;
   */
  constructor(
    protected readonly top: number,
    protected readonly left: number,
    protected readonly bottom: number,
    protected readonly right: number,
    protected readonly parent_node?: EntityQuadTreeNode
  ) {
    super(top, left, bottom, right, parent_node);
  }

  public is_completely_in_bounding_box(item: Entity): boolean {
    switch (item.game_space_data.type) {
      case "StaticCollidableShape":
        return this.shape_is_completely_in_bounding_box(item.game_space_data.shape);
      case "DynamicForceablePoint":
      case "DynamicMovablePoint":
        return this.point_falls_in_this_bounding_box(item.game_space_data.pos);
    }
  }

  private shape_is_completely_in_bounding_box(shape: Shape): boolean {
    for (const v_data of shape.vertices_data) {
      if (!this.point_falls_in_this_bounding_box(v_data.vertex)) {
        return false;
      }
    }
    return true;
  }

  private point_falls_in_this_bounding_box(p: Point): boolean {
    return GTCollision.IsInBoundingBox(p, this.top, this.left, this.bottom, this.right);
  }

  protected get_child_node(top: number, left: number, bottom: number, right: number): EntityQuadTreeNode {
    return new EntityQuadTreeNode(top, left, bottom, right, this);
  }
}
