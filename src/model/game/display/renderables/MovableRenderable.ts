import { Entity } from "../../entitymodel/entity/Entity";
import { HasGameSpaceDynamicPoint } from "../../entitymodel/gamespacedata/dynamicpoint/GameSpaceDynamicPoint";
import { Renderable } from "./Renderable";

export abstract class MovableRenderable<
  EntityType extends Entity & HasGameSpaceDynamicPoint
> extends Renderable<EntityType> {
  public update(elapsed_time: number): void {
    // this.display_object.position.set(...this.entity.game_space_data.)
  }
}
