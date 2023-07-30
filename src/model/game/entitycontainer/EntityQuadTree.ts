import { Entity } from "../entitymodel/entity/Entity";
import { Rect } from "../../utils/physics/geometry/Rect";
import { IEntityContainer } from "./EntityContainer";
import { EntityQuadTreeNode } from "./EntityQuadTreeNode";
import { QuadTree } from "../../utils/quadtree/QuadTree";
import { IBehaviorModule } from "../entitymodel/modules/behavior/BehaviorModule";
import { Id } from "../../utils/Id";

export class EntityQuadTree
  extends QuadTree<Entity, EntityQuadTreeNode>
  implements IEntityContainer
{
  protected entity_behaviors: Map<Id, IBehaviorModule> = new Map();

  protected get_root_node(dimensions: Rect): EntityQuadTreeNode {
    return new EntityQuadTreeNode(dimensions.h, 0, 0, dimensions.w, undefined);
  }

  public insert(item: Entity): void {
    if (item.behavior_module) {
      this.entity_behaviors.set(item.id, item.behavior_module);
    }

    super.insert(item);
  }

  public remove(item: Entity): void {
    this.entity_behaviors.delete(item.id);
    item.deconstruct_module.on_deconstruct();

    super.remove(item);
  }

  public perform_all_behaviors(elapsed_seconds: number): void {
    for (const behavior of this.entity_behaviors.values()) {
      behavior.update(elapsed_seconds);
    }
  }

  //function to recalc node for moving entities tht doesn't deconstruct them.
}
