import { uuid } from "../../common/Id";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { SceneObjectGroup } from "../display/sceneobject/SceneObjectGroup";
import { _3DSceneObject } from "../display/sceneobject/SceneObject";
import { Mesh, MeshLambertMaterial, SphereGeometry } from "three";

export function ShowCursor(game_system: LocalGameSystem) {
  new CursorSceneObjectGroup(game_system).insert();
}

class CursorSceneObjectGroup extends SceneObjectGroup {
  constructor(game_system: LocalGameSystem) {
    super(game_system.display);

    this.scene_objects.push(new CursorSceneObject(game_system));
  }
}

class CursorSceneObject extends _3DSceneObject {
  public readonly mesh: Mesh;
  constructor(private readonly game_system: LocalGameSystem) {
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
    const pos = this.game_system.game_system_io.player_input_manager.global_mouse_pos;
    this.mesh.position.x = pos.x;
    this.mesh.position.y = pos.y;
  }
}
