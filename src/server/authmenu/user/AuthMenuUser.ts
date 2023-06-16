import { UserData, UserId } from "../../../model/user/UserData";
import { JsonParser } from "../../network/jsonvalidation/JsonParser";
import { IClientTalker } from "../../network/user/ClientTalker";
import { User } from "../../network/user/User";
import { UserMessageNotImplemented } from "../../network/utils/errors";
import { IAuthMenuService } from "../AuthMenuService";
import { UserAuthMenuMsg, UserAuthMenuMsgParser } from "../api/AuthMenuApi";
import { AuthMenuUserMap } from "./AuthMenuUserMap";
import { ServerAuthMenuMsg } from "../../../client/authmenu/network/api/AuthMenuApi";

export class AuthMenuUser extends User<UserAuthMenuMsg, ServerAuthMenuMsg> {
  protected readonly json_parser: JsonParser<never> = UserAuthMenuMsgParser;

  constructor(
    private readonly auth_user_service: IAuthMenuService,
    client_talker: IClientTalker,
    auth_menu_user_map: AuthMenuUserMap,
    public readonly user_data: UserData
  ) {
    super(client_talker, auth_menu_user_map);
  }

  public process_message(msg: UserAuthMenuMsg): void {
    throw new UserMessageNotImplemented(msg);
    // switch (msg) {
    //   default:
    // }
  }

  public on_client_talker_close(id: UserId): void {
    super.on_client_talker_close(id);
    this.auth_user_service.server_app.authentication_service.authenticated_user_tracker.disconnect_authenticated_user(
      this.user_data.user_id
    );
  }

  protected log_disconnection(): void {
    console.log("Disconnected from authmenu user " + this.user_data.user_id);
  }
}
