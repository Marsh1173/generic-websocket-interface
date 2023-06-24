import { Entity } from "../entities/model/entity/Entity";
import { QuadTree } from "../model/quadtree/QuadTree";
import { Rect } from "../physics/geometry/Rect";
import { IEntityContainer } from "./EntityContainer";
import { EntityQuadTreeNode } from "./EntityQuadTreeNode";

export class EntityQuadTree
  extends QuadTree<Entity, EntityQuadTreeNode>
  implements IEntityContainer
{
  protected get_root_node(dimensions: Rect): EntityQuadTreeNode {
    return new EntityQuadTreeNode(dimensions.h, 0, 0, dimensions.w, undefined);
  }
}
