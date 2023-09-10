import { DisplayObject, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Sheep } from "./Sheep";
import { ImageAssets } from "../../../../client/assets/image/ImageAssets";
import { ResolutionScale } from "../../display/Resolution";

export class SheepRenderable extends Renderable<Sheep> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-sheep"]);
    const scale = ResolutionScale[this.game_system.display.config.res] * 0.8;
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(scale);

    return sprite;
  }
}
