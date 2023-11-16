import { Group, Mesh, MeshLambertMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export type GTModelAsset = "pillar" | "rock_1" | "tree";

export abstract class GTModels {
  private static loader = new GLTFLoader();

  public static async load_models() {
    const tree: Group = await new Promise((resolve) => {
      this.loader.load("./assets/models/tree.glb", (gltf) => {
        resolve(gltf.scene);
      });
    });

    const pillar: Group = await new Promise((resolve) => {
      this.loader.load("./assets/models/pillar.glb", (gltf) => {
        resolve(gltf.scene);
      });
    });

    const rock_1: Group = await new Promise((resolve) => {
      this.loader.load(
        "./assets/models/rock_1.glb",
        (gltf) => {
          gltf.scene.children.forEach((child) => {
            (child as Mesh).material = new MeshLambertMaterial({ color: 0x888888 });
          });
          resolve(gltf.scene);
        },
        () => {},
        (err) => {
          console.log("Error loading model: " + err);
        }
      );
    });

    this.models = {
      pillar,
      rock_1,
      tree,
    };
  }

  public static get(key: GTModelAsset): Group {
    if (!GTModels.models) {
      throw new Error("GT models have not been initialized yet.");
    }
    return GTModels.models[key].clone();
  }
  protected static models: Record<GTModelAsset, Group> | undefined = undefined;
}
