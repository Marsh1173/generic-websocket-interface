import { ServerAuthenticationMsg } from "../../authentication/network/api/AuthenticationApi";
import { ServerAuthMenuMsg } from "../../authmenu/network/api/AuthMenuApi";

export class ServerMessageNotImplemented extends Error {
  constructor(server_msg: any) {
    console.log(JSON.stringify(server_msg));
    super("Server message not implemented yet.");
  }
}

export type ServerMessage = ServerAuthenticationMsg | ServerAuthMenuMsg;
