import { Application, DisplayObject } from "pixi.js";
import { uuid } from "../../../utils/Id";
import { Entity } from "../../entitymodel/entity/Entity";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";

export abstract class Renderable<EntityType extends Entity> {
  public readonly id = uuid();
  protected readonly display_object: DisplayObject;

  constructor(
    protected readonly view_app: Application<HTMLCanvasElement>,
    protected readonly entity: EntityType,
    protected readonly game_system: LocalGameSystem
  ) {
    this.display_object = this.get_display_object();
    this.view_app.stage.addChild(this.display_object);
    this.game_system.renderables.add_renderable(this);

    entity.deconstruct_module.add_observer({
      id: this.id,
      on_deconstruct: () => {
        this.view_app.stage.removeChild(this.display_object);
        this.game_system.renderables.remove_renderable(this.id);
      },
    });
  }

  protected abstract get_display_object(): DisplayObject;
  public abstract update(elapsed_time: number): void;
}
