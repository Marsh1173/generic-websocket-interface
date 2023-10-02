import { Id } from "../../../common/Id";
import { Point, StaticPoint } from "../../../common/physics/geometry/Point";
import { StaticSegment } from "../../../common/physics/geometry/Segment";
import { StaticVector } from "../../../common/physics/geometry/Vector";
import { Entity } from "../../entitymodel/entity/Entity";
import { DynamicPoint } from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { CollidableShapesQuadTree } from "../collidableshapes/CollidableShapesQuadTree";
import { PointsQuadTree } from "../pointsquadtree/PointsQuadTree";
import { CollisionDetector, ShapeCollision } from "./CollisionDetector";
import { CollisionSolver } from "./CollisionSolver";

export class PhysicsEngine {
  protected readonly detector: CollisionDetector;
  protected readonly solver: CollisionSolver = new CollisionSolver();

  constructor(
    protected readonly dynamic_points_map: Map<Id, DynamicPoint>,
    protected readonly dynamic_points: PointsQuadTree<Entity>,
    collidable_shapes: CollidableShapesQuadTree
  ) {
    this.detector = new CollisionDetector(collidable_shapes);
  }

  public execute(elapsed_seconds: number): void {
    // Step 1: move all dynamic entities to where their velocities push them.
    for (const [id, physics_module] of this.dynamic_points_map.entries()) {
      physics_module.update(elapsed_seconds);

      if (!Point.nearly_equals(physics_module.pos, physics_module.prev_pos)) {
        if (physics_module.collision) {
          this.execute_physics(physics_module);
        }
        this.dynamic_points.re_insert_point(id, physics_module.prev_pos);
      }
    }
  }

  private execute_physics(physics_module: DynamicPoint): void {
    // If position changed, and entity can collide...
    const collision_map: Map<Id, StaticPoint> = new Map();
    let has_collided: ShapeCollision | undefined = undefined;

    const original_movement_segment: StaticSegment = {
      p1: physics_module.prev_pos,
      p2: physics_module.pos,
    };
    const original_movement_vector: StaticVector = {
      x: original_movement_segment.p2.x - original_movement_segment.p1.x,
      y: original_movement_segment.p2.y - original_movement_segment.p1.y,
    };

    let current_move_segments: StaticSegment[] = [original_movement_segment];
    let current_move_segment: StaticSegment | undefined;

    // Step 2: Find where their movement caused them to collide with shapes;
    while (true) {
      current_move_segment = current_move_segments.shift();
      if (current_move_segment === undefined) {
        break;
      } else {
        physics_module.pos.x = current_move_segment.p2.x;
        physics_module.pos.y = current_move_segment.p2.y;
      }

      const detected_collision: ShapeCollision | undefined =
        this.detector.detect_collisions(current_move_segment);

      if (detected_collision === undefined) {
        continue;
      } else {
        has_collided = detected_collision;
      }

      const collision_point = this.get_collision_point(
        current_move_segment,
        detected_collision.v_progress
      );

      //Step 3: If the entity has already collided with the same shape in the same spot, break out.
      if (
        this.check_if_looping_collisions(
          collision_point,
          detected_collision,
          collision_map,
          physics_module
        )
      ) {
        break;
      } else {
        collision_map.set(detected_collision.shape_id, collision_point);
      }

      // Step 4: Solve collision, if necessary
      current_move_segments = this.solver.solve_collision(
        detected_collision,
        current_move_segment,
        physics_module,
        original_movement_vector
      );
    }

    // Step 5: Notify physics module
    if (has_collided) {
      physics_module.on_collide(has_collided);
    }
  }

  private check_if_looping_collisions(
    collision_point: StaticPoint,
    detected_collision: ShapeCollision,
    collision_map: Map<Id, StaticPoint>,
    physics_module: DynamicPoint
  ): boolean {
    const possible_prev_shape_collision = collision_map.get(
      detected_collision.shape_id
    );

    if (
      possible_prev_shape_collision &&
      Point.nearly_equals(collision_point, possible_prev_shape_collision)
    ) {
      physics_module.pos.x = collision_point.x;
      physics_module.pos.y = collision_point.y;
      return true;
    }
    return false;
  }

  private get_collision_point(
    move_seg: StaticSegment,
    v_progress: number
  ): StaticPoint {
    return {
      x: move_seg.p1.x + v_progress * (move_seg.p2.x - move_seg.p1.x),
      y: move_seg.p1.y + v_progress * (move_seg.p2.y - move_seg.p1.y),
    };
  }
}
