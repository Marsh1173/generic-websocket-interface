import { Id } from "../../../common/Id";
import { ShapesQuadTreeBranchNode } from "./ShapesQuadTreeBranchNode";
import { StaticCollidableShapeWithId } from "../../entitymodel/gamespacedata/staticcollidableshape/StaticCollidableShape";
import { StaticSegment } from "../../../common/math/geometry/Segment";
import { GlobalRect } from "../../../common/math/geometry/Rect";
import { GTCollision } from "../../../common/math/collision/GTCollision";
import { set_union } from "../../../common/SetUnion";
import { ShapesQuadTreeLeafNode } from "./ShapesQuadTreeLeafNode";

export class ShapesQuadTreeSearcher {
  constructor(
    protected readonly items: Map<Id, StaticCollidableShapeWithId>,
    protected readonly root: ShapesQuadTreeBranchNode
  ) {}

  /**
   * Efficiently searches for all shapes that the segment intersects with. Guarantees
   * that the bounding box of the segment intersects the bounding box of any returned
   * shape.
   */
  public by_segment(seg: StaticSegment): StaticCollidableShapeWithId[] {
    return this.by_bounding_box({
      top: Math.max(seg.p1.y, seg.p2.y),
      left: Math.min(seg.p1.x, seg.p2.x),
      bottom: Math.min(seg.p1.y, seg.p2.y),
      right: Math.max(seg.p1.x, seg.p2.x),
    });
  }

  public by_bounding_box(box: GlobalRect): StaticCollidableShapeWithId[] {
    const entity_ids = this.by_bounding_box_recursive(box, this.root);
    if (!entity_ids) {
      return [];
    }

    return Array.from(entity_ids.values()).reduce((running: StaticCollidableShapeWithId[], id) => {
      const game_space_data = this.items.get(id);
      if (game_space_data && GTCollision.BoundingBoxCollision(game_space_data.shape.bounding_box, box)) {
        return running.concat(game_space_data);
      } else {
        return running;
      }
    }, []);
  }

  private by_bounding_box_recursive(
    box: GlobalRect,
    node: ShapesQuadTreeBranchNode | ShapesQuadTreeLeafNode
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
