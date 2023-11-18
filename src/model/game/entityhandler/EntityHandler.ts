import { Id } from "../../common/Id";
import { StaticRect } from "../../common/math/geometry/Rect";
import { Entity } from "../entitymodel/entity/Entity";
import { DynamicPoint } from "../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { IBehaviorModule } from "../entitymodel/modules/behavior/BehaviorModule";
import { EntityFactory } from "./factory/EntityFactory";
import { EntityFinder } from "./finder/EntityFinder";
import { PhysicsEngine } from "./physics/PhysicsEngine";

export interface EntityHandlerApi {
  readonly make: EntityFactory;
  readonly find: EntityFinder;
  readonly physics: PhysicsEngine;
  perform_all_behaviors(elapsed_seconds: number): void;
  remove(entity: Entity): void;
}

export abstract class EntityHandler implements EntityHandlerApi {
  public abstract readonly make: EntityFactory;
  public abstract readonly find: EntityFinder;
  public readonly physics: PhysicsEngine;

  public readonly entity_map: Map<Id, Entity> = new Map();
  public readonly behaviors_map: Map<Id, IBehaviorModule> = new Map();
  public readonly dynamic_points_map: Map<Id, DynamicPoint> = new Map();

  constructor(protected readonly map_dimensions: StaticRect) {
    this.physics = new PhysicsEngine(this.dynamic_points_map, this.map_dimensions);
  }

  public insert(entity: Entity) {
    this.entity_map.set(entity.id, entity);
    if (entity.behavior_module) {
      this.behaviors_map.set(entity.id, entity.behavior_module);
    }

    if (entity.game_space_data.type === "DynamicPoint") {
      this.dynamic_points_map.set(entity.id, entity.game_space_data);
    } else if (entity.game_space_data.type === "StaticCollidableShape") {
    }
  }

  public remove(entity: Entity) {
    this.entity_map.delete(entity.id);
    this.behaviors_map.delete(entity.id);
    this.dynamic_points_map.delete(entity.id);

    entity.deconstruct_module.on_deconstruct();
  }

  public remove_by_id(id: Id) {
    const possible_entity = this.find.by_id(id);
    if (possible_entity) this.remove(possible_entity);
  }

  public perform_all_behaviors(elapsed_seconds: number): void {
    for (const behavior of this.behaviors_map.values()) {
      behavior.update(elapsed_seconds);
    }
  }
}
