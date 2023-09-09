import { Application } from "pixi.js";
import { Renderable } from "../renderables/Renderable";
import { Entity } from "../../entitymodel/entity/Entity";
import { Id } from "../../../common/Id";

export class GameCanvas {
  private readonly renderable_map: Map<Id, Renderable<Entity>> = new Map();
  constructor(private readonly view_app: Application<HTMLCanvasElement>) {
    // TODO find better-placed solution
    view_app.stage.sortableChildren = true;
    view_app.stage.interactiveChildren = false;
  }

  public insert_renderable(renderable: Renderable<Entity>) {
    this.renderable_map.set(renderable.id, renderable);
    this.view_app.stage.addChild(renderable.display_object);

    renderable.entity.deconstruct_module.add_observer({
      id: renderable.id,
      on_observable_deconstruct: () => {
        this.remove_renderable(renderable);
      },
    });
  }

  private remove_renderable(renderable: Renderable<Entity>) {
    this.renderable_map.delete(renderable.id);
    this.view_app.stage.removeChild(renderable.display_object);
  }

  public update_all_renderables(elapsed_seconds: number) {
    this.renderable_map.forEach((r) => r.update(elapsed_seconds));
  }
}
