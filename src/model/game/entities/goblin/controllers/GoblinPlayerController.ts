import { Id, uuid } from "../../../../utils/Id";
import { Point } from "../../../../utils/physics/geometry/Point";
import { HumanInputEnum } from "../../../gamesytemio/humaninput/HumanInputEnum";
import { HumanInputObserver } from "../../../gamesytemio/humaninput/HumanInputObserver";
import { Goblin } from "../Goblin";

export class GoblinPlayerController implements HumanInputObserver {
  public readonly id: Id = uuid();

  constructor(private readonly goblin: Goblin) {}

  public readonly on_input = (input: HumanInputEnum) => {
    switch (input) {
      case HumanInputEnum.MoveUpStart:
        this.goblin.behavior_module.move.move_up(true);
        break;
      case HumanInputEnum.MoveUpEnd:
        this.goblin.behavior_module.move.move_up(false);
        break;
      case HumanInputEnum.MoveDownStart:
        this.goblin.behavior_module.move.move_down(true);
        break;
      case HumanInputEnum.MoveDownEnd:
        this.goblin.behavior_module.move.move_down(false);
        break;
      case HumanInputEnum.MoveLeftStart:
        this.goblin.behavior_module.move.move_left(true);
        break;
      case HumanInputEnum.MoveLeftEnd:
        this.goblin.behavior_module.move.move_left(false);
        break;
      case HumanInputEnum.MoveRightStart:
        this.goblin.behavior_module.move.move_right(true);
        break;
      case HumanInputEnum.MoveRightEnd:
        this.goblin.behavior_module.move.move_right(false);
        break;
    }
  };

  public on_mouse_move = (params: Readonly<Point>) => {};
}
