// import { Movable } from "../../../../common/physics/geometry/Movable";
// import { Point, StaticPoint } from "../../../../common/physics/geometry/Point";
// import { StaticVector, Vector } from "../../../../common/physics/geometry/Vector";

// export interface DynamicPoint extends Movable {
//   update_position(elapsed_seconds: number): void;
//   process_pos_mom_delta(data: PositionUpdateData): void;
// }

// export abstract class DynamicPointModule implements DynamicPoint {
//   public readonly pos: Point;
//   public readonly prev_pos: Point;
//   public readonly prev_mom: Vector;
//   public readonly mom: Vector;

//   constructor(data: DynamicPointData) {
//     this.pos = data.pos;
//     this.prev_pos = { ...data.pos };
//     this.mom = data.mom;
//     this.prev_mom = { ...data.mom };
//   }

//   public update_position(elapsed_seconds: number): void {
//     this.prev_pos.x = this.pos.x;
//     this.prev_pos.y = this.pos.y;

//     this.pos.x += ((this.mom.x + this.prev_mom.x) * elapsed_seconds) / 2;
//     this.pos.y += ((this.mom.y + this.prev_mom.y) * elapsed_seconds) / 2;

//     this.prev_mom.x = this.mom.x;
//     this.prev_mom.y = this.mom.y;
//   }

//   public process_pos_mom_delta(data: PositionUpdateData) {
//     this.pos.x = data.pos.x;
//     this.pos.y = data.pos.y;

//     if (data.mom) {
//       this.mom.x = data.mom.x;
//       this.mom.y = data.mom.y;

//       this.prev_mom.x = data.mom.x;
//       this.prev_mom.y = data.mom.y;
//     }
//   }
// }

// export interface DynamicPointData {
//   pos: StaticPoint;
//   mom: StaticVector;
// }

// export interface HasDynamicPoint {
//   readonly game_space_data: DynamicPoint;
// }

// export interface PositionUpdateData {
//   readonly pos: Point;
//   readonly mom?: Vector;
// }
