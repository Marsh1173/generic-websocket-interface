import { HumanInputEnum } from "./HumanInputEnum";

export type HumanInputConfig = Record<string, { start: HumanInputEnum; end: HumanInputEnum } | undefined>;

export const DEFAULT_HUMAN_INPUT_CONFIG: HumanInputConfig = {
  KeyW: {
    start: HumanInputEnum.MoveUpStart,
    end: HumanInputEnum.MoveUpEnd,
  },
  KeyS: {
    start: HumanInputEnum.MoveDownStart,
    end: HumanInputEnum.MoveDownEnd,
  },
  KeyA: {
    start: HumanInputEnum.MoveLeftStart,
    end: HumanInputEnum.MoveLeftEnd,
  },
  KeyD: {
    start: HumanInputEnum.MoveRightStart,
    end: HumanInputEnum.MoveRightEnd,
  },
  Mouse0: {
    start: HumanInputEnum.PrimaryActionStart,
    end: HumanInputEnum.PrimaryActionEnd,
  },
  Mouse2: {
    start: HumanInputEnum.SecondaryActionStart,
    end: HumanInputEnum.SecondaryActionEnd,
  },
};
