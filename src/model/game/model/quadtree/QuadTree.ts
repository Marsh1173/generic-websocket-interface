import { HasId, Id } from "../../../utils/Id";
import { Rect } from "../../physics/geometry/Rect";
import { QuadTreeNode } from "./QuadTreeNode";

export abstract class QuadTree<ItemType extends HasId> {
  protected readonly items: Map<Id, ItemType> = new Map();
  protected readonly root: QuadTreeNode<ItemType>;

  public constructor(dimensions: Rect) {
    this.root = new QuadTreeNode(dimensions.h, 0, 0, dimensions.w);
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

  public remove(shape: ItemType) {
    this.items.delete(shape.id);
    this.root.recursive_remove(shape);
  }

  public get_by_id(id: Id): ItemType | undefined {
    return this.items.get(id);
  }
}
