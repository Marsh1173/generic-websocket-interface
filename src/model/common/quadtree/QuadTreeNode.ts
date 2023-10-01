import { HasId, Id } from "../Id";
import { GTCollision } from "../physics/collision/GTCollision";
import { StaticPoint } from "../physics/geometry/Point";

const MAX_NODE_SIZE: number = 5;

export abstract class QuadTreeNode<
  ItemType extends HasId,
  NodeType extends QuadTreeNode<ItemType, NodeType>
> {
  /**
   * This node contains all items completely contained in this node
   * (unless this node has subnodes, then not including items that completely fit into the subnodes)
   */
  protected readonly items: Map<Id, ItemType> = new Map();

  /**
   * If this node has been subdivided, this node will contain 4 subnodes.
   * Nodes in order: top right, top left, bottom left, bottom right;
   */
  protected nodes?: [NodeType, NodeType, NodeType, NodeType];

  /**
   * Top and right are not inclusive;
   */
  constructor(
    protected readonly top: number,
    protected readonly left: number,
    protected readonly bottom: number,
    protected readonly right: number,
    protected readonly parent_node?: NodeType
  ) {}

  public recursive_insert(item: ItemType) {
    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.is_completely_in_bounding_box(item)) {
          node.recursive_insert(item);
          return;
        }
      }
    }

    // Only insert into this if the shape doesn't completely fit into any child nodes but fits in this node.
    if (!this.parent_node || this.is_completely_in_bounding_box(item)) {
      this.items.set(item.id, item);

      if (!this.nodes && this.items.size > MAX_NODE_SIZE) {
        // Subdivide and distribute shapes.
        this.set_nodes();

        const current_items = Array.from(this.items);
        for (const [id, item] of current_items) {
          this.items.delete(id);
          this.recursive_insert(item);
        }
      }
    } else {
      this.parent_node.recursive_insert(item);
    }
  }

  public recursive_remove(item: ItemType) {
    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.is_completely_in_bounding_box(item)) {
          node.recursive_remove(item);
          return;
        }
      }
    }
    this.items.delete(item.id);
  }

  public abstract is_completely_in_bounding_box(item: ItemType): boolean;

  protected set_nodes() {
    const mid_x: number = Math.floor(this.right + this.left) / 2;
    const mid_y: number = Math.floor(this.top + this.bottom) / 2;
    this.nodes = [
      this.get_child_node(this.top, mid_x, mid_y, this.right),
      this.get_child_node(this.top, this.left, mid_y, mid_x),
      this.get_child_node(mid_y, this.left, this.bottom, mid_x),
      this.get_child_node(mid_y, mid_x, this.bottom, this.right),
    ];
  }

  protected abstract get_child_node(
    top: number,
    left: number,
    bottom: number,
    right: number
  ): NodeType;

  protected point_falls_in_this_bounding_box(p: StaticPoint): boolean {
    return GTCollision.IsInBoundingBox(
      p,
      this.top,
      this.left,
      this.bottom,
      this.right
    );
  }
}
