import { Tree } from "../Tree";
import { SceneEntityObjectGroup } from "../../../display/sceneobject/SceneObjectGroup";
import { _3DSceneEntityObject } from "../../../display/sceneobject/SceneObject";
import { Object3D, Vector3 } from "three";
import { GameDisplay } from "../../../display/GameDisplay";
import { GTModels } from "../../../assets/models/Models";

export class TreeSceneObjectGroup extends SceneEntityObjectGroup<Tree> {
  constructor(display: GameDisplay, entity: Tree) {
    super(display, entity);

    this.scene_objects.push(new TreeSceneObject(display, entity));
  }
}

class TreeSceneObject extends _3DSceneEntityObject<Tree> {
  public readonly mesh: Object3D;
  constructor(display: GameDisplay, entity: Tree) {
    super(display, entity);
    this.mesh = this.get_mesh();
  }

  protected get_mesh(): Object3D {
    const tree_geometry = GTModels.get("tree");
    tree_geometry.scale.set(1.2, 1.2, 1.2);
    tree_geometry.children.forEach((child) => {
      child.position.add(new Vector3(0.2, 0, 0));
    });

    return tree_geometry;
  }
}
