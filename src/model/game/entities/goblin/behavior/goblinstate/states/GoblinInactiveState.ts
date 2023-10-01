import { uuid } from "../../../../../../common/Id";
import { StaticPoint } from "../../../../../../common/physics/geometry/Point";
import { GTMath } from "../../../../../../common/physics/math/GTMath";
import { HumanInputEnum } from "../../../../../gamesytemio/humaninput/HumanInputEnum";
import { BaseGoblinState, BaseGoblinStateData } from "./../GoblinState";

export class GoblinInactiveState extends BaseGoblinState {
  public readonly type = "GoblinInactiveState";

  constructor(base_data: BaseGoblinStateData, data: GoblinInactiveStateData) {
    super(base_data);
  }

  public update(elapsed_seconds: number): void {
    if (this.is_starting_dash()) {
      this.goblin.behavior_module.state.set_state({
        type: "GoblinDashingStateData",
      });
    } else if (this.is_shooting()) {
      this.active_inputs.delete(HumanInputEnum.SecondaryAction);
      this.shoot_arrow(this.focus_pos);
    }
  }

  private is_starting_dash(): boolean {
    return this.active_inputs.has(HumanInputEnum.TertiaryAction);
  }

  private previous_shoot_value: boolean = false;
  private is_shooting(): boolean {
    const current = this.active_inputs.has(HumanInputEnum.SecondaryAction);
    const changed = current !== this.previous_shoot_value;
    this.previous_shoot_value = current;
    return current && changed;
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

export interface GoblinInactiveStateData {
  type: "GoblinInactiveStateData";
}
