import { ClientMessage } from "../../../model/Api/Api";
import { ClientCreateLobby } from "../../../model/Api/BrowserApi";
import { ServerAppInterface } from "../App";
import { AuthWebsocketClientInterface } from "../WebsocketClients/AuthWebsocketClient";
import { LobbyWebsocket } from "./LobbyWebsocketHandler";
import { WebsocketHandler } from "./WebsocketHandler";

export class BrowserWebsocketHandler extends WebsocketHandler {
  private readonly clients: Map<number, AuthWebsocketClientInterface> = new Map<number, AuthWebsocketClientInterface>();

  constructor(public readonly id: number, private readonly server_app: ServerAppInterface) {
    super(id);
  }

  public receive_message = (msg: ClientMessage, client_id: number) => {

    let client: AuthWebsocketClientInterface | undefined = this.clients.get(client_id);

    if (msg.type && msg.msg.type && msg.type === "ClientBrowserMessage" && client) {
      if (msg.msg.type === "ClientCreateLobby") {
        this.client_create_lobby(msg.msg, client);
      } else if (msg.msg.type === "ClientJoinLobby") {
        this.client_attempt_join_lobby(msg.msg.lobby_id, client);
      }
    } else if (msg.type && msg.type !== "ClientBrowserMessage") {
      console.error("BrowserWebsocketHandler received a message of type " + msg.type);
    }
  };

  public on_client_close = (id: number) => {
    this.clients.delete(id);
  };

  public add_authenticated_client(client: AuthWebsocketClientInterface) {
    this.clients.set(client.get_id(), client);
    client.add_websocket_observer(this);
  }

  private client_create_lobby(msg: ClientCreateLobby, client: AuthWebsocketClientInterface) {
    let lobby: LobbyWebsocket = this.server_app.lobby_handler.add_new_lobby(client.get_name() + "'s Game");
    this.client_attempt_join_lobby(lobby.id, client);
  }

  private client_attempt_join_lobby(lobby_id: number, client: AuthWebsocketClientInterface) {
    let lobby_websocket: LobbyWebsocket | undefined = this.server_app.lobby_handler.get_lobby(lobby_id);

    if (lobby_websocket) {
      client.remove_websocket_observer(this.id);
      this.clients.delete(client.get_id());

      let if_can_add_player_results: string | undefined = lobby_websocket.if_can_add_player(client);
      if(if_can_add_player_results) {
        client.send({
          type: "ServerBrowserMessage",
          msg: {
            type: "ServerErrorAddClientToLobby",
            msg: if_can_add_player_results,
          },
        });
      } else {
        
        lobby_websocket.add_player(client);
  
        client.send({
          type: "ServerBrowserMessage",
          msg: {
            type: "ServerAddClientToLobby",
            lobby: lobby_websocket.get_lobby_information(),
          },
        });
      }
    } else {
        client.send({
          type: "ServerBrowserMessage",
          msg: {
            type: "ServerErrorAddClientToLobby",
            msg: "Lobby does not exist.",
          },
        });
    }
  }
}
