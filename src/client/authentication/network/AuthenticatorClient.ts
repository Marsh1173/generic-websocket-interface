import { UserData } from "../../../model/user/UserData";
import { ServerMessageNotImplemented } from "../../network/api/ClientApi";
import { IServerTalker } from "../../network/ServerTalker";
import { Client } from "../../network/Client";
import { AuthenticationView } from "../AuthenticationView";
import { ServerAuthenticationMsg } from "./api/AuthenticationApi";
import { UserAuthenticationMsg } from "../../../server/authentication/api/AuthenticationApi";
import { UserAttemptLoginMsg } from "../../../server/authentication/api/AttemptLogin";
import { FailureMsg } from "../../network/api/Failure";
import { GrowlService } from "../../growl/GrowlService";
import { UserAttemptRegisterMsg } from "../../../server/authentication/api/AttemptRegister";

export class AuthenticatorClient extends Client<UserAuthenticationMsg, ServerAuthenticationMsg> {
  constructor(server_talker: IServerTalker, private readonly view: AuthenticationView) {
    super(server_talker);
  }

  public receive_message(msg: ServerAuthenticationMsg): void {
    switch (msg.type) {
      case "SuccessfulAuthenticationMsg":
        this.on_successful_authentication(msg.user_data);
        break;
      case "FailureMsg":
        this.view.set_submitted(false);
        this.handle_failed_authentication(msg);
        break;
      default:
        throw new ServerMessageNotImplemented(msg);
    }
  }

  private on_successful_authentication(user_data: UserData) {
    this.view.on_successful_authentication(user_data);
  }

  public send_login(user_id: string, password: string) {
    this.send(new UserAttemptLoginMsg(user_id, password));
  }

  public send_register(user_id: string, password: string, email: string) {
    this.send(new UserAttemptRegisterMsg(user_id, password, email));
  }

  private handle_failed_authentication(msg: FailureMsg) {
    new GrowlService().put_growl(msg.msg, "bad");
  }
}
