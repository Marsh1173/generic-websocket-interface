import { HasId, Id } from "../../../common/Id";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { GameSprite } from "./GameSprite";

export abstract class GameSpriteHandler implements HasId {
  constructor(public readonly id: Id, protected readonly game_system: LocalGameSystem) {}

  public readonly ground_space_sprites: GameSprite[] = [];
  public readonly world_space_sprites: GameSprite[] = [];
  public readonly visual_data_sprites: GameSprite[] = [];
  //shadow layer sprites
  //ground layer sprites
  //indicator layer sprites
}
