import { Goblin } from "../../entities/goblin/Goblin";
import { PlayerInput } from "../../gamesytemio/playerinput/PlayerInputEnum";

export class GoblinPlayerMoveController {
  protected readonly move_state = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  constructor(private readonly goblin: Goblin) {}

  public attempt_parse_move_input(input: PlayerInput): boolean {
    switch (input) {
      case PlayerInput.MoveUpStart:
        this.move_state.up = true;
        break;
      case PlayerInput.MoveUpEnd:
        this.move_state.up = false;
        break;
      case PlayerInput.MoveDownStart:
        this.move_state.down = true;
        break;
      case PlayerInput.MoveDownEnd:
        this.move_state.down = false;
        break;
      case PlayerInput.MoveLeftStart:
        this.move_state.left = true;
        break;
      case PlayerInput.MoveLeftEnd:
        this.move_state.left = false;
        break;
      case PlayerInput.MoveRightStart:
        this.move_state.right = true;
        break;
      case PlayerInput.MoveRightEnd:
        this.move_state.right = false;
        break;
      default:
        return false;
    }

    this.update_goblin_move_angle();
    return true;
  }

  protected update_goblin_move_angle() {
    let angle: number | undefined = undefined;

    if (this.move_state.right && !this.move_state.left) {
      //moving right

      if (this.move_state.up && !this.move_state.down) {
        //moving up
        angle = Math.PI / 4;
      } else if (this.move_state.down && !this.move_state.up) {
        //moving down
        angle = (Math.PI * 7) / 4;
      } else if (this.move_state.up === this.move_state.down) {
        //moving neither up nor down
        angle = 0;
      }
    } else if (this.move_state.left && !this.move_state.right) {
      //moving left

      if (this.move_state.up && !this.move_state.down) {
        //moving up
        angle = (Math.PI * 3) / 4;
      } else if (this.move_state.down && !this.move_state.up) {
        //moving down
        angle = (Math.PI * 5) / 4;
      } else if (this.move_state.up === this.move_state.down) {
        //moving neither up nor down
        angle = Math.PI;
      }
    } else if (this.move_state.right === this.move_state.left) {
      //moving neither right nor left

      if (this.move_state.up && !this.move_state.down) {
        //moving up
        angle = Math.PI / 2;
      } else if (this.move_state.down && !this.move_state.up) {
        //moving down
        angle = (Math.PI * 3) / 2;
      }
    }

    this.goblin.behavior_module.move.update_state({ angle });
  }
}
