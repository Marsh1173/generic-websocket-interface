import { uuid } from "../../../../../../common/Id";
import { GTCollision } from "../../../../../../common/math/collision/GTCollision";
import { GTMath } from "../../../../../../common/math/basic/GTMath";
import { PlayerInput } from "../../../../../gamesytemio/playerinput/PlayerInputEnum";
import { BaseGoblinState, BaseGoblinStateData } from "./../GoblinState";

export class GoblinInactiveState extends BaseGoblinState {
  public readonly type = "GoblinInactiveState";

  constructor(base_data: BaseGoblinStateData, data: GoblinInactiveStateData) {
    super(base_data);
  }

  public on_input(input: PlayerInput): void {
    switch (input) {
      case PlayerInput.TertiaryActionStart:
        this.goblin.behavior_module.state.set_state({
          type: "GoblinDashingStateData",
        });
        break;
      case PlayerInput.PrimaryActionStart:
        this.snipe();
        break;
      case PlayerInput.SecondaryActionStart:
        this.shoot_arrow();
        break;
    }
  }

  private shoot_arrow() {
    const rotation = GTMath.Rotation(this.goblin.game_space_data.pos, this.focus_pos);
    this.game_system.entities.make.arrow({
      type: "ArrowData",
      id: uuid(),
      game_space_data: {
        pos: { ...this.goblin.game_space_data.pos },
      },
      rotation,
    });
  }

  private snipe() {
    // const closest = this.game_system.entities.find.dynamic_point_entities
    //   .inside_box(this.focus_pos, 4)
    //   .filter((e) => !!e.health_module)
    //   .sort((e1, e2) => {
    //     return GTCollision.CompareDistance(e1.game_space_data.pos, e2.game_space_data.pos, this.focus_pos);
    //   })
    //   .at(0);
    // if (closest) {
    //   closest.health_module!.receive_damage({ amount: 20 });
    // }
  }
}

export interface GoblinInactiveStateData {
  type: "GoblinInactiveStateData";
}
