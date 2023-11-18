import { GTTextures } from "../../../assets/textures/Textures";
import { SceneObjectGroup } from "../../../display/sceneobject/SceneObjectGroup";
import { _3DSceneEntityObject, _3DSceneObject } from "../../../display/sceneobject/SceneObject";
import {
  BufferGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshLambertMaterial,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from "three";
import { GameDisplay } from "../../../display/GameDisplay";
import { Chunk } from "./Chunk";

export class ChunkSceneObjectGroup extends SceneObjectGroup {
  constructor(display: GameDisplay, chunk: Chunk) {
    super(display);

    this.scene_objects.push(new ChunkSceneObjectGrass(display, chunk), new ChunkSceneObjectPlane(display, chunk));
  }
}

class ChunkSceneObjectPlane extends _3DSceneObject {
  public readonly mesh: Mesh;
  constructor(display: GameDisplay, protected readonly chunk: Chunk) {
    super(display);
    this.mesh = this.get_mesh();
  }

  protected get_mesh(): Mesh {
    const plane_geometry = new PlaneGeometry(Chunk.size, Chunk.size);
    const plane_material = new MeshLambertMaterial({ color: 0x798b4d });
    const plane = new Mesh(plane_geometry, plane_material);
    plane.position.x = this.chunk.pos.x + 0.5 * Chunk.size;
    plane.position.y = this.chunk.pos.y + 0.5 * Chunk.size;

    return plane;
  }

  public update(elapsed_seconds: number): void {}
}

class ChunkSceneObjectGrass extends _3DSceneObject {
  public readonly mesh: Mesh;
  constructor(display: GameDisplay, protected readonly chunk: Chunk) {
    super(display);
    this.mesh = this.get_mesh();
  }

  protected get_mesh(): Mesh {
    const blade_count: number = 12000;

    const grass_geometry = new PlaneGeometry(0.05, 0.2);
    grass_geometry.rotateX((Math.PI * 2) / 5);

    const grass_material = new MeshLambertMaterial({ color: 0x798b4d });
    const grass = new InstancedMesh(grass_geometry, grass_material, blade_count);

    const matrix = new Matrix4();
    for (let i: number = 0; i < blade_count; i++) {
      const position = new Vector3(
        ((i * i * 2345.1234674) % Chunk.size) + this.chunk.pos.x,
        ((i * i * 3456.134546574) % Chunk.size) + this.chunk.pos.y,
        0.1
      );
      matrix.setPosition(position);
      grass.setMatrixAt(i, matrix);
    }

    return grass;
  }

  public update(elapsed_seconds: number): void {}
}
