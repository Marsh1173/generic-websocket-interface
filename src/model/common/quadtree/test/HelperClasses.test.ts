import { HasId, Id } from "../../Id";
import { StaticPoint } from "../../math/geometry/Point";
import { GlobalRect, Rect } from "../../math/geometry/Rect";
import { QuadTree } from "../QuadTree";
import { QuadTreeBranchNode } from "../QuadTreeBranchNode";
import QuadTreeLeafNode from "../QuadTreeLeafNode";
import { QuadTreeBranchNodeChildIndex } from "../QuadTreeNode";

export class TestQuadTree extends QuadTree<
  TestQuadTreeItem,
  TestQuadTreeLeafNode,
  TestQuadTreeBranchNode,
  TestSearcher
> {
  public readonly search: TestSearcher = new TestSearcher();
  public root: TestQuadTreeBranchNode;
  public readonly items: Map<Id, TestQuadTreeItem> = new Map();

  constructor(size: Rect) {
    super(size);
    this.root = new TestQuadTreeBranchNode(
      this.dim,
      0,
      0,
      this.max_depth,
      this.items,
      new Set()
    );
  }

  public get_dim() {
    return this.dim;
  }

  public get_max_depth() {
    return this.max_depth;
  }
}

export class TestQuadTreeBranchNode extends QuadTreeBranchNode<
  TestQuadTreeItem,
  TestQuadTreeLeafNode,
  TestQuadTreeBranchNode
> {
  public item_falls_inside(item: TestQuadTreeItem): boolean {
    return this.point_falls_in_this_bounding_box(item.pos);
  }

  protected make_this_leaf(
    parent: TestQuadTreeBranchNode,
    item_ids?: Set<string>
  ): TestQuadTreeLeafNode {
    return new TestQuadTreeLeafNode(
      this.dim,
      this.index,
      this.depth,
      this.max_depth,
      this.items,
      parent,
      item_ids
    );
  }

  protected make_child_leaf(
    dim: GlobalRect,
    index: QuadTreeBranchNodeChildIndex
  ): TestQuadTreeLeafNode {
    return new TestQuadTreeLeafNode(
      dim,
      index,
      this.depth + 1,
      this.max_depth,
      this.items,
      this
    );
  }

  public get_dim() {
    return this.dim;
  }

  public get_depth() {
    return this.depth;
  }
}

export class TestQuadTreeLeafNode extends QuadTreeLeafNode<
  TestQuadTreeItem,
  TestQuadTreeBranchNode
> {
  public make_branch_from_this(): TestQuadTreeBranchNode {
    return new TestQuadTreeBranchNode(
      this.dim,
      this.index,
      this.depth,
      this.max_depth,
      this.items,
      this.item_ids,
      this.parent
    );
  }

  public item_falls_inside(item: TestQuadTreeItem): boolean {
    return this.point_falls_in_this_bounding_box(item.pos);
  }

  public get_dim() {
    return this.dim;
  }

  public get_depth() {
    return this.depth;
  }
}

export class TestQuadTreeItem extends HasId {
  constructor(public pos: StaticPoint) {
    super();
  }
}

export class TestSearcher {}
