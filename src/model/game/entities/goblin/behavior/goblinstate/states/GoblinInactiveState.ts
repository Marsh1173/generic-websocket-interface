import { uuid } from "../../../../../../common/Id";
import { GTCollision } from "../../../../../../common/physics/collision/GTCollision";
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
      this.shoot_arrow();
    } else if (this.is_sniping()) {
      this.active_inputs.delete(HumanInputEnum.PrimaryAction);
      this.snipe();
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

  private previous_snipe_value: boolean = false;
  private is_sniping(): boolean {
    const current = this.active_inputs.has(HumanInputEnum.PrimaryAction);
    const changed = current !== this.previous_snipe_value;
    this.previous_snipe_value = current;
    return current && changed;
  }

  private shoot_arrow() {
    const rotation = GTMath.Rotation(
      this.goblin.game_space_data.pos,
      this.focus_pos
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

  private snipe() {
    const closest = this.game_system.entities.find.dynamic_point_entities
      .inside_box(this.focus_pos, 4)
      .filter((e) => !!e.health_module)
      .sort((e1, e2) => {
        return GTCollision.CompareDistance(
          e1.game_space_data.pos,
          e2.game_space_data.pos,
          this.focus_pos
        );
      })
      .at(0);

    if (closest) {
      closest.health_module!.receive_damage({ amount: 20 });
    }
  }
}

export interface GoblinInactiveStateData {
  type: "GoblinInactiveStateData";
}
