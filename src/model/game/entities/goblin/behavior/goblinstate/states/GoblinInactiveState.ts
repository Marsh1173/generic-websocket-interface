import { uuid } from "../../../../../../common/Id";
import { GTCollision } from "../../../../../../common/math/collision/GTCollision";
import { GTMath } from "../../../../../../common/math/basic/GTMath";
import { BaseGoblinState, BaseGoblinStateData } from "./../GoblinState";
import { StaticPoint } from "../../../../../../common/math/geometry/Point";

export class GoblinInactiveState extends BaseGoblinState {
  public readonly type = "GoblinInactiveState";

  constructor(base_data: BaseGoblinStateData, data: GoblinInactiveStateData) {
    super(base_data);
  }

  public attempt_shoot_arrow(p: StaticPoint) {
    const rotation = GTMath.Rotation(this.goblin.game_space_data.pos, p);
    this.game_system.entities.make.arrow({
      type: "ArrowData",
      id: uuid(),
      game_space_data: {
        pos: { ...this.goblin.game_space_data.pos },
      },
      rotation,
    });
  }

  public attempt_snipe(p: StaticPoint) {
    const closest = this.game_system.entities.find.dynamic_point_entities
      .inside_box(p, 4)
      .filter((e) => !!e.health_module)
      .sort((e1, e2) => {
        return GTCollision.CompareDistance(e1.game_space_data.pos, e2.game_space_data.pos, p);
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
