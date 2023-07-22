import {
  EntityName,
  EntityNameStr,
  EntityTexture,
  EntityTextures,
} from "./EntityTextures";
import {
  GroundName,
  GroundNameStr,
  GroundTexture,
  GroundTextures,
} from "./GroundTextures";
import { StringPrefix, add_path_to_record_values, wrap_record } from "./Utils";
import { Assets, Resource, Texture } from "pixi.js";

export type GTTexture =
  | StringPrefix<EntityTexture, EntityName>
  | StringPrefix<GroundTexture, GroundName>;

export abstract class ImageAssets {
  public static readonly texture_paths: Record<GTTexture, string> =
    add_path_to_record_values(
      {
        ...wrap_record<EntityName, EntityTexture>(
          EntityTextures,
          EntityNameStr
        ),
        ...wrap_record<GroundName, GroundTexture>(
          GroundTextures,
          GroundNameStr
        ),
      },
      "assets/images"
    );

  private static readonly gt_textures: GTTexture[] = Object.keys(
    this.texture_paths
  ) as GTTexture[];

  public static textures: Record<GTTexture, Texture<Resource>>;

  public static async load_all_images() {
    this.textures = (
      await Promise.all(
        this.gt_textures.map(async (gt_texture) => {
          return await Assets.load(this.texture_paths[gt_texture]).then(
            (texture) => {
              return { [gt_texture]: texture };
            }
          );
        })
      )
    ).reduce((acc, r) => {
      return { ...acc, ...r };
    }) as any;
  }
}
