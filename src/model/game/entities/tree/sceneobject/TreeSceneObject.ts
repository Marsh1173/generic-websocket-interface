import { Tree } from "../Tree";
import { GTTextureAsset, GTTextures } from "../../../assets/textures/Textures";
import { SceneEntityObjectGroup } from "../../../display/sceneobject/SceneObjectGroup";
import { _3DSceneEntityObject } from "../../../display/sceneobject/SceneObject";
import { Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader } from "three";
import { GameDisplay } from "../../../display/GameDisplay";

export class TreeSceneObjectGroup extends SceneEntityObjectGroup<Tree> {
  constructor(display: GameDisplay, entity: Tree) {
    super(display, entity);

    this.scene_objects.push(new TreeSceneObject(display, entity));
  }
}

class TreeSceneObject extends _3DSceneEntityObject<Tree> {
  public readonly mesh: Mesh;
  constructor(display: GameDisplay, entity: Tree) {
    super(display, entity);
    this.mesh = this.get_mesh();
  }

  protected get_mesh(): Mesh {
    const texture = new TextureLoader().load(GTTextures.get(this.get_texture()).baseTexture.resource.src);

    const plane_geometry = new PlaneGeometry(2, 4);

    const plane_material = new MeshBasicMaterial();
    plane_material.map = texture;
    plane_material.alphaTest = 0.5;

    const plane = new Mesh(plane_geometry, plane_material);
    plane.rotation.x = Math.PI / 2;
    plane.position.z = 2;

    return plane;
  }

  private get_texture(): GTTextureAsset {
    switch (this.entity.variation) {
      case 1:
        return "entity-tree-1";
      case 2:
        return "entity-tree-2";
      case 3:
        return "entity-tree-3";
    }
  }
}

// import { DisplayObject, Sprite } from "pixi.js";
// import { GameEntitySprite } from "../../../display/sceneobject/GameEntitySprite";
// import { Tree } from "../Tree";
// import { LocalGameSystem } from "../../../gamesystem/LocalGameSystem";
// import { GTTextureAsset, GTTextures } from "../../../assets/textures/Textures";

// export class TreeSprite extends GameEntitySprite<Tree> {
//   public readonly display_object: DisplayObject;

//   constructor(entity: Tree, game_system: LocalGameSystem) {
//     super(entity, game_system);
//     this.display_object = this.get_display_object();
//   }

//   protected get_display_object(): DisplayObject {
//     const sprite = new Sprite(GTTextures.get(this.get_texture()));
//     sprite.anchor.set(0.5, 0.95);

//     return sprite;
//   }

//   // Temporary wave-y logic
//   private total_elapsed_seconds: number = Math.random();
//   private readonly wave_speed_variation: number = 0.1;
//   private wave_speed: number = 1 - this.wave_speed_variation / 2 + Math.random() * this.wave_speed_variation;
//   public update(elapsed_seconds: number): void {
//     super.update(elapsed_seconds);
//     this.total_elapsed_seconds += elapsed_seconds * this.wave_speed;
//     this.display_object.skew.x = Math.sin(this.total_elapsed_seconds * 2) / 80;
//   }

//   private get_texture(): GTTextureAsset {
//     switch (this.entity.variation) {
//       case 1:
//         return "entity-tree-1";
//       case 2:
//         return "entity-tree-2";
//       case 3:
//         return "entity-tree-3";
//     }
//   }

//   public on_destroy(): void {}
// }
