import { HasId, Id, uuid } from "../../../common/Id";
import { Entity } from "../../entitymodel/entity/Entity";
import { GameDisplay } from "../GameDisplay";
import { SceneObject } from "./SceneObject";

export abstract class SceneObjectGroup implements HasId {
  protected readonly scene_objects: SceneObject[] = [];
  public readonly id: Id = uuid();
  constructor(protected readonly display: GameDisplay) {}

  public insert(): this {
    this.display.scene.insert_scene_object_group(this);
    this.scene_objects.forEach((obj) => obj.instantiate());
    return this;
  }

  public remove(): this {
    this.display.scene.remove_scene_object_group(this.id);
    this.scene_objects.forEach((obj) => obj.destroy());
    return this;
  }

  public update(elapsed_seconds: number): void {
    this.scene_objects.forEach((obj) => obj.update(elapsed_seconds));
  }
}

export abstract class SceneEntityObjectGroup<EntityType extends Entity> extends SceneObjectGroup {
  constructor(display: GameDisplay, protected readonly entity: EntityType) {
    super(display);

    entity.deconstruct_module.add_observer({
      id: this.id,
      on_observable_deconstruct: () => {
        this.remove();
      },
    });
  }
}
