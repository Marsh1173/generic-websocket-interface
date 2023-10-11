import { QuadTreeBranchNodeChildIndex, QuadTreeNode } from "./QuadTreeNode";
import QuadTreeLeafNode from "./QuadTreeLeafNode";
import { GlobalRect } from "../math/geometry/Rect";
import { HasId, Id } from "../Id";
import { QuadTree } from "./QuadTree";
import { set_union } from "../SetUnion";

export abstract class QuadTreeBranchNode<
  ItemType extends HasId,
  LeafType extends QuadTreeLeafNode<ItemType, BranchType>,
  BranchType extends QuadTreeBranchNode<ItemType, LeafType, BranchType>
> extends QuadTreeNode<ItemType> {
  public readonly type = "Branch";

  constructor(
    dim: GlobalRect,
    index: QuadTreeBranchNodeChildIndex,
    protected readonly depth: number,
    protected readonly max_depth: number,
    protected readonly items: Map<Id, ItemType>,
    running_item_ids: Set<string>,
    protected readonly parent?: BranchType
  ) {
    super(dim, index);

    const mid_x: number = (this.dim.right + this.dim.left) / 2;
    const mid_y: number = (this.dim.top + this.dim.bottom) / 2;
    this.children = [
      this.make_child_leaf({ ...this.dim, bottom: mid_y, left: mid_x }, 0),
      this.make_child_leaf({ ...this.dim, bottom: mid_y, right: mid_x }, 1),
      this.make_child_leaf({ ...this.dim, top: mid_y, right: mid_x }, 2),
      this.make_child_leaf({ ...this.dim, top: mid_y, left: mid_x }, 3),
    ];

    const ids = Array.from(running_item_ids.values());
    for (let i: number = 0; i < ids.length; i++) {
      const item = this.items.get(ids[i]);
      if (item) this.insert(item);
    }
  }

  /**
   * Nodes in order: top right, top left, bottom left, bottom right
   */
  public readonly children: [
    LeafType | BranchType,
    LeafType | BranchType,
    LeafType | BranchType,
    LeafType | BranchType
  ];

  public insert(item: ItemType) {
    this.children.forEach((child) => {
      if (child.item_falls_inside(item)) {
        child.insert(item);
      }
    });
  }

  public remove(item: ItemType) {
    this.children.forEach((child) => {
      if (child.item_falls_inside(item)) {
        child.remove(item);
      }
    });
  }

  public remake_node(
    index: QuadTreeBranchNodeChildIndex,
    new_node: LeafType | BranchType
  ) {
    this.children[index] = new_node;
  }

  public attempt_collapse_branch() {
    if (this.parent) {
      const combined_item_ids = this.item_ids;
      if (combined_item_ids.size <= QuadTree.max_leaf_size) {
        const new_leaf = this.make_this_leaf(this.parent, combined_item_ids);
        this.parent.remake_node(this.index, new_leaf);
      }
    }
  }

  public abstract item_falls_inside(item: ItemType): boolean;

  protected abstract make_child_leaf(
    dim: GlobalRect,
    index: QuadTreeBranchNodeChildIndex
  ): LeafType;

  protected abstract make_this_leaf(
    parent: BranchType,
    item_ids?: Set<string> | undefined
  ): LeafType;

  public get item_ids(): Set<Id> {
    return set_union(...this.children.map((c) => c.item_ids));
  }
}
