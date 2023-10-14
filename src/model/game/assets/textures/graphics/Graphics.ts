import { Graphics, RenderTexture, IRenderer, Texture } from "pixi.js";
import { Resolution, ResolutionScale } from "../../../display/Resolution";
import { HealthGraphicAsset, HealthGraphicsCompletePaths } from "./HealthGraphics";
import { Rect } from "../../../../common/math/geometry/Rect";

export type GraphicAsset = HealthGraphicAsset;

export abstract class GTGraphicsAssets {
  private static readonly graphics_makers: Record<GraphicAsset, () => [Graphics, Rect]> = {
    ...HealthGraphicsCompletePaths,
  };

  private static readonly graphics_keys: GraphicAsset[] = Object.keys(
    GTGraphicsAssets.graphics_makers
  ) as GraphicAsset[];

  public static draw_graphics(res: Resolution, renderer: IRenderer): Record<GraphicAsset, Texture> {
    return GTGraphicsAssets.graphics_keys
      .map((graphic_key) => {
        const [graphic, dims] = GTGraphicsAssets.graphics_makers[graphic_key]();

        const res_downsize = ResolutionScale[res];
        graphic.scale.set(res_downsize);

        const renderTexture = RenderTexture.create({ width: dims.w * res_downsize, height: dims.h * res_downsize });
        renderer.render(graphic, { renderTexture });

        return { [graphic_key]: renderTexture };
      })
      .reduce((acc, r) => {
        return { ...acc, ...r };
      }) as any;
  }
}
