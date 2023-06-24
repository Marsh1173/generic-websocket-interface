import { Entity } from "../entities/model/entity/Entity";
import { QuadTreeNode } from "../model/quadtree/QuadTreeNode";
import { IsInBoundingBox } from "../physics/math/IsInBoundingBox";

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
    //   if (!IsInBoundingBox(v, this.top, this.left, this.bottom, this.right)) {
    //     return false;
    //   }
    // }
    // return true;
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
