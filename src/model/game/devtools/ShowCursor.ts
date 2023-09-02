import { DisplayObject, Graphics } from "pixi.js";
import { uuid } from "../../common/Id";
import { Renderable } from "../display/renderables/Renderable";
import { LocalGameSystem } from "../gamesystem/LocalGameSystem";
import { BaseEntity } from "../entitymodel/entity/BaseEntityClass";
import { DynamicPoint } from "../entitymodel/gamespacedata/dynamicpoint/DynamicPoint";

export function ShowCursor(game_system: LocalGameSystem) {
  const cursor = new Cursor({ id: uuid() });
  const renderable = new CursorRenderable(cursor, game_system);

  game_system.game_system_io.human_input_manager.add_observer({
    id: uuid(),
    on_input: () => {},
    on_mouse_move: (params) => {
      cursor.game_space_data.pos.x = params.x;
      cursor.game_space_data.pos.y = params.y;
    },
  });

  game_system.display.canvas.insert_renderable(renderable);
}

class Cursor extends BaseEntity {
  public game_space_data: DynamicPoint = new DynamicPoint(
    {
      pos: { x: 0, y: 0 },
    },
    false
  );
}

class CursorRenderable extends Renderable<any> {
  protected get_display_object(): DisplayObject {
    const circle: Graphics = new Graphics();
    circle.beginFill(0xffffff);
    circle.drawCircle(0, 0, 10);

    return circle;
  }
}
