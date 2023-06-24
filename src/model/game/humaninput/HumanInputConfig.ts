import { HumanInputEnum } from "./HumanInputEnum";

export type HumanInputConfig = {
  code: string;
  start: HumanInputEnum;
  end?: HumanInputEnum;
}[];

export const DEFAULT_HUMAN_INPUT_CONFIG: HumanInputConfig = [
  {
    code: "KeyW",
    start: HumanInputEnum.MoveUpStart,
    end: HumanInputEnum.MoveUpEnd,
  },
  {
    code: "KeyS",
    start: HumanInputEnum.MoveDownStart,
    end: HumanInputEnum.MoveDownEnd,
  },
  {
    code: "KeyA",
    start: HumanInputEnum.MoveLeftStart,
    end: HumanInputEnum.MoveLeftEnd,
  },
  {
    code: "KeyD",
    start: HumanInputEnum.MoveRightStart,
    end: HumanInputEnum.MoveRightEnd,
  },
  {
    code: "0",
    start: HumanInputEnum.PrimaryActionStart,
    end: HumanInputEnum.PrimaryActionEnd,
  },
  {
    code: "2",
    start: HumanInputEnum.SecondaryActionStart,
    end: HumanInputEnum.SecondaryActionEnd,
  },
];
