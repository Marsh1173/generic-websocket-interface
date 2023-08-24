import { DisplayObject, Graphics, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Goblin } from "./Goblin";
import { ImageAssets } from "../../../../client/assets/image/ImageAssets";

export class GoblinRenderable extends Renderable<Goblin> {
  protected get_display_object(): DisplayObject {
    const sprite = new Sprite(ImageAssets.textures["entity-goblin"]);
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(0.2);

    return sprite;
  }

  // protected get_display_object(): DisplayObject {
  //   let obj = new Graphics();
  //   obj.beginFill(0xff000);
  //   obj.drawRect(-5, -5, 10, 10);
  //   return obj;
  // }

  public update(elapsed_seconds: number): void {
    this.display_object.zIndex = this.entity.game_space_data.pos.y;

    this.display_object.position.set(this.entity.game_space_data.pos.x, this.entity.game_space_data.pos.y);
  }
}
