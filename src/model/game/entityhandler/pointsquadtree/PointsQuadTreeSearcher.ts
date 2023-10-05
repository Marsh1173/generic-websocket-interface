import { Id } from "../../../common/Id";
import { GlobalRect } from "../../../common/math/geometry/Rect";
import { Entity } from "../../entitymodel/entity/Entity";
import { PointsQuadTreeBranchNode } from "./PointsQuadTreeBranchNode";
import { PointsQuadTreeLeafNode } from "./PointsQuadTreeLeafNode";
import { set_union } from "../../../common/SetUnion";
import { GTCollision } from "../../../common/math/collision/GTCollision";

export class PointsQuadTreeSearcher<EntityType extends Entity> {
  constructor(
    protected readonly items: Map<Id, EntityType>,
    protected readonly root: PointsQuadTreeBranchNode<EntityType>
  ) {}

  public by_bounding_box(box: GlobalRect): EntityType[] {
    const entity_ids = this.by_bounding_box_recursive(box, this.root);
    if (!entity_ids) {
      return [];
    }

    return Array.from(entity_ids.values()).reduce(
      (running: EntityType[], id) => {
        const entity = this.items.get(id);
        if (
          entity &&
          GTCollision.IsInBoundingBox(entity.game_space_data.pos, box)
        ) {
          return running.concat(entity);
        } else {
          return running;
        }
      },
      []
    );
  }

  private by_bounding_box_recursive(
    box: GlobalRect,
    node:
      | PointsQuadTreeBranchNode<EntityType>
      | PointsQuadTreeLeafNode<EntityType>
  ): Set<Id> | undefined {
    if (node.bounding_box_intersects(box)) {
      if (node.type === "Branch") {
        return set_union(
          ...node.children.reduce((running: Set<Id>[], child_node) => {
            const result = this.by_bounding_box_recursive(box, child_node);
            if (result) {
              return running.concat(result);
            }
            return running;
          }, [])
        );
      } else if (node.type === "Leaf") {
        return node.item_ids;
      }
    } else {
      return undefined;
    }
  }
}
