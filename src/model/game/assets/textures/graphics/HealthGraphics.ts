import { Graphics } from "pixi.js";
import { StringPrefix, wrap_record } from "../../Utils";
import { Rect } from "../../../../common/math/geometry/Rect";

export const health_bar_px_width: number = 120;

const display_config = {
  bar_width: health_bar_px_width,
  height: 10,
  border: 2,
  hp_colors: {
    self: 0x00ff44, //light green
    no_team: 0xffffff, //white
    enemy: 0xff2222, //red
    other: 0xffdd44, //yellow
    ally: 0x33b1ff, //light blue
    after_image: 0xfbff8c, //pale yellow
  },
};

type HealthTypeName = "health";
const HealthTypeNameStr = "health";

type HealthGraphicIncompleteType = "background" | "damage-afterimage" | "color-bar";

const HealthGraphicMakers: Record<HealthGraphicIncompleteType, () => [Graphics, Rect]> = {
  background: () => {
    const w = display_config.bar_width + display_config.border * 2;
    const h = display_config.height + display_config.border * 2;

    const background_rect: Graphics = new Graphics();
    background_rect.beginFill(0x000000);
    background_rect.drawRect(0, 0, w, h);
    background_rect.endFill();
    return [background_rect, { w, h }];
  },
  "damage-afterimage": () => {
    const w = 2;
    const h = display_config.height;

    const color_bar = new Graphics();
    color_bar.beginFill(display_config.hp_colors.after_image);
    color_bar.drawRect(0, 0, w, h);
    color_bar.endFill();
    return [color_bar, { w, h: h }];
  },
  "color-bar": () => {
    const w = 2;
    const h = display_config.height;
    const gradient_height_fraction = h / 3;

    const color_bar = new Graphics();
    color_bar.beginFill(display_config.hp_colors.self);
    color_bar.drawRect(0, 0, w, h);
    color_bar.fill.alpha = 0.2;

    color_bar.fill.color = 0x000000;
    color_bar.drawRect(0, h - gradient_height_fraction, w, gradient_height_fraction);

    color_bar.fill.color = 0xffffff;
    color_bar.drawRect(0, 0, w, gradient_height_fraction);

    color_bar.endFill();
    return [color_bar, { w, h }];
  },
};

export type HealthGraphicAsset = StringPrefix<HealthGraphicIncompleteType, HealthTypeName>;

export const HealthGraphicsCompletePaths = wrap_record<
  HealthTypeName,
  () => [Graphics, Rect],
  HealthGraphicIncompleteType
>(HealthGraphicMakers, HealthTypeNameStr);
