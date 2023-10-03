import { Id, uuid } from "../../../../common/Id";
import { StaticPoint } from "../../../../common/math/geometry/Point";
import { GameSystem } from "../../../gamesystem/GameSystem";
import { HumanInputEnum } from "../../../gamesytemio/humaninput/HumanInputEnum";
import { HumanInputObserver } from "../../../gamesytemio/humaninput/HumanInputObserver";
import { Goblin } from "../Goblin";

export class GoblinPlayerController implements HumanInputObserver {
  public readonly id: Id = uuid();

  constructor(private readonly goblin: Goblin, private readonly game_system: GameSystem) {}

  public readonly on_input = (params: { input: HumanInputEnum; starting: boolean }) => {
    switch (params.input) {
      case HumanInputEnum.MoveUp:
        this.goblin.behavior_module.move.update_state({ up: params.starting });
        break;
      case HumanInputEnum.MoveDown:
        this.goblin.behavior_module.move.update_state({
          down: params.starting,
        });
        break;
      case HumanInputEnum.MoveLeft:
        this.goblin.behavior_module.move.update_state({
          left: params.starting,
        });
        break;
      case HumanInputEnum.MoveRight:
        this.goblin.behavior_module.move.update_state({
          right: params.starting,
        });
        break;
    }
    this.goblin.behavior_module.state.on_input(params.input, params.starting);
  };

  public on_mouse_move = (params: StaticPoint) => {
    this.goblin.behavior_module.state.on_focus_move(params);
  };
}
