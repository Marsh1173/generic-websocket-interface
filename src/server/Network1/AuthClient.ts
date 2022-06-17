import WebSocket from "ws";
import { ServerAuthMessage, ClientAuthMessage } from "../../model/api/AuthApi";
import { ClientLobbyMessage, LobbyPlayerInformation, ServerLobbyMessage } from "../../model/api/LobbyApi";
import { AuthWebsocketServer } from "./AuthWebsocketServer";
import { WebsocketClient } from "./WebsocketClient";

export class AuthClient extends WebsocketClient<ServerAuthMessage, ClientAuthMessage> {
  constructor(id: number, ws: WebSocket, websocket_server: AuthWebsocketServer) {
    super(ws, id, websocket_server);
  }
  protected on_receive_message(msg: ClientAuthMessage): void {
    throw new Error("Method not implemented.");
  }
}
