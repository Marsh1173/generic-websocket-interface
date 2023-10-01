import { DisplayObject, Graphics } from "pixi.js";
import { uuid } from "../../common/Id";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { BaseEntity } from "../entitymodel/entity/BaseEntityClass";
import {
  DynamicPoint,
  DynamicPointModule,
} from "../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";
import { GameSpriteHandler } from "../display/gamesprite/GameSpriteHandler";
import { GameSprite } from "../display/gamesprite/GameSprite";
import { GameEntitySprite } from "../display/gamesprite/GameEntitySprite";

export function ShowCursor(game_system: LocalGameSystem) {
  game_system.display.canvas.insert_sprite_handler(
    new CursorSpriteHandler(game_system)
  );
}

class CursorSpriteHandler extends GameSpriteHandler {
  public readonly visual_data_sprites: GameSprite[];

  constructor(game_system: LocalGameSystem) {
    super(uuid(), game_system);
    const cursor = new Cursor({ id: uuid() });

    this.visual_data_sprites = [new CursorSprite(cursor, this.game_system)];
  }
}

class CursorSprite extends GameEntitySprite<Cursor> {
  public readonly display_object: DisplayObject;
  constructor(entity: Cursor, game_system: LocalGameSystem) {
    super(entity, game_system);

    this.display_object = this.get_display_object();

    game_system.game_system_io.human_input_manager.add_observer({
      id: uuid(),
      on_input: () => {},
      on_mouse_move: (params) => {
        entity.game_space_data.pos.x = params.x;
        entity.game_space_data.pos.y = params.y;
      },
    });
  }

  protected get_display_object(): DisplayObject {
    const circle: Graphics = new Graphics();
    circle.beginFill(0xffffff);
    circle.drawCircle(0, 0, 10);
    return circle;
  }

  public on_destroy(): void {}
}

class Cursor extends BaseEntity {
  public game_space_data: DynamicPoint = new DynamicPointModule(
    {
      pos: { x: 0, y: 0 },
    },
    false
  );
}
