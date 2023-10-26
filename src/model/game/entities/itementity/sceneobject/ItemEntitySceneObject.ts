import { ItemEntity } from "../ItemEntity";
import { GTTextures } from "../../../assets/textures/Textures";
import { SceneEntityObjectGroup } from "../../../display/sceneobject/SceneObjectGroup";
import { _3DSceneEntityObject } from "../../../display/sceneobject/SceneObject";
import { Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader } from "three";
import { GameDisplay } from "../../../display/GameDisplay";

export class ItemEntitySceneObjectGroup extends SceneEntityObjectGroup<ItemEntity> {
  constructor(display: GameDisplay, entity: ItemEntity) {
    super(display, entity);

    this.scene_objects.push(new ItemEntitySceneObject(display, entity));
  }
}

class ItemEntitySceneObject extends _3DSceneEntityObject<ItemEntity> {
  public readonly mesh: Mesh;
  constructor(display: GameDisplay, entity: ItemEntity) {
    super(display, entity);
    this.mesh = this.get_mesh();
  }

  protected get_mesh(): Mesh {
    const texture = new TextureLoader().load(GTTextures.get("entity-plank").baseTexture.resource.src);

    const plane_geometry = new PlaneGeometry(1, 1);

    const plane_material = new MeshBasicMaterial();
    plane_material.map = texture;
    plane_material.transparent = true;

    const plane = new Mesh(plane_geometry, plane_material);
    plane.rotation.x = Math.PI / 2;
    plane.position.z = 0.5;

    return plane;
  }
}
