// import { Vector } from "../../../../../common/physics/geometry/Vector";
// import { GTMath } from "../../../../../common/physics/math/GTMath";
// import {
//   DynamicPoint,
//   DynamicPointData,
//   DynamicPointModule,
//   HasDynamicPoint,
// } from "../DynamicPoint";

// export interface DynamicForceablePoint extends DynamicPoint {
//   readonly type: "DynamicForceablePoint";
//   instant_act_on(force: Vector): void;
//   constant_act_on(force: Vector, cap?: Vector): void;
// }
// export interface HasDynamicForceablePoint extends HasDynamicPoint {
//   readonly game_space_data: DynamicForceablePoint;
// }

// const DEFAULT_FRICTION_CONST: number = 1.5;

// export class DynamicForceablePointModule
//   extends DynamicPointModule
//   implements DynamicForceablePoint
// {
//   public readonly type = "DynamicForceablePoint";

//   private constant_forces: { force: Vector; cap?: Vector }[] = [];
//   protected readonly friction_const: number | undefined;

//   constructor(
//     data: DynamicPointData,
//     options: {
//       friction_const: number | undefined | "default";
//     }
//   ) {
//     super(data);

//     if (options.friction_const === "default") {
//       this.friction_const = DEFAULT_FRICTION_CONST;
//     } else {
//       this.friction_const = options.friction_const;
//     }
//   }

//   public update_position(elapsed_seconds: number): void {
//     if (this.friction_const) {
//       this.apply_friction(elapsed_seconds, this.friction_const);
//     }
//     this.apply_constant_forces(elapsed_seconds);

//     super.update_position(elapsed_seconds);
//   }

//   public instant_act_on(force: Vector): void {
//     this.mom.x += force.x;
//     this.mom.y += force.y;

//     this.prev_mom.x = this.mom.x;
//     this.prev_mom.y = this.mom.y;
//   }

//   public constant_act_on(force: Vector, cap?: Vector) {
//     this.constant_forces.push({ force, cap });
//   }

//   protected apply_friction(elapsed_seconds: number, friction_const: number) {
//     //maybe make this a constant force instead?
//     if (this.mom.x != 0 || this.mom.y != 0) {
//       const len = GTMath.Magnitude(this.mom);
//       let normalized_anti_momentum: Vector = {
//         x: (this.mom.x * friction_const * elapsed_seconds) / len,
//         y: (this.mom.y * friction_const * elapsed_seconds) / len,
//       };
//       if (this.mom.x > 0) {
//         this.mom.x = Math.max(0, this.mom.x - normalized_anti_momentum.x);
//       } else if (this.mom.x < 0) {
//         this.mom.x = Math.min(0, this.mom.x - normalized_anti_momentum.x);
//       }
//       if (this.mom.y > 0) {
//         this.mom.y = Math.max(0, this.mom.y - normalized_anti_momentum.y);
//       } else if (this.mom.y < 0) {
//         this.mom.y = Math.min(0, this.mom.y - normalized_anti_momentum.y);
//       }
//     }
//   }

//   protected apply_constant_forces(elapsed_seconds: number) {
//     if (this.constant_forces.length == 0) {
//       return;
//     }

//     let positive_xs: [number, number][] = [];
//     let negative_xs: [number, number][] = [];
//     let positive_ys: [number, number][] = [];
//     let negative_ys: [number, number][] = [];

//     let new_x_force = 0,
//       new_y_force = 0;

//     this.constant_forces.forEach(({ force, cap }) => {
//       if (cap) {
//         if (force.x > 0 && cap.x > 0 && cap.x >= this.mom.x) {
//           positive_xs.push([force.x * elapsed_seconds, cap.x - this.mom.x]);
//         } else if (force.x < 0 && cap.x < 0 && cap.x <= this.mom.x) {
//           negative_xs.push([force.x * elapsed_seconds, cap.x - this.mom.x]);
//         }
//         if (force.y > 0 && cap.y > 0 && cap.y >= this.mom.y) {
//           positive_ys.push([force.y * elapsed_seconds, cap.y - this.mom.y]);
//         } else if (force.y < 0 && cap.y < 0 && cap.y <= this.mom.y) {
//           negative_ys.push([force.y * elapsed_seconds, cap.y - this.mom.y]);
//         }
//       } else {
//         new_x_force += force.x * elapsed_seconds;
//         new_y_force += force.y * elapsed_seconds;
//       }
//     });

//     if (
//       positive_xs.length == 0 &&
//       positive_ys.length == 0 &&
//       negative_xs.length == 0 &&
//       negative_ys.length == 0 &&
//       new_x_force == 0 &&
//       new_y_force == 0
//     ) {
//       return; // returns false if no constant force affected the momentum
//     }

//     let [pxf, pxo] = this.get_force_and_overflow(positive_xs, false);
//     let [nxf, nxo] = this.get_force_and_overflow(negative_xs, true);
//     let [pyf, pyo] = this.get_force_and_overflow(positive_ys, false);
//     let [nyf, nyo] = this.get_force_and_overflow(negative_ys, true);

//     new_x_force += Math.max(nxf, Math.min(pxf + pxo + nxf + nxo, pxf));
//     new_y_force += Math.max(nyf, Math.min(pyf + pyo + nyf + nyo, pyf));

//     this.mom.x += new_x_force;
//     this.mom.y += new_y_force;

//     this.constant_forces = [];
//   }

//   protected get_force_and_overflow(
//     pairs: [number, number][],
//     is_negative: boolean
//   ): [number, number] {
//     let force = 0,
//       overflow = 0;
//     pairs.sort(([x1, c1], [x2, c2]) => (!is_negative ? c1 - c2 : c2 - c1));
//     pairs.forEach(([x, c]) => {
//       if ((x > c && !is_negative) || (x < c && is_negative)) {
//         force += c;
//         overflow += x - c;
//       } else {
//         force += x;
//       }
//     });
//     return [force, overflow];
//   }
// }
