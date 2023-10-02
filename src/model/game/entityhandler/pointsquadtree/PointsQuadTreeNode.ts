import { Id } from "../../../common/Id";
import { GTCollision } from "../../../common/physics/collision/GTCollision";
import { StaticPoint } from "../../../common/physics/geometry/Point";
import { GlobalRect } from "../../../common/physics/geometry/Rect";
import { QuadTreeNode } from "../../../common/quadtree/QuadTreeNode";
import { Entity } from "../../entitymodel/entity/Entity";

export class PointsQuadTreeNode<EntityType extends Entity> extends QuadTreeNode<
  EntityType,
  PointsQuadTreeNode<EntityType>
> {
  public is_completely_in_bounding_box(item: EntityType): boolean {
    return this.point_falls_in_this_bounding_box(item.game_space_data.pos);
  }

  protected get_child_node(
    top: number,
    left: number,
    bottom: number,
    right: number
  ): PointsQuadTreeNode<EntityType> {
    return new PointsQuadTreeNode(top, left, bottom, right, this);
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

  public search_by_bounding_box(
    box: GlobalRect,
    filter?: (e: EntityType) => boolean
  ): EntityType[] {
    let results: EntityType[] = []; //check this's items
    this.items.forEach((item) => {
      if (
        GTCollision.IsInBoundingBox(
          item.game_space_data.pos,
          box.top,
          box.left,
          box.bottom,
          box.right
        ) &&
        (!filter || filter(item))
      ) {
        results.push(item);
      }
    });

    if (this.nodes) {
      for (const node of this.nodes) {
        //if box and node overlap (top and right are not inclusive)
        if (
          box.bottom < node.top &&
          box.top >= node.bottom &&
          box.left < node.right &&
          box.right >= node.left
        ) {
          //search in node too
          results = results.concat(node.search_by_bounding_box(box, filter));
        }
      }
    }

    return results;
  }
}
