import { HasId, Id } from "../Id";
import { GlobalRect } from "../math/geometry/Rect";
import { QuadTree } from "./QuadTree";
import { QuadTreeBranchNode } from "./QuadTreeBranchNode";
import { QuadTreeBranchNodeChildIndex, QuadTreeNode } from "./QuadTreeNode";

export default abstract class QuadTreeLeafNode<
  ItemType extends HasId,
  BranchType extends QuadTreeBranchNode<
    ItemType,
    QuadTreeLeafNode<ItemType, BranchType>,
    BranchType
  >
> extends QuadTreeNode<ItemType> {
  public readonly type = "Leaf";
  public readonly item_ids: Set<Id> = new Set();

  constructor(
    dim: GlobalRect,
    index: QuadTreeBranchNodeChildIndex,
    protected readonly depth: number,
    protected readonly max_depth: number,
    protected readonly items: Map<Id, ItemType>,
    protected readonly parent: BranchType,
    running_item_ids?: Set<Id>
  ) {
    super(dim, index);

    if (running_item_ids) {
      const ids = Array.from(running_item_ids.values());
      for (let i: number = 0; i < ids.length; i++) {
        const item = this.items.get(ids[i]);
        if (item) this.insert(item);
      }
    }
  }

  public insert(item: ItemType) {
    this.item_ids.add(item.id);

    if (
      this.item_ids.size > QuadTree.max_leaf_size &&
      this.depth !== this.max_depth
    ) {
      const new_branch = this.make_branch_from_this();
      this.parent.remake_node(this.index, new_branch);
    }
  }

  public remove(item: ItemType) {
    this.item_ids.delete(item.id);
    this.parent.attempt_collapse_branch();
  }

  public abstract item_falls_inside(item: ItemType): boolean;

  protected abstract make_branch_from_this(): BranchType;
}
