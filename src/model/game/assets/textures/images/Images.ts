import { Assets, Texture as PixiJSTexture } from "pixi.js";
import { add_path_to_record_values } from "../../Utils";
import { EntityImageAsset, EntityImagesCompletePaths } from "./EntityImages";
import { GroundImageAsset, GroundImagesCompletePaths } from "./GroundImages";
import { Resolution, ResolutionScale } from "../../../display/Resolution";
import { DataTexture, Texture as ThreeJSTexture } from "three";

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

  public static async load_all_images(
    res: Resolution
  ): Promise<{ pixijs: Record<ImageAsset, PixiJSTexture>; threejs: Record<ImageAsset, ThreeJSTexture> }> {
    return (
      await Promise.all(
        GTImageAssets.image_keys.map(async (image_key) => {
          const url = GTImageAssets.image_paths[image_key];
          const image = await this.load_image(url);

          //make pixijs texture
          const pixijs_texture = PixiJSTexture.from(image);
          const scale = ResolutionScale[res] * 0.5;
          // Multiply by 0.5 to force textures to be twice as big as necessary for 4k resolution so any small downscales aren't irreversible
          // Ideally, we'd load different-sized images based on the resolution. That's a TODO
          pixijs_texture.baseTexture.setRealSize(pixijs_texture.width * scale, pixijs_texture.height * scale);

          //make threejs texture
          const threejs_texture = new ThreeJSTexture(image);
          threejs_texture.needsUpdate = true;

          return {
            pixijs: {
              [image_key]: pixijs_texture,
            },
            threejs: {
              [image_key]: threejs_texture,
            },
          };
        })
      )
    ).reduce((acc, r) => {
      return {
        pixijs: { ...acc.pixijs, ...r.pixijs },
        threejs: { ...acc.threejs, ...r.threejs },
      };
    }) as any;
  }

  private static async load_image(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", (err) => reject(err));
      img.src = url;
    });
  }
}
