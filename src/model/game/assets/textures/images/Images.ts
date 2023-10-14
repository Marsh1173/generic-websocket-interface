import { Assets, Texture } from "pixi.js";
import { add_path_to_record_values } from "../../Utils";
import { EntityImageAsset, EntityImagesCompletePaths } from "./EntityImages";
import { GroundImageAsset, GroundImagesCompletePaths } from "./GroundImages";
import { Resolution, ResolutionScale } from "../../../display/Resolution";

export type ImageAsset = EntityImageAsset | GroundImageAsset;

export abstract class GTImageAssets {
  private static readonly image_paths: Record<ImageAsset, string> = add_path_to_record_values(
    {
      ...EntityImagesCompletePaths,
      ...GroundImagesCompletePaths,
    },
    "assets/images"
  );

  private static readonly image_keys: ImageAsset[] = Object.keys(GTImageAssets.image_paths) as ImageAsset[];

  public static async load_all_images(res: Resolution): Promise<Record<ImageAsset, Texture>> {
    return (
      await Promise.all(
        GTImageAssets.image_keys.map(async (image_key) => {
          return await Assets.load(GTImageAssets.image_paths[image_key]).then((image_path) => {
            const texture = new Texture(image_path);
            const scale = ResolutionScale[res] * 0.5;
            // multiply by 0.5 to force textures to be twice as big as necessary for 4k resolution so any small downscales aren't irreversible
            texture.baseTexture.setRealSize(texture.width * scale, texture.height * scale);
            return { [image_key]: texture };
          });
        })
      )
    ).reduce((acc, r) => {
      return { ...acc, ...r };
    }) as any;
  }
}
