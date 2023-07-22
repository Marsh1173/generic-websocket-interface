import { Tree } from "../entities/tree/Tree";
import { Entity } from "../entitymodel/entity/Entity";
import { Rect } from "../../utils/physics/geometry/Rect";
import { IEntityContainer } from "./EntityContainer";
import { EntityQuadTreeNode } from "./EntityQuadTreeNode";
import { QuadTree } from "../../utils/quadtree/QuadTree";

export class EntityQuadTree
  extends QuadTree<Entity, EntityQuadTreeNode>
  implements IEntityContainer
{
  protected get_root_node(dimensions: Rect): EntityQuadTreeNode {
    return new EntityQuadTreeNode(dimensions.h, 0, 0, dimensions.w, undefined);
  }

  public remove(item: Tree): void {
    item.deconstruct_module.on_deconstruct();
    super.remove(item);
  }
}
