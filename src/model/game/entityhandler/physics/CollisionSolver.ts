import { StaticPoint } from "../../../common/math/geometry/Point";
import { StaticSegment } from "../../../common/math/geometry/Segment";
import { StaticVector } from "../../../common/math/geometry/Vector";
import { GTMath } from "../../../common/math/basic/GTMath";
import { DynamicPoint } from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { ShapeCollision } from "./CollisionDetector";

export class CollisionSolver {
  /**
   * Step 1: Get cut-off movement vector.
   * Step 2: Move physics module to collision point.
   * Step 3: Project it onto the shape edge.
   * Step 4: Check if it overshoots the shape edge's corner. If so, turn overshoot back into the original movement direction.
   */
  public solve_collision(
    collision: ShapeCollision,
    move_segment: StaticSegment,
    physics_module: DynamicPoint,
    original_move_vector: StaticVector
  ): StaticSegment[] {
    // Step 1
    const cut_off_move_vector = this.get_cut_off_move_vector(collision, move_segment);

    // Step 2
    physics_module.pos.x = move_segment.p2.x - cut_off_move_vector.x;
    physics_module.pos.y = move_segment.p2.y - cut_off_move_vector.y;

    // Step 3
    const projected_scalar: number = GTMath.ScalarProjection(cut_off_move_vector, collision.edge_data.edge_vector);
    const new_move_vector = {
      x: collision.edge_data.edge_vector.x * projected_scalar,
      y: collision.edge_data.edge_vector.y * projected_scalar,
    };
    const new_move_segment: StaticSegment = {
      p1: {
        x: physics_module.pos.x,
        y: physics_module.pos.y,
      },
      p2: {
        x: physics_module.pos.x + new_move_vector.x,
        y: physics_module.pos.y + new_move_vector.y,
      },
    };

    // Step 4
    // const overshoot_seg = this.get_possible_overshoot_segment(
    //   projected_scalar,
    //   new_move_vector,
    //   collision,
    //   original_move_vector
    // );

    // return overshoot_seg ? [new_move_segment, overshoot_seg] : [new_move_segment];
    return [new_move_segment];
  }

  private get_cut_off_move_vector(collision: ShapeCollision, move_segment: StaticSegment): StaticVector {
    return {
      x: (move_segment.p2.x - move_segment.p1.x) * (1 - collision.v_progress),
      y: (move_segment.p2.y - move_segment.p1.y) * (1 - collision.v_progress),
    };
  }

  /**
   * Step 1: Find proportion of new move vector that goes past the corner, if at all.
   * Step 2: Find the vector from the new_move_vector that overshoots the corner.
   * Step 3: Find the original_move_vector in terms of the overshoot vector.
   * Step 4: Multiply by the original_move_vector to find the real overshoot vector
   */
  private get_possible_overshoot_segment(
    projected_scalar: number,
    new_move_vector: StaticVector,
    collision: ShapeCollision,
    original_move_vector: StaticVector
  ): StaticSegment | undefined {
    // Step 1
    let overshoot_progress: number = collision.edge_progress + projected_scalar;
    let corner: StaticPoint;
    if (overshoot_progress < 0) {
      corner = collision.edge_data.edge_segment.p1;
    } else if (overshoot_progress > 1) {
      corner = collision.edge_data.edge_segment.p2;
      overshoot_progress -= 1;
    } else {
      return undefined;
    }

    // Step 2
    const overshoot_vector: StaticVector = {
      x: new_move_vector.x * overshoot_progress,
      y: new_move_vector.y * overshoot_progress,
    };

    // Step 3
    const og_move_scalar: number = GTMath.ScalarProjection(original_move_vector, overshoot_vector);

    // Step 4
    return {
      p1: corner,
      p2: {
        x: corner.x + original_move_vector.x * og_move_scalar,
        y: corner.y + original_move_vector.y * og_move_scalar,
      },
    };
  }
}
