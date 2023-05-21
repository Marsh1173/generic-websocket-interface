import { UserData } from "../../../model/user/UserData";
import { UserAttemptLoginMsg } from "../api/AttemptLogin";
import { UserAttemptRegisterMsg } from "../api/AttemptRegister";
import { IClientTalker } from "../../network/user/ClientTalker";
import { User } from "../../network/user/User";
import { IAuthenticationService } from "../AuthenticationService";
import {
  AuthenticationReturnMsg,
  AuthenticationSuccess,
} from "../UserValidator";
import { UnauthenticatedUserMap } from "./UnauthenticatedUserMap";
import {
  UserAuthenticationMsg,
  UserAuthenticationMsgEnum,
  UserAuthenticationMsgParser,
} from "../api/AuthenticationApi";
import { JsonParser } from "../../network/jsonvalidation/JsonParser";
import { UserMessageNotImplemented } from "../../network/utils/errors";
import { ServerAuthenticationMsg } from "../../../client/authentication/network/api/AuthenticationApi";

export class UnauthenticatedUser extends User<
  UserAuthenticationMsg,
  ServerAuthenticationMsg
> {
  public json_parser: JsonParser<UserAuthenticationMsg> =
    UserAuthenticationMsgParser;

  constructor(
    private readonly auth_service: IAuthenticationService,
    user: IClientTalker,
    user_map: UnauthenticatedUserMap
  ) {
    super(user, user_map);
  }

  public process_message(msg: UserAuthenticationMsg): void {
    switch (msg.type) {
      case UserAuthenticationMsgEnum.AttemptLoginMsg:
        this.attempt_login(msg);
        break;
      case UserAuthenticationMsgEnum.AttemptRegisterMsg:
        this.attempt_register(msg);
        break;
      default:
        throw new UserMessageNotImplemented(msg);
    }
  }

  private attempt_login(msg: UserAttemptLoginMsg) {
    let validation_results: AuthenticationReturnMsg =
      this.auth_service.user_validator.attempt_validate_user_login(
        msg.user_id,
        msg.password
      );
    if (this.handle_authentication(validation_results)) {
      console.log(
        "Successfully authenticated user " +
          validation_results.user_data.user_id
      );
    }
  }

  private attempt_register(msg: UserAttemptRegisterMsg) {
    let register_results: AuthenticationReturnMsg =
      this.auth_service.user_validator.attempt_validate_user_register(
        msg.user_id,
        msg.password,
        msg.email
      );

    if (this.handle_authentication(register_results)) {
      console.log(
        "Successfully registered and authenticated user " +
          register_results.user_data.user_id
      );
    }
  }

  private handle_authentication(
    results: AuthenticationReturnMsg
  ): results is AuthenticationSuccess {
    if (!results.success) {
      this.send_unsuccessful_authentication(results.msg);
      return false;
    }

    setTimeout(() => {
      this.send_successful_authentication(results.user_data);
      let user: IClientTalker = this.deconstruct();
      this.auth_service.server_app.auth_menu_service.auth_menu_user_map.attach_user(
        user,
        results.user_data
      );
    }, 400); // small satisfaction delay on authentication
    return true;
  }

  private send_unsuccessful_authentication(msg: string) {
    this.send({
      type: "FailureMsg",
      msg,
    });
  }

  private send_successful_authentication(user_data: UserData) {
    this.send({
      type: "SuccessfulAuthenticationMsg",
      user_data,
    });
  }

  protected log_disconnection(): void {
    console.log("Disconnected from unauthenticated user " + this.id);
  }
}
