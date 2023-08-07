import { IUserState } from "../UserState";

export class LoadingUserState implements IUserState {
  public readonly type = "LoadingUserState";

  constructor() {}

  public leave_state(): void {}
}
