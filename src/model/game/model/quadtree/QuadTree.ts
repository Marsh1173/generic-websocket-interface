import { HasId, Id } from "../../../utils/Id";
import { Rect } from "../../physics/geometry/Rect";
import { QuadTreeNode } from "./QuadTreeNode";

export abstract class QuadTree<
  ItemType extends HasId,
  NodeType extends QuadTreeNode<ItemType, NodeType>
> {
  protected readonly items: Map<Id, ItemType> = new Map();
  protected readonly root: NodeType;

  public constructor(dimensions: Rect) {
    this.root = this.get_root_node(dimensions);
  }

  public insert(item: ItemType) {
    if (this.items.has(item.id)) {
      console.error("TRIED TO ADD ITEM THAT WAS ALREADY IN TREE:");
      console.error(JSON.stringify(item));
      return;
    }

    this.items.set(item.id, item);
    this.root.recursive_insert(item);
  }

  public remove(item: ItemType) {
    this.items.delete(item.id);
    this.root.recursive_remove(item);
  }

  public get_by_id(id: Id): ItemType | undefined {
    return this.items.get(id);
  }

  protected abstract get_root_node(dimensions: Rect): NodeType;
}
