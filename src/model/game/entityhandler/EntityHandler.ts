import { Id } from "../../common/Id";
import { Rect, StaticRect } from "../../common/math/geometry/Rect";
import { Entity } from "../entitymodel/entity/Entity";
import { DynamicPoint } from "../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { IBehaviorModule } from "../entitymodel/modules/behavior/BehaviorModule";
import { ShapesQuadTree } from "./shapesquadtree/ShapesQuadTree";
import { PointsQuadTree } from "./pointsquadtree/PointsQuadTree";
import { EntityFactory } from "./factory/EntityFactory";
import { EntityFinder } from "./finder/EntityFinder";
import { PhysicsEngine } from "./physics/PhysicsEngine";

export interface EntityHandlerApi {
  readonly make: EntityFactory;
  readonly find: EntityFinder;
  readonly physics: PhysicsEngine;
  readonly entity_points: PointsQuadTree<Entity>;
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

  public readonly collidable_shapes: ShapesQuadTree;
  public readonly entity_points: PointsQuadTree<Entity>;

  public readonly map_size: StaticRect;

  constructor(dimensions: Rect) {
    this.map_size = dimensions;
    this.collidable_shapes = new ShapesQuadTree(this.map_size);
    this.entity_points = new PointsQuadTree(this.map_size);

    this.physics = new PhysicsEngine(
      this.dynamic_points_map,
      this.entity_points,
      this.map_size,
      this.collidable_shapes
    );
  }

  public insert(entity: Entity) {
    this.entity_map.set(entity.id, entity);
    if (entity.behavior_module) {
      this.behaviors_map.set(entity.id, entity.behavior_module);
    }

    if (entity.game_space_data.type === "DynamicPoint") {
      this.dynamic_points_map.set(entity.id, entity.game_space_data);
    } else if (entity.game_space_data.type === "StaticCollidableShape") {
      this.collidable_shapes.insert({
        id: entity.id,
        ...entity.game_space_data,
      });
    }

    this.entity_points.insert(entity);
  }

  public remove(entity: Entity) {
    this.entity_map.delete(entity.id);
    this.behaviors_map.delete(entity.id);
    this.dynamic_points_map.delete(entity.id);

    if (entity.game_space_data.type === "StaticCollidableShape") {
      this.collidable_shapes.remove(entity.id);
    }

    this.entity_points.remove(entity.id);
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
