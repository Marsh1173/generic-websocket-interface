import { DisplayObject, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Arrow } from "./Arrow";
import { ImageAssets } from "../../../../client/assets/image/ImageAssets";
import { GTMath } from "../../../utils/physics/math/GTMath";

export class ArrowRenderable extends Renderable<Arrow> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-arrow"]);
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(0.3);
    sprite.rotation = GTMath.Rotation(this.entity.game_space_data.mom);
    return sprite;
  }

  public update(elapsed_seconds: number): void {
    this.display_object.zIndex = this.entity.game_space_data.pos.y;

    this.display_object.position.set(this.entity.game_space_data.pos.x, this.entity.game_space_data.pos.y);
  }
}
