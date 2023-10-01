import { HumanInputEnum } from "./HumanInputEnum";

export type HumanInputConfig = Record<string, HumanInputEnum>;

export const DEFAULT_HUMAN_INPUT_CONFIG: HumanInputConfig = {
  KeyW: HumanInputEnum.MoveUp,
  KeyS: HumanInputEnum.MoveDown,
  KeyA: HumanInputEnum.MoveLeft,
  KeyD: HumanInputEnum.MoveRight,
  Mouse0: HumanInputEnum.PrimaryAction,
  Mouse2: HumanInputEnum.SecondaryAction,
  ShiftLeft: HumanInputEnum.TertiaryAction,
};
