import { GameEntitySpriteHandler } from "../../../display/gamesprite/GameEntitySpriteHandler";
import { HealthSprite } from "../../../entitymodel/modules/health/sprite/HealthSprite";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { Tree } from "../Tree";
import { TreeSprite } from "./TreeSprite";

export class TreeSpriteHandler extends GameEntitySpriteHandler<Tree> {
  constructor(entity: Tree, game_system: LocalGameSystem) {
    super(entity, game_system);

    this.world_space_sprites.push(new TreeSprite(entity, this.game_system));

    this.visual_data_sprites.push(new HealthSprite(this.entity, this.game_system, { height: 0 }));
  }
}
