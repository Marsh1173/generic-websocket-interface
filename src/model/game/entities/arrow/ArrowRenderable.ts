import { DisplayObject, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Arrow } from "./Arrow";
import { ImageAssets } from "../../../../client/assets/image/ImageAssets";
import { GTMath } from "../../../common/physics/math/GTMath";

export class ArrowRenderable extends Renderable<Arrow> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-arrow"]);
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(0.3);
    sprite.rotation = this.entity.rotation;
    return sprite;
  }
}
