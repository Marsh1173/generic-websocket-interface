import { IRenderer, Texture as PixiJSTexture, utils } from "pixi.js";
import { Resolution } from "../../display/Resolution";
import { ImageAsset, GTImageAssets } from "./images/Images";
import { GTGraphicsAssets, GraphicAsset } from "./graphics/Graphics";
import { Texture as ThreeJSTexture } from "three";

export type GTTextureAsset = ImageAsset | GraphicAsset;

export abstract class GTTextures {
  protected static previously_loaded_res: Resolution | undefined = undefined;

  public static async load(res: Resolution, renderer: IRenderer) {
    if (res !== GTTextures.previously_loaded_res) {
      utils.destroyTextureCache();

      const images = await GTImageAssets.load_all_images(res);
      const graphics = GTGraphicsAssets.draw_graphics(res, renderer);

      GTTextures.pixijs_textures = {
        ...images.pixijs,
        ...graphics,
      };

      GTTextures.threejs_textures = images.threejs;

      GTTextures.previously_loaded_res = res;
    }
  }

  public static get_pixijs(key: GTTextureAsset): PixiJSTexture {
    if (!GTTextures.pixijs_textures) {
      throw new Error("GT PixiJS textures have not been initialized yet.");
    }
    throw new Error("It's possible the way we're getting the textures isn't working, but we haven't tested.");
    // return GTTextures.pixijs_textures[key];
  }

  public static get_threejs(key: ImageAsset): ThreeJSTexture {
    if (!GTTextures.threejs_textures) {
      throw new Error("GT ThreeJS textures have not been initialized yet.");
    }
    return GTTextures.threejs_textures[key];
  }

  protected static pixijs_textures: Record<GTTextureAsset, PixiJSTexture> | undefined = undefined;
  protected static threejs_textures: Record<ImageAsset, ThreeJSTexture> | undefined = undefined;
}
