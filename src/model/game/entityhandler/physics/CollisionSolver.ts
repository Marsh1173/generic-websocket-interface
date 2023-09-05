import { StaticSegment } from "../../../common/physics/geometry/Segment";
import { StaticVector } from "../../../common/physics/geometry/Vector";
import { GTMath } from "../../../common/physics/math/GTMath";
import { DynamicPoint } from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { ShapeCollision } from "./CollisionDetector";

export class CollisionSolver {
  public solve_collision(
    collision: ShapeCollision,
    move_segment: StaticSegment,
    physics_module: DynamicPoint,
    original_movement_vector: StaticVector
  ): StaticSegment[] {
    // Step 1: Get cut-off movement vector
    const cut_off_move_vector = this.get_cut_off_move_vector(
      collision,
      move_segment
    );

    // Step 2: Project it onto the shape edge
    const new_move_vector = GTMath.VectorProjection(
      cut_off_move_vector,
      collision.edge_data.edge_vector
    );
    const new_move_segment: StaticSegment = {
      p1: move_segment.p1,
      p2: {
        x: move_segment.p2.x - cut_off_move_vector.x,
        y: move_segment.p2.y - cut_off_move_vector.y,
      },
    };

    /**
     * Step 3: Check if it overshoots the shape edge's corner. If so, project it onto next
     * edge OR original movement direction, whichever magnitude is longer
     */
    const overshoot_segment = this.get_overshoot_vector(new_move_vector);
    if (overshoot_segment) {
      //subtract end segment from new move segment
    }

    return [new_move_segment];
  }

  private get_cut_off_move_vector(
    collision: ShapeCollision,
    move_segment: StaticSegment
  ): StaticVector {
    return {
      x: (move_segment.p2.x - move_segment.p1.x) * (1 - collision.v_progress),
      y: (move_segment.p2.y - move_segment.p1.y) * (1 - collision.v_progress),
    };
  }

  private get_overshoot_vector(
    new_move_vector: StaticVector
  ): StaticSegment | undefined {
    // return { x: 0, y: 0 };
    return undefined;
  }
}
