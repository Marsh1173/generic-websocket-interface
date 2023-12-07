import { Mesh, MeshLambertMaterial, SphereGeometry } from "three";
import { SceneObjectGroup } from "../../../display/sceneobject/SceneObjectGroup";
import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
import { _3DSceneObject } from "../../../display/sceneobject/SceneObject";
import { EntityHoverController } from "./EntityHoverController";

export class HoverSceneObjectGroup extends SceneObjectGroup {
  constructor(game_system: LocalGameSystem, controller: EntityHoverController) {
    super(game_system.display);

    this.scene_objects.push(new HoverSceneObject(game_system, controller));
  }
}

class HoverSceneObject extends _3DSceneObject {
  public readonly mesh: Mesh;
  constructor(private readonly game_system: LocalGameSystem, protected readonly controller: EntityHoverController) {
    super(game_system.display);
    this.mesh = this.get_mesh();
  }

  protected get_mesh(): Mesh {
    const geometry = new SphereGeometry(0.2);
    const material = new MeshLambertMaterial({ color: 0xff0000 });
    const sphere = new Mesh(geometry, material);

    return sphere;
  }

  public update(): void {
    const pos = this.controller.state.target?.entity.game_space_data.pos;
    if (pos) {
      this.mesh.visible = true;
      this.mesh.position.x = pos.x;
      this.mesh.position.y = pos.y;
    } else {
      this.mesh.visible = false;
    }
  }
}
