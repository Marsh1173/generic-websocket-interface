import { QuadTreeNode } from "../../../common/quadtree/QuadTreeNode";
import { StaticCollidableShapeWithId } from "../../entitymodel/gamespacedata/staticcollidableshape/StaticCollidableShape";
import { GlobalRect } from "../../../common/math/geometry/Rect";

export class CollidableShapesQuadTreeNode extends QuadTreeNode<
  StaticCollidableShapeWithId,
  CollidableShapesQuadTreeNode
> {
  public is_completely_in_bounding_box(item: StaticCollidableShapeWithId): boolean {
    for (const v_data of item.shape.vertices_data) {
      if (!this.point_falls_in_this_bounding_box(v_data.vertex)) {
        return false;
      }
    }
    return true;
  }

  protected get_child_node(top: number, left: number, bottom: number, right: number): CollidableShapesQuadTreeNode {
    return new CollidableShapesQuadTreeNode(top, left, bottom, right, this);
  }

  public search_by_bounding_box(box: GlobalRect): StaticCollidableShapeWithId[] {
    const own_items = [...this.items].flatMap(([id, shape]) => {
      // Check if search bounding box and shape bounding box intersect
      if (
        box.bottom > shape.shape.bounding_box.top ||
        box.top < shape.shape.bounding_box.bottom ||
        box.left > shape.shape.bounding_box.right ||
        box.right < shape.shape.bounding_box.left
      ) {
        return [];
      } else {
        return [shape];
      }
    });

    return [...own_items, ...this.get_nodes_children(box)];
  }

  private get_nodes_children(box: GlobalRect): StaticCollidableShapeWithId[] {
    if (this.nodes) {
      const child_nodes_items = this.nodes
        .map((node) => {
          // Check if bounding box intersects with any children. Top and right are not inclusive
          if (box.bottom >= node.top || box.top < node.bottom || box.left >= node.right || box.right < node.left) {
            return [];
          } else {
            return node.search_by_bounding_box(box);
          }
        })
        .flat();
      return child_nodes_items;
    } else {
      return [];
    }
  }
}
