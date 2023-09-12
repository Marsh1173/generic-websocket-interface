import { GameEntitySpriteHandler } from "../../../display/gamesprite/GameEntitySpriteHandler";
import { GameSprite } from "../../../display/gamesprite/GameSprite";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { Tree } from "../Tree";
import { TreeSprite } from "./TreeSprite";

export class TreeSpriteHandler extends GameEntitySpriteHandler<Tree> {
  constructor(entity: Tree, game_system: LocalGameSystem) {
    super(entity, game_system);

    this.world_space_sprites.push(new TreeSprite(entity, this.game_system));
  }
}
