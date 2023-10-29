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
  constructor(game_system: LocalGameSystem) {
    super(game_system.display);
    this.mesh = this.get_mesh();

    game_system.game_system_io.human_input_manager.add_observer({
      id: uuid(),
      on_input: () => {},
      on_mouse_move: (params) => {
        this.mesh.position.x = params.x;
        this.mesh.position.y = params.y;
      },
    });
  }

  protected get_mesh(): Mesh {
    const geometry = new SphereGeometry(1);
    const material = new MeshLambertMaterial({ color: 0xff0000 });
    const sphere = new Mesh(geometry, material);

    sphere.position.z = 0;
    sphere.scale.set(0.2, 0.2, 0.2);

    return sphere;
  }

  public update(elapsed_seconds: number): void {}
}
