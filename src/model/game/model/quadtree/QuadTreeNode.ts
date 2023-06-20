import { HasId, Id } from "../../../utils/Id";
import { IsInBoundingBox } from "../../physics/math/IsInBoundingBox";

const MAX_NODE_SIZE: number = 10;

export abstract class QuadTreeNode<ItemType extends HasId> {
  /**This node contains all items completely contained in this node
   * (unless this node has subnodes, then excluding items that completely fit into the subnodes)
   */
  protected readonly items: Map<Id, ItemType> = new Map();

  /** If this node has been subdivided, this node will contain 4 subnodes.
   *  Nodes in order: top right, top left, bottom left, bottom right;
   */
  protected nodes?: [
    QuadTreeNode<ItemType>,
    QuadTreeNode<ItemType>,
    QuadTreeNode<ItemType>,
    QuadTreeNode<ItemType>
  ];

  /**
   * Top and right are not inclusive;
   */
  constructor(
    protected readonly top: number,
    protected readonly left: number,
    protected readonly bottom: number,
    protected readonly right: number,
    protected readonly parent_node?: QuadTreeNode<ItemType>
  ) {}

  public recursive_insert(item: ItemType) {
    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.is_completely_in_bounding_box(item)) {
          node.recursive_insert(item);
          return;
        }
      }
      // Only insert into this if the shape doesn't completely fit into any child nodes but fits in this node.
      if (!this.parent_node || this.is_completely_in_bounding_box(item)) {
        this.items.set(item.id, item);
      } else {
        this.parent_node.recursive_insert(item);
      }
    } else {
      this.items.set(item.id, item);

      if (this.items.size > MAX_NODE_SIZE) {
        // Subdivide and distribute shapes.
        this.set_nodes();
        for (const [id, shape] of this.items) {
          this.items.delete(id);
          this.recursive_insert(shape);
        }
      }
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

  public is_completely_in_bounding_box(item: ItemType): boolean {
    for (const v of item.vertices) {
      if (!IsInBoundingBox(v, this.top, this.left, this.bottom, this.right)) {
        return false;
      }
    }
    return true;
  }

  protected set_nodes() {
    const mid_x: number = Math.floor(this.right + this.left) / 2;
    const mid_y: number = Math.floor(this.top + this.bottom) / 2;
    this.nodes = [
      new QuadTreeNode<ItemType>(this.top, mid_x, mid_y, this.right, this),
      new QuadTreeNode<ItemType>(this.top, this.left, mid_y, mid_x, this),
      new QuadTreeNode<ItemType>(mid_y, this.left, this.bottom, mid_x, this),
      new QuadTreeNode<ItemType>(mid_y, mid_x, this.bottom, this.right, this),
    ];
  }
}
