import { Container, DisplayObject, Graphics, Sprite } from "pixi.js";
import { Renderable } from "../../display/renderables/Renderable";
import { Goblin } from "./Goblin";
import { ImageAssets } from "../../../../client/assets/image/ImageAssets";
import { ResolutionScale } from "../../display/Resolution";

export class GoblinRenderable extends Renderable<Goblin> {
  protected get_display_object(): DisplayObject {
    const container = new Container();

    const sprite = new Sprite(ImageAssets.textures["entity-goblin"]);
    const scale = ResolutionScale[this.game_system.display.config.res] * 0.3;
    sprite.anchor.set(0.5, 0.9);
    sprite.scale.set(scale);

    let obj = new Graphics();
    obj.beginFill(0xff000);
    obj.drawRect(-5, -5, 10, 10);

    container.addChild(sprite);
    container.addChild(obj);

    return container;
  }
}
