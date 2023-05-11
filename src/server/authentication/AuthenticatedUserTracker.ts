import { UserId } from "../../model/user/UserData";
import { ReturnMsg } from "../utils/ReturnMsg";

export interface IAuthenticatedUserTracker {
  attempt_add_user(id: UserId): ReturnMsg;
  disconnect_authenticated_user(id: UserId): void;
}

export class AuthenticatedUserTracker implements IAuthenticatedUserTracker {
  private readonly authenticated_user: Set<UserId> = new Set();

  public attempt_add_user(id: UserId): ReturnMsg {
    if (this.authenticated_user.has(id)) {
      return { success: false, msg: "User is already logged in." };
    } else {
      this.authenticated_user.add(id);
      return { success: true };
    }
  }

  public disconnect_authenticated_user(id: UserId): void {
    this.authenticated_user.delete(id);
  }
}
