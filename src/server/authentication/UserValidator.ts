import { SafeUserData } from "../../model/user/UserData";
import { FailureMsg, Success } from "../utils/ReturnMsg";
import { ReturnMsg } from "../utils/ReturnMsg";
import { IAuthenticationService } from "./AuthenticationService";

export interface AuthenticationSuccess extends Success {
  user_data: SafeUserData;
}
export type AuthenticationReturnMsg = FailureMsg | AuthenticationSuccess;

export interface IUserValidator {
  attempt_validate_user_login(
    user_id: string,
    password: string
  ): AuthenticationReturnMsg;
  attempt_validate_user_register(
    user_id: string,
    password: string,
    email_address: string
  ): AuthenticationReturnMsg;
}

export class UserValidator implements IUserValidator {
  constructor(private readonly auth_service: IAuthenticationService) {}

  public attempt_validate_user_login(
    user_id: string,
    password: string
  ): AuthenticationReturnMsg {
    //validate user id and password
    let validate_user_id_and_password: AuthenticationReturnMsg =
      this.auth_service.server_app.user_dao.validate_login({
        user_id,
        password,
      });
    if (!validate_user_id_and_password.success) {
      return validate_user_id_and_password;
    }

    //check if user is already logged in
    let already_logged_in: ReturnMsg =
      this.auth_service.authenticated_user_tracker.attempt_add_user(user_id);
    if (!already_logged_in.success) {
      return already_logged_in;
    }

    return validate_user_id_and_password;
  }

  public attempt_validate_user_register(
    user_id: string,
    password: string,
    email_address: string
  ): AuthenticationReturnMsg {
    return this.auth_service.server_app.user_dao.register_user({
      user_id,
      password,
      email_address,
    });
  }
}
