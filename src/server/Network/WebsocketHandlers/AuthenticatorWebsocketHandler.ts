import { ClientMessage } from "../../../model/api/Api";
import { ClientAuthMessage, ClientCreateLobby, ClientJoinLobby } from "../../../model/api/AuthApi";
import { ServerApp } from "../App";
import { WebsocketClient } from "../WebsocketClient";
import { LobbyWebsocket } from "./LobbyWebsocketHandler";
import { WebsocketHandler } from "./WebsocketHandler";

export class AuthenticatorWebsocketHandler extends WebsocketHandler {
  private readonly pending_clients: Set<number> = new Set<number>();
  private readonly authenticated_clients: Map<number, string> = new Map<number, string>();

  constructor(public readonly id: number, private readonly server_app: ServerApp) {
    super(id);
  }

  public receive_message = (msg: ClientMessage, client_id: number) => {
    console.log(msg);

    if (msg.type === "ClientAuthMessage") {
      if (this.pending_clients.has(client_id)) {
        this.pending_clients.delete(client_id);
        this.authenticated_clients.set(client_id, msg.msg.name);
      }
    } else if (msg.type === "ClientBrowserMessage") {
      if (msg.msg.type === "ClientCreateLobby") {
        this.client_create_lobby(msg.msg, client_id);
      } else if (msg.msg.type === "ClientJoinLobby") {
        this.client_attempt_join_lobby(msg.msg, client_id);
      }
    } else {
      console.error("AuthWebsocketHandler received a message of type " + msg.type);
    }
  };

  public on_client_close = (id: number) => {
    this.pending_clients.delete(id);
    this.authenticated_clients.delete(id);
  };

  public add_authenticated_client(client: WebsocketClient, name: string) {
    this.authenticated_clients.set(client.get_id(), name);
    client.add_websocket_observer(this);
  }

  private client_create_lobby(msg: ClientCreateLobby, client_id: number) {
    let client_name: string | undefined = this.authenticated_clients.get(client_id);
    if (client_name) {
      let lobby: LobbyWebsocket = this.server_app.lobby_handler.add_new_lobby(client_name + "'s Game");
      this.client_attempt_join_lobby({ type: "ClientJoinLobby", lobby_id: lobby.id }, client_id);
    }
  }

  private client_attempt_join_lobby(msg: ClientJoinLobby, client_id: number) {
    let lobby_websocket: LobbyWebsocket | undefined = this.server_app.lobby_handler.get_lobby_websocket(msg.lobby_id);
    let client: WebsocketClient | undefined = this.server_app.websocket_server.client_map.get(client_id);
    let client_name: string | undefined = this.authenticated_clients.get(client_id);

    if (lobby_websocket && client && client_name) {
      client.remove_websocket_observer(this.id);
      this.authenticated_clients.delete(client_id);

      client.add_websocket_observer(lobby_websocket);
      lobby_websocket.add_player(client, client_name);

      client.send({
        type: "ServerBrowserMessage",
        msg: {
          type: "ServerAddClientToLobby",
          lobby: lobby_websocket.get_lobby_information(),
        },
      });
    }
  }
}
