import { GameEntitySpriteHandler } from "../../../display/gamesprite/GameEntitySpriteHandler";
import { GameSprite } from "../../../display/gamesprite/GameSprite";
import { HealthSprite } from "../../../entitymodel/modules/health/sprite/HealthSprite";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { Sheep } from "../Sheep";
import { SheepSprite } from "./SheepSprite";

export class SheepSpriteHandler extends GameEntitySpriteHandler<Sheep> {
  constructor(entity: Sheep, game_system: LocalGameSystem) {
    super(entity, game_system);

    this.world_space_sprites.push(
      new SheepSprite(this.entity, this.game_system)
    );
    this.visual_data_sprites.push(
      new HealthSprite(this.entity, this.game_system)
    );
  }
}
