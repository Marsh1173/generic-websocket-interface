import { HasId, Id } from "../Id";
import { GlobalRect, Rect } from "../math/geometry/Rect";
import { QuadTreeBranchNode } from "./QuadTreeBranchNode";
import QuadTreeLeafNode from "./QuadTreeLeafNode";

export abstract class QuadTree<
  ItemType extends HasId,
  LeafType extends QuadTreeLeafNode<ItemType, BranchType>,
  BranchType extends QuadTreeBranchNode<ItemType, LeafType, BranchType>,
  SearcherType
> {
  /**
   * An arbitrary value - it seems to work better than most, but not thoroughly tested.
   */
  public static readonly max_leaf_size: number = 8;

  protected readonly items: Map<Id, ItemType> = new Map();
  protected abstract readonly root: BranchType;
  protected readonly max_depth: number;
  protected readonly dim: GlobalRect;

  public abstract readonly search: SearcherType;

  constructor(size: Rect) {
    // This ensures the deepest nodes' longest side is always between 1 and 2 units.
    this.max_depth = Math.ceil(Math.log2(Math.max(size.w, size.h))) - 1;
    this.dim = this.calculate_dim(size);
  }

  public insert(item: ItemType) {
    if (this.items.has(item.id)) {
      throw new Error(
        "Tried to insert item that was already inserted with id " +
          item.id +
          ":\n" +
          JSON.stringify(item)
      );
    }

    this.items.set(item.id, item);
    this.root.insert(item);
  }

  public remove(id: Id) {
    let item = this.items.get(id);
    if (item) {
      this.items.delete(id);
      this.root.remove(item);
    }
  }

  private calculate_dim(size: Rect): GlobalRect {
    return { top: size.h, right: size.w, bottom: 0, left: 0 };
  }
}
