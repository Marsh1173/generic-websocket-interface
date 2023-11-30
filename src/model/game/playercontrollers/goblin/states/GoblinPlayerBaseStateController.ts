import { Goblin } from "../../../entities/goblin/Goblin";
import { PlayerInput } from "../../../gamesytemio/playerinput/PlayerInputEnum";

export abstract class GoblinPlayerBaseStateController {
  constructor(protected readonly goblin: Goblin) {}

  public readonly process_input: Readonly<Record<PlayerInput, () => void>> = {
    [PlayerInput.MoveDownStart]: () => {},
    [PlayerInput.MoveDownEnd]: () => {},
    [PlayerInput.MoveUpStart]: () => {},
    [PlayerInput.MoveUpEnd]: () => {},
    [PlayerInput.MoveLeftStart]: () => {},
    [PlayerInput.MoveLeftEnd]: () => {},
    [PlayerInput.MoveRightStart]: () => {},
    [PlayerInput.MoveRightEnd]: () => {},
    [PlayerInput.PrimaryActionStart]: this.primary_action_start.bind(this),
    [PlayerInput.PrimaryActionEnd]: this.primary_action_end.bind(this),
    [PlayerInput.SecondaryActionStart]: this.secondary_action_start.bind(this),
    [PlayerInput.SecondaryActionEnd]: this.secondary_action_end.bind(this),
    [PlayerInput.TertiaryActionStart]: this.tertiary_action_start.bind(this),
    [PlayerInput.TertiaryActionEnd]: this.tertiary_action_end.bind(this),
    [PlayerInput.QuaternaryActionStart]: this.quaternary_action_start.bind(this),
    [PlayerInput.QuaternaryActionEnd]: this.quaternary_action_end.bind(this),
    [PlayerInput.InteractActionStart]: this.interact_action_start.bind(this),
    [PlayerInput.InteractActionEnd]: this.interact_action_end.bind(this),
  };

  protected primary_action_start() {}

  protected primary_action_end() {}

  protected secondary_action_start() {}

  protected secondary_action_end() {}

  protected tertiary_action_start() {}

  protected tertiary_action_end() {}

  protected quaternary_action_start() {}

  protected quaternary_action_end() {}

  protected interact_action_start() {}

  protected interact_action_end() {}
}
