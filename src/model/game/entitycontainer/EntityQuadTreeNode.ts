import { Entity } from "../entitymodel/entity/Entity";
import { GTCollision } from "../../utils/physics/collision/GTCollision";
import { QuadTreeNode } from "../../utils/quadtree/QuadTreeNode";
import { GTMath } from "../../utils/physics/math/GTMath";

export class EntityQuadTreeNode extends QuadTreeNode<
  Entity,
  EntityQuadTreeNode
> {
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
    // for (const v of item.vertices) {
    //   if (
    //     !GTCollision.IsInBoundingBox(v, this.top, this.left, this.bottom, this.right)
    //   ) {
    //     return false;
    //   }
    // }
    // return true;
    switch (item.game_space_data.type) {
      case "GameSpaceDynamicPoint":
        return GTCollision.IsInBoundingBox(
          item.game_space_data.pos,
          this.top,
          this.left,
          this.bottom,
          this.right
        );
    }
    return false;
  }

  protected get_child_node(
    top: number,
    left: number,
    bottom: number,
    right: number
  ): EntityQuadTreeNode {
    return new EntityQuadTreeNode(top, left, bottom, right, this);
  }
}
