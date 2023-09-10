import { DisplayObject, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Arrow } from "./Arrow";
import { ImageAssets } from "../../../../client/assets/image/ImageAssets";
import { ResolutionScale } from "../../display/Resolution";

export class ArrowRenderable extends Renderable<Arrow> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-arrow"]);
    const scale = ResolutionScale[this.game_system.display.config.res] * 0.6;
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(scale);
    sprite.rotation = this.entity.rotation;
    return sprite;
  }
}
