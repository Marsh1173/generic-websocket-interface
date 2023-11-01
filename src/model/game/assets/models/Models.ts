import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export type GTModelAsset = "pillar";

export abstract class GTModels {
  private static loader = new GLTFLoader();

  public static async load_models() {
    const pillar: Group = await new Promise((resolve) => {
      this.loader.load("./assets/models/pillar.glb", (gltf) => {
        resolve(gltf.scene);
      });

      this.loader.parse;
    });

    this.models = {
      pillar: pillar,
    };
  }

  public static get(key: GTModelAsset): Group {
    if (!GTModels.models) {
      throw new Error("GT models have not been initialized yet.");
    }
    return GTModels.models[key];
  }
  protected static models: Record<GTModelAsset, Group> | undefined = undefined;
}
