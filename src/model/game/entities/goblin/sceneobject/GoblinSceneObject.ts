import { Goblin } from "../Goblin";
import { GTTextures } from "../../../assets/textures/Textures";
import { SceneEntityObjectGroup } from "../../../display/sceneobject/SceneObjectGroup";
import { _3DSceneEntityObject } from "../../../display/sceneobject/SceneObject";
import { Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import { GameDisplay } from "../../../display/GameDisplay";

export class GoblinSceneObjectGroup extends SceneEntityObjectGroup<Goblin> {
  constructor(display: GameDisplay, entity: Goblin) {
    super(display, entity);

    this.scene_objects.push(new GoblinSceneObject(display, entity));
  }
}

class GoblinSceneObject extends _3DSceneEntityObject<Goblin> {
  public readonly mesh: Mesh;
  constructor(display: GameDisplay, entity: Goblin) {
    super(display, entity);

    this.mesh = this.get_mesh();
  }

  protected get_mesh(): Mesh {
    const plane_geometry = new PlaneGeometry(0.7, 1.6);

    const plane_material = new MeshLambertMaterial();
    plane_material.map = GTTextures.get_threejs("entity-goblin");
    plane_material.alphaTest = 0.5;

    const plane = new Mesh(plane_geometry, plane_material);
    plane.rotation.x = Math.PI / 2;
    plane.position.z = 0.7;

    return plane;
  }
}
