import WebSocket from "ws";
import { ClientLobbyMessage, LobbyPlayerInformation, ServerLobbyMessage } from "../../model/api/LobbyApi";
import { LobbyWebsocketServer } from "./LobbyWebsocketServer";
import { WebsocketClient } from "./WebsocketClient";

export class LobbyClient extends WebsocketClient<ServerLobbyMessage, ClientLobbyMessage> {
  constructor(
    public readonly player_info: LobbyPlayerInformation,
    ws: WebSocket,
    websocket_server: LobbyWebsocketServer
  ) {
    super(ws, player_info.id, websocket_server);
  }
  protected on_receive_message(msg: ClientLobbyMessage): void {
    throw new Error("Method not implemented.");
  }
}
