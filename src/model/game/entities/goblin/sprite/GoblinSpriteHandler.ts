import { GameEntitySpriteHandler } from "../../../display/gamesprite/GameEntitySpriteHandler";
import { GameSprite } from "../../../display/gamesprite/GameSprite";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { Goblin } from "../Goblin";
import { GoblinSprite } from "./GoblinSprite";

export class GoblinSpriteHandler extends GameEntitySpriteHandler<Goblin> {
  constructor(entity: Goblin, game_system: LocalGameSystem) {
    super(entity, game_system);

    this.world_space_sprites.push(new GoblinSprite(entity, this.game_system));
  }
}
