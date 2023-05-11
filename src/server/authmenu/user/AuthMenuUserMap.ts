import { SafeUserData, UserId } from "../../../model/user/UserData";
import { IClientTalker } from "../../network/user/ClientTalker";
import { UserMap } from "../../network/user/UserMap";
import { IAuthMenuService } from "../AuthMenuService";
import { AuthMenuUser } from "./AuthMenuUser";

export class AuthMenuUserMap extends UserMap<AuthMenuUser> {
  constructor(private readonly auth_menu_service: IAuthMenuService) {
    super();
  }

  public attach_user(
    client_talker: IClientTalker,
    user_data: SafeUserData
  ): AuthMenuUser {
    let auth_menu_user: AuthMenuUser = new AuthMenuUser(
      this.auth_menu_service,
      client_talker,
      this,
      user_data
    );
    this.attach_user_to_map(auth_menu_user);
    return auth_menu_user;
  }
}
