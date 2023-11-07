import { Arrow } from "../Arrow";
import { GTTextures } from "../../../assets/textures/Textures";
import { SceneEntityObjectGroup } from "../../../display/sceneobject/SceneObjectGroup";
import { _3DSceneEntityObject } from "../../../display/sceneobject/SceneObject";
import { Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import { GameDisplay } from "../../../display/GameDisplay";

export class ArrowSceneObjectGroup extends SceneEntityObjectGroup<Arrow> {
  constructor(display: GameDisplay, entity: Arrow) {
    super(display, entity);

    this.scene_objects.push(new ArrowSceneObject(display, entity));
  }
}

class ArrowSceneObject extends _3DSceneEntityObject<Arrow> {
  public readonly mesh: Mesh;
  constructor(display: GameDisplay, entity: Arrow) {
    super(display, entity);
    this.mesh = this.get_mesh();
  }

  protected get_mesh(): Mesh {
    const texture = GTTextures.get_threejs("entity-arrow");

    const plane_geometry = new PlaneGeometry(1, 1);
    const plane_material = new MeshLambertMaterial();
    plane_material.map = texture;
    plane_material.alphaTest = 0.5;

    const plane = new Mesh(plane_geometry, plane_material);
    plane.position.z = 1;

    return plane;
  }
}
