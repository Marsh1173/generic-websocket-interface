import { PlayerInput } from "./PlayerInputEnum";

export namespace PlayerInputMap {
  export const key_down_to_input: Record<string, PlayerInput | undefined> = {
    KeyW: PlayerInput.MoveUpStart,
    KeyS: PlayerInput.MoveDownStart,
    KeyA: PlayerInput.MoveLeftStart,
    KeyD: PlayerInput.MoveRightStart,
    Mouse0: PlayerInput.PrimaryActionStart,
    Mouse2: PlayerInput.SecondaryActionStart,
    ShiftLeft: PlayerInput.TertiaryActionStart,
    KeyQ: PlayerInput.QuaternaryActionStart,
    KeyF: PlayerInput.InteractActionStart,
  };

  export const key_up_to_input: Record<string, PlayerInput | undefined> = {
    KeyW: PlayerInput.MoveUpEnd,
    KeyS: PlayerInput.MoveDownEnd,
    KeyA: PlayerInput.MoveLeftEnd,
    KeyD: PlayerInput.MoveRightEnd,
    Mouse0: PlayerInput.PrimaryActionEnd,
    Mouse2: PlayerInput.SecondaryActionEnd,
    ShiftLeft: PlayerInput.TertiaryActionEnd,
    KeyQ: PlayerInput.QuaternaryActionEnd,
    KeyF: PlayerInput.InteractActionEnd,
  };
}
