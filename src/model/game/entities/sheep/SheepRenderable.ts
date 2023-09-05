import { DisplayObject, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Sheep } from "./Sheep";
import { ImageAssets } from "../../../../client/assets/image/ImageAssets";

export class SheepRenderable extends Renderable<Sheep> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-sheep"]);
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(0.5);

    return sprite;
  }
}
