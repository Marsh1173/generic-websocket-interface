import { IRenderer, Texture, utils } from "pixi.js";
import { Resolution } from "../../display/Resolution";
import { ImageAsset, GTImageAssets } from "./images/Images";
import { GTGraphicsAssets, GraphicAsset } from "./graphics/Graphics";

export type GTTextureAsset = ImageAsset | GraphicAsset;

export abstract class GTTextures {
  protected static previously_loaded_res: Resolution | undefined = undefined;

  public static async load(res: Resolution, renderer: IRenderer) {
    if (res !== GTTextures.previously_loaded_res) {
      utils.destroyTextureCache();

      const images = await GTImageAssets.load_all_images(res);
      const graphics = GTGraphicsAssets.draw_graphics(res, renderer);

      GTTextures.textures = {
        ...images,
        ...graphics,
      };

      GTTextures.previously_loaded_res = res;
    }
  }

  public static get(key: GTTextureAsset): Texture {
    if (!GTTextures.textures) {
      throw new Error("GTTextures has not been initialized yet.");
    }
    return GTTextures.textures[key];
  }

  protected static textures: Record<GTTextureAsset, Texture> | undefined = undefined;
}
