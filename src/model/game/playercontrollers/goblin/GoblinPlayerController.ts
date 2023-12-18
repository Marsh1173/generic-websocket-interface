import { Id, uuid } from "../../../common/Id";
import { StaticPoint } from "../../../common/math/geometry/Point";
import { Goblin } from "../../entities/goblin/Goblin";
import { GoblinStateBehaviorModule } from "../../entities/goblin/behavior/goblinstate/GoblinStateBehaviorModule";
import { LocalGameSystem } from "../../gamesystem/LocalGameSystem";
import { PlayerInput } from "../../gamesytemio/playerinput/PlayerInputEnum";
import { PlayerInputObserver } from "../../gamesytemio/playerinput/PlayerInputObserver";
import { EntityHoverController } from "./hover/EntityHoverController";
import { GoblinPlayerDashController } from "./GoblinPlayerDashController";
import { GoblinPlayerMoveController } from "./GoblinPlayerMoveController";
import { GoblinPlayerBaseStateController } from "./states/GoblinPlayerBaseStateController";
import { GoblinPlayerIdleController } from "./states/GoblinPlayerIdleController";
import { ItemEnum } from "../../items/Item";

export class GoblinPlayerController implements PlayerInputObserver {
  public readonly id: Id = uuid();
  public global_mouse_pos: StaticPoint;

  protected readonly move_controller: GoblinPlayerMoveController;
  protected readonly dash_controller: GoblinPlayerDashController;
  protected readonly hover_controller: EntityHoverController;

  protected controller_state: GoblinPlayerBaseStateController;

  constructor(protected readonly goblin: Goblin, protected readonly game_system: LocalGameSystem) {
    this.move_controller = new GoblinPlayerMoveController(this.goblin);
    this.dash_controller = new GoblinPlayerDashController();
    this.controller_state = new GoblinPlayerIdleController(this.goblin);
    this.hover_controller = new EntityHoverController(this.game_system, this.goblin);

    this.global_mouse_pos = this.game_system.game_system_io.player_input_manager.global_mouse_pos;
  }

  public readonly on_input = (params: PlayerInput) => {
    const goblin_state: GoblinStateBehaviorModule = this.goblin.behavior_module.state;

    if (
      this.move_controller.attempt_parse_move_input(params) ||
      this.dash_controller.attempt_parse_dash_input(params, goblin_state)
    ) {
      return;
    }

    switch (params) {
      case PlayerInput.PrimaryActionStart:
        if (goblin_state.inner.type === "GoblinInactiveState") {
          this.goblin.inventory_module.attempt_insert({ type: ItemEnum.Meat });
          // goblin_state.inner.attempt_snipe(this.global_mouse_pos);
        }
        break;
      case PlayerInput.SecondaryActionStart:
        if (goblin_state.inner.type === "GoblinInactiveState") {
          this.goblin.inventory_module.attempt_insert({ type: ItemEnum.Wood });
          // goblin_state.inner.attempt_shoot_arrow(this.global_mouse_pos);
        }
        break;
    }

    this.controller_state.process_input[params]();
  };

  public on_update_global_mouse_pos = (params: StaticPoint) => {
    this.hover_controller.update_mouse_pos(params);
  };
}
