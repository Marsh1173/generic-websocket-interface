// import { StaticPoint } from "../../../common/math/geometry/Point";
// import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
// import { SceneObject } from "./SceneObject";
// import { BaseEntity } from "../../entitymodel/entity/BaseEntityClass";

// /**
//  * TODO: Redo class better
//  */

// export abstract class GameEntitySprite<EntityType extends BaseEntity> extends SceneObject {
//   constructor(protected readonly entity: EntityType, game_system: LocalGameSystem) {
//     super(game_system);
//   }

//   public update(elapsed_seconds: number) {
//     this.set_position();
//   }

//   private set_position() {
//     this.set_z_pos();

//     const pixel_coords = this.game_system.display.camera.global_2d_units_to_pixel_coords(
//       this.entity.game_space_data.pos
//     );
//     this.display_object.position.set(pixel_coords.x, pixel_coords.y);
//   }

//   private should_set_z_index: boolean = true;
//   private set_z_pos() {
//     if (this.should_set_z_index) {
//       this.display_object.zIndex = this.entity.game_space_data.pos.y;

//       if (this.entity.game_space_data.type !== "DynamicPoint") {
//         this.should_set_z_index = false;
//       }
//     }
//   }
// }
