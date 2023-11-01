import { Goblin } from "../Goblin";
import { GTTextures } from "../../../assets/textures/Textures";
import { SceneEntityObjectGroup } from "../../../display/sceneobject/SceneObjectGroup";
import { _3DSceneEntityObject } from "../../../display/sceneobject/SceneObject";
import { DataTexture, Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader } from "three";
import { GameDisplay } from "../../../display/GameDisplay";
import { BufferResource } from "pixi.js";

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
    const texture = GTTextures.get_threejs("entity-goblin");

    const plane_geometry = new PlaneGeometry(1, 2);

    const plane_material = new MeshBasicMaterial();
    plane_material.map = texture;
    plane_material.alphaTest = 0.5;

    const plane = new Mesh(plane_geometry, plane_material);
    plane.castShadow = true;
    plane.rotation.x = Math.PI / 2;
    plane.position.z = 1;

    return plane;
  }
}
