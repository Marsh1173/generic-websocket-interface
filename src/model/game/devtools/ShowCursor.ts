import { Application, Graphics } from "pixi.js";
import { uuid } from "../../utils/Id";
import { LocalGameSystemIO } from "../gamesytemio/LocalGameSystemIO";

export function ShowCursor(view_app: Application<HTMLCanvasElement>, game_system_io: LocalGameSystemIO) {
  const mouse_finder: Graphics = new Graphics();
  mouse_finder.beginFill(0xffffff);
  mouse_finder.drawCircle(0, 0, 10);
  game_system_io.human_input_manager.add_observer({
    id: uuid(),
    on_input: () => {},
    on_mouse_move: (params) => {
      mouse_finder.position.set(params.x, params.y);
    },
  });
  view_app.stage.addChild(mouse_finder);
}
