import { Entity } from "../../entitymodel/entity/Entity";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { GameSpriteHandler } from "./GameSpriteHandler";

export abstract class GameEntitySpriteHandler<EntityType extends Entity> extends GameSpriteHandler {
  constructor(protected readonly entity: EntityType, game_system: LocalGameSystem) {
    super(entity.id, game_system);
  }
}
