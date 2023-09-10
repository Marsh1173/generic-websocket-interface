import { Container, DisplayObject, Graphics, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Tree } from "./Tree";
import { GTTexture, ImageAssets } from "../../../../client/assets/image/ImageAssets";
import { ResolutionScale } from "../../display/Resolution";

export class TreeRenderable extends Renderable<Tree> {
  protected get_display_object(): DisplayObject {
    const container = new Container();
    const sprite = new Sprite(ImageAssets.textures[this.get_texture()]);
    const scale = ResolutionScale[this.game_system.display.config.res] * 0.8;
    sprite.anchor.set(0.5, 0.95);
    sprite.scale.set(scale);

    // const p1 = this.game_system.display.camera.global_units_to_pixel_coords(
    //   this.entity.game_space_data.shape.vertices_data[0].vertex
    // );
    // const p2 = this.game_system.display.camera.global_units_to_pixel_coords(
    //   this.entity.game_space_data.shape.vertices_data[2].vertex
    // );

    // const w = Math.abs(p1.x - p2.x);
    // const h = Math.abs(p1.y - p2.y);

    // const rect = new Graphics();
    // rect.lineStyle(1, 0xffffff);
    // rect.drawRect(-w / 2, -h / 2, w, h);

    container.addChild(sprite);
    // container.addChild(rect);

    return container;
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

  private get_texture(): GTTexture {
    switch (this.entity.variation) {
      case 1:
        return "entity-tree-1";
      case 2:
        return "entity-tree-2";
      case 3:
        return "entity-tree-3";
    }
  }
}
