import { GameEntitySpriteHandler } from "../../../display/gamesprite/GameEntitySpriteHandler";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { Arrow } from "../Arrow";
import { ArrowSprite } from "./ArrowSprite";

export class ArrowSpriteHandler extends GameEntitySpriteHandler<Arrow> {
  constructor(entity: Arrow, game_system: LocalGameSystem) {
    super(entity, game_system);

    this.world_space_sprites.push(new ArrowSprite(entity, this.game_system));
  }
}
