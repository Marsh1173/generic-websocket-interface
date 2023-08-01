import { Entity } from "../../entitymodel/entity/Entity";
import { HasDynamicPoint } from "../../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { Renderable } from "./Renderable";

export abstract class MovableRenderable<
  EntityType extends Entity & HasDynamicPoint
> extends Renderable<EntityType> {
  public update(elapsed_seconds: number): void {
    // this.display_object.position.set(...this.entity.game_space_data.)
  }
}
