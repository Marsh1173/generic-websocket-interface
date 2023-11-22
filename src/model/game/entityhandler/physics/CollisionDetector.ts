// import { Id } from "../../../common/Id";
// import { GTCollision } from "../../../common/math/collision/GTCollision";
// import { StaticSegment } from "../../../common/math/geometry/Segment";
// import { ShapeVertexData } from "../../../common/math/geometry/Shape";
// import { StaticCollidableShapeWithId } from "../../entitymodel/gamespacedata/staticcollidableshape/StaticCollidableShape";
// import { ShapesQuadTree } from "../shapesquadtree/ShapesQuadTree";

// export class CollisionDetector {
//   constructor(protected readonly collidable_shapes: ShapesQuadTree) {}

//   public detect_collisions(move_segment: StaticSegment): ShapeCollision | undefined {
//     // Step 1: Broad search (quick and easy search for "possibly collide" shapes)
//     const broad_search_shapes = this.broad_search(move_segment);

//     // Step 2: Narrow search (longer search for "definitely collide" shape data)
//     const narrow_search_collisions = this.narrow_search(move_segment, broad_search_shapes);

//     // Step 3: Find closest valid collision
//     return this.find_closest_collision(narrow_search_collisions);
//   }

//   protected broad_search(move_segment: StaticSegment): StaticCollidableShapeWithId[] {
//     return this.collidable_shapes.search.by_segment(move_segment);
//   }

//   protected narrow_search(
//     move_segment: StaticSegment,
//     broad_search_shapes: StaticCollidableShapeWithId[]
//   ): ShapeCollision[] {
//     return broad_search_shapes.flatMap((shape) => {
//       /**
//        * Check:
//        * 1. that the segment intersects the shape,
//        */

//       const possible_collision = GTCollision.SegmentCollidesWithStaticShape(move_segment, shape.shape);

//       if (possible_collision) {
//         return [
//           {
//             shape_id: shape.id,
//             v_progress: possible_collision.seg_progress,
//             edge_progress: possible_collision.edge_progress,
//             edge_data: possible_collision.shape_vertex_data,
//           },
//         ];
//       } else {
//         return [];
//       }
//     });
//   }

//   protected find_closest_collision(collisions: ShapeCollision[]): ShapeCollision | undefined {
//     let closest: ShapeCollision | undefined = undefined;

//     collisions.forEach((collision) => {
//       if (!closest || closest.v_progress < collision.v_progress) {
//         closest = collision;
//       }
//     });

//     return closest;
//   }
// }

// export interface ShapeCollision {
//   shape_id: Id;
//   /**
//    * Line edge that the entity is colliding with
//    */
//   edge_data: ShapeVertexData;
//   /**
//    * Percent (0-1) along the entity's movement that they collided with the shape
//    */
//   v_progress: number;
//   edge_progress: number;
// }
