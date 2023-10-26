// import { EntityOriginSprite, ShowEntityOrigin } from "../../devtools/EntityOriginSprite";
// import { Entity } from "../../entitymodel/entity/Entity";
// import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
// import { SceneObjectGroup } from "./SceneObjectGroup";

// export abstract class GameEntitySpriteHandler<EntityType extends Entity> extends SceneObjectGroup {
//   constructor(protected readonly entity: EntityType, game_system: LocalGameSystem) {
//     super(entity.id, game_system);

//     if (ShowEntityOrigin.get()) {
//       this.visual_data_sprites.push(new EntityOriginSprite(this.entity, this.game_system));
//     }

//     entity.deconstruct_module.add_observer({
//       id: this.id,
//       on_observable_deconstruct: () => {
//         this.remove();
//       },
//     });
//   }
// }
