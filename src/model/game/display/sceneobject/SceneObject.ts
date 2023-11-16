import { DisplayObject } from "pixi.js";
import { Object3D, Vector3 } from "three";
import { Entity } from "../../entitymodel/entity/Entity";
import { GameDisplay } from "../GameDisplay";

export abstract class SceneObject {
  constructor(protected readonly display: GameDisplay) {}

  public abstract instantiate(): void;
  public abstract destroy(): void;
  public abstract update(elapsed_seconds: number): void;
}

export abstract class _3DSceneObject extends SceneObject {
  protected abstract readonly mesh: Object3D;
  constructor(display: GameDisplay) {
    super(display);
  }

  public instantiate() {
    this.display.scene.world_scene.add(this.mesh);
  }

  public destroy(): void {
    this.display.scene.world_scene.remove(this.mesh);
  }
}

export abstract class _3DSceneEntityObject<EntityType extends Entity> extends _3DSceneObject {
  constructor(display: GameDisplay, protected readonly entity: EntityType) {
    super(display);
    //set position here?
  }

  public update(elapsed_seconds: number): void {
    this.set_position();
  }

  private set_position() {
    this.mesh.position.x = this.entity.game_space_data.pos.x;
    this.mesh.position.y = this.entity.game_space_data.pos.y;
  }
}

export abstract class CanvasSceneObject extends SceneObject {
  protected abstract readonly display_object: DisplayObject;
  constructor(display: GameDisplay) {
    super(display);
  }

  public instantiate(): void {
    this.display.scene.canvas_layers.visual_data.addChild(this.display_object);
  }

  public destroy(): void {
    this.display.scene.canvas_layers.visual_data.removeChild(this.display_object);
  }
}

export abstract class CanvasSceneEntityObject<EntityType extends Entity> extends CanvasSceneObject {
  constructor(
    display: GameDisplay,
    protected readonly entity: EntityType,
    protected readonly offset: Vector3 = new Vector3(0, 0, 0)
  ) {
    super(display);
  }

  public update(elapsed_seconds: number): void {
    this.set_position();
  }

  private set_position() {
    // try 3d camera global_3d_units_to_screen_percentage
    // this.mesh.position.x = this.entity.game_space_data.pos.x;
    // this.mesh.position.y = this.entity.game_space_data.pos.y;
  }
}
