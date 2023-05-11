import { IClientTalker } from "../../network/user/ClientTalker";
import { UserMap } from "../../network/user/UserMap";
import { IAuthenticationService } from "../AuthenticationService";
import { UnauthenticatedUser } from "./UnauthenticatedUser";

export class UnauthenticatedUserMap extends UserMap<UnauthenticatedUser> {
  constructor(private readonly auth_service: IAuthenticationService) {
    super();
  }

  public attach_user(user: IClientTalker): UnauthenticatedUser {
    let user_wrapper: UnauthenticatedUser = new UnauthenticatedUser(
      this.auth_service,
      user,
      this
    );
    this.attach_user_to_map(user_wrapper);
    return user_wrapper;
  }
}
