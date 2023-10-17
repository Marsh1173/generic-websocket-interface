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

  public insert(): this {
    this.game_system.display.canvas.insert_sprite_handler(this);
    return this;
  }

  public remove(): this {
    this.game_system.display.canvas.remove_sprite_handler(this.id);

    this.visual_data_sprites.forEach((sprite) => sprite.on_destroy());
    this.world_space_sprites.forEach((sprite) => sprite.on_destroy());
    this.ground_space_sprites.forEach((sprite) => sprite.on_destroy());

    return this;
  }
}
