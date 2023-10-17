import { IUserState } from "../UserState";

export class DeadUserState implements IUserState {
  public readonly type = "DeadUserState";

  constructor() {}

  public leave_state(): void {}
}
