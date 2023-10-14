import { DisplayObject, Sprite } from "pixi.js";
import { GameEntitySprite } from "../../../display/gamesprite/GameEntitySprite";
import { Tree } from "../Tree";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { GTTextureAsset, GTTextures } from "../../../assets/textures/Textures";

export class TreeSprite extends GameEntitySprite<Tree> {
  public readonly display_object: DisplayObject;

  constructor(entity: Tree, game_system: LocalGameSystem) {
    super(entity, game_system);
    this.display_object = this.get_display_object();
  }

  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(GTTextures.get(this.get_texture()));
    sprite.anchor.set(0.5, 0.95);

    return sprite;
  }

  // Temporary wave-y logic
  private total_elapsed_seconds: number = Math.random();
  private readonly wave_speed_variation: number = 0.1;
  private wave_speed: number = 1 - this.wave_speed_variation / 2 + Math.random() * this.wave_speed_variation;
  public update(elapsed_seconds: number): void {
    super.update(elapsed_seconds);
    this.total_elapsed_seconds += elapsed_seconds * this.wave_speed;
    this.display_object.skew.x = Math.sin(this.total_elapsed_seconds * 2) / 80;
  }

  private get_texture(): GTTextureAsset {
    switch (this.entity.variation) {
      case 1:
        return "entity-tree-1";
      case 2:
        return "entity-tree-2";
      case 3:
        return "entity-tree-3";
    }
  }

  public on_destroy(): void {}
}
