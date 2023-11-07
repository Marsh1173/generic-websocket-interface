import { Sheep } from "../Sheep";
import { GTTextures } from "../../../assets/textures/Textures";
import { SceneEntityObjectGroup } from "../../../display/sceneobject/SceneObjectGroup";
import { _3DSceneEntityObject } from "../../../display/sceneobject/SceneObject";
import { Mesh, MeshLambertMaterial, PlaneGeometry } from "three";
import { GameDisplay } from "../../../display/GameDisplay";

export class SheepSceneObjectGroup extends SceneEntityObjectGroup<Sheep> {
  constructor(display: GameDisplay, entity: Sheep) {
    super(display, entity);

    this.scene_objects.push(new SheepSceneObject(display, entity));
  }
}

class SheepSceneObject extends _3DSceneEntityObject<Sheep> {
  public readonly mesh: Mesh;
  constructor(display: GameDisplay, entity: Sheep) {
    super(display, entity);

    SheepSceneObject.plane_material.map = GTTextures.get_threejs("entity-sheep");
    SheepSceneObject.plane_material.alphaTest = 0.5;

    this.mesh = this.get_mesh();
  }

  private static readonly plane_geometry = new PlaneGeometry(1, 1);
  private static readonly plane_material = new MeshLambertMaterial();

  protected get_mesh(): Mesh {
    const plane = new Mesh(SheepSceneObject.plane_geometry, SheepSceneObject.plane_material);
    plane.rotation.x = Math.PI / 2;
    plane.position.z = 0.4;

    return plane;
  }
}
