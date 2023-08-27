import { Id, uuid } from "../../../../common/Id";
import { Point, StaticPoint } from "../../../../common/physics/geometry/Point";
import { StaticVector } from "../../../../common/physics/geometry/Vector";
import { GTMath } from "../../../../common/physics/math/GTMath";
import { GameSystem } from "../../../gamesystem/GameSystem";
import { HumanInputEnum } from "../../../gamesytemio/humaninput/HumanInputEnum";
import { HumanInputObserver } from "../../../gamesytemio/humaninput/HumanInputObserver";
import { Goblin } from "../Goblin";

export class GoblinPlayerController implements HumanInputObserver {
  public readonly id: Id = uuid();

  constructor(
    private readonly goblin: Goblin,
    private readonly game_system: GameSystem
  ) {}

  public readonly on_input = (params: {
    input: HumanInputEnum;
    mouse_pos: StaticPoint;
  }) => {
    switch (params.input) {
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
      case HumanInputEnum.PrimaryActionStart:
        // this.push_player(params.mouse_pos);
        break;
      case HumanInputEnum.SecondaryActionStart:
        this.shoot_arrow(params.mouse_pos);
        break;
    }
  };

  public on_mouse_move = (params: Readonly<Point>) => {};

  private push_player(mouse_pos: StaticPoint) {
    const goblin_to_point_v: StaticVector = {
      x: (mouse_pos.x - this.goblin.game_space_data.pos.x) / 100,
      y: (mouse_pos.y - this.goblin.game_space_data.pos.y) / 100,
    };
    this.goblin.game_space_data.instant_act_on(goblin_to_point_v);
  }

  private shoot_arrow(mouse_pos: StaticPoint) {
    const rotation = GTMath.Rotation(
      this.goblin.game_space_data.pos,
      mouse_pos
    );
    this.game_system.entities.make.arrow({
      type: "ArrowData",
      id: uuid(),
      game_space_data: {
        pos: { ...this.goblin.game_space_data.pos },
      },
      rotation,
    });
  }
}
