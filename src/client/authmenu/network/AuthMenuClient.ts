import { ServerMessageNotImplemented } from "../../network/api/ClientApi";
import { IServerTalker } from "../../network/ServerTalker";
import { Client } from "../../network/Client";
import { ServerAuthMenuMsg } from "./api/AuthMenuApi";
import { UserAuthMenuMsg } from "../../../server/authmenu/api/AuthMenuApi";

export class AuthMenuClient extends Client<UserAuthMenuMsg, ServerAuthMenuMsg> {
  constructor(server_talker: IServerTalker) {
    super(server_talker);
  }

  public receive_message(msg: ServerAuthMenuMsg): void {
    throw new ServerMessageNotImplemented(msg);
  }
}
