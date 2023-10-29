import { uuid } from "../../common/Id";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { SceneObjectGroup } from "../display/sceneobject/SceneObjectGroup";
import { _3DSceneObject } from "../display/sceneobject/SceneObject";
import { BoxGeometry, Mesh, MeshLambertMaterial, SphereGeometry } from "three";

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
    // const texture = new TextureLoader().load(GTTextures.get("entity-arrow").baseTexture.resource.src);

    // const plane_geometry = new PlaneGeometry(1, 1);
    // const plane_material = new MeshBasicMaterial();
    // plane_material.map = texture;
    // plane_material.alphaTest = 0.5;

    // const plane = new Mesh(plane_geometry, plane_material);
    // plane.position.z = 1;

    // const geometry = new BoxGeometry(1, 1);
    // const material = new MeshLambertMaterial({ color: 0x00ff00 });
    const geometry = new SphereGeometry(1);
    const material = new MeshLambertMaterial({ color: 0xff0000 });
    const sphere = new Mesh(geometry, material);
    sphere.position.z = 0;
    // sphere.position.x = 0;
    // sphere.position.y = 0;

    return sphere;
  }

  public update(elapsed_seconds: number): void {}
}

// class Cursor extends BaseEntity {
//   public game_space_data: DynamicPoint = new DynamicPoint(
//     {
//       pos: { x: 0, y: 0 },
//     },
//     false
//   );
// }
