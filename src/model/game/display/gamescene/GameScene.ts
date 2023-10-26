import { Application, Container } from "pixi.js";
import { Id } from "../../../common/Id";
import { SceneObjectGroup } from "../sceneobject/SceneObjectGroup";
import { Scene } from "three";
import { GameDisplay } from "../GameDisplay";

type CanvasLayer = "visual_data";

export class GameScene {
  private readonly scene_object_group_map: Map<Id, SceneObjectGroup> = new Map();

  public get world_scene(): Scene {
    return this.game_display._3d.scene.internal;
  }

  public readonly canvas_layers: Record<CanvasLayer, Container> = {
    visual_data: new Container(),
  };

  constructor(private readonly view_app: Application<HTMLCanvasElement>, private readonly game_display: GameDisplay) {
    this.set_canvas_settings();
  }

  private set_canvas_settings() {
    this.view_app.stage.interactiveChildren = false;

    for (const layer of Object.values(this.canvas_layers)) {
      this.view_app.stage.addChild(layer);
    }
  }

  public insert_scene_object_group(scene_object_group: SceneObjectGroup) {
    this.scene_object_group_map.set(scene_object_group.id, scene_object_group);
  }

  public remove_scene_object_group(id: Id) {
    this.scene_object_group_map.delete(id);
  }

  public update_all_scene_object_groups(elapsed_seconds: number) {
    this.scene_object_group_map.forEach((scene_object_group) => scene_object_group.update(elapsed_seconds));
  }
}
