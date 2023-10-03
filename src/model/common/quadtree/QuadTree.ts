import { HasId } from "../Id";
import { Rect } from "../math/geometry/Rect";
import { QuadTreeNode } from "./QuadTreeNode";

export abstract class QuadTree<ItemType extends HasId, NodeType extends QuadTreeNode<ItemType, NodeType>> {
  protected readonly root: NodeType;

  public constructor(dimensions: Rect) {
    this.root = this.get_root_node(dimensions);
  }

  public insert(item: ItemType) {
    this.root.recursive_insert(item);
  }

  public remove(item: ItemType) {
    this.root.recursive_remove(item);
  }

  protected abstract get_root_node(dimensions: Rect): NodeType;
}
