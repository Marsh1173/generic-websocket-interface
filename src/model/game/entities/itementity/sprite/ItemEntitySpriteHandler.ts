import { GameEntitySpriteHandler } from "../../../display/gamesprite/GameEntitySpriteHandler";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { ItemEntity } from "../ItemEntity";
import { ItemEntitySprite } from "./ItemEntitySprite";

export class ItemEntitySpriteHandler extends GameEntitySpriteHandler<ItemEntity> {
  constructor(entity: ItemEntity, game_system: LocalGameSystem) {
    super(entity, game_system);

    this.world_space_sprites.push(new ItemEntitySprite(this.entity, this.game_system));
  }
}
