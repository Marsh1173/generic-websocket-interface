import { ClientMessage } from "../../../model/api/Api";
import { LobbyInformation, LobbyPlayerInformation } from "../../../model/api/LobbyApi";
import { get_next_id } from "../../../model/misc/GetNextId";
import { ServerApp } from "../App";
import { WebsocketClient } from "../WebsocketClient";
import { AuthenticatedWebsocketHandler } from "./WebsocketHandler";

export class LobbyWebsocket extends AuthenticatedWebsocketHandler {
  private host_id: number = -1;
  private players: Map<number, LobbyPlayerInformation> = new Map<number, LobbyPlayerInformation>();
  private websocket_clients: Map<number, WebsocketClient> = new Map<number, WebsocketClient>();

  constructor(
    public readonly id: number,
    private readonly name: string,
    private readonly server_app: ServerApp,
    private readonly lobby_handler: LobbyWebsocketHandler
  ) {
    super(id);
  }

  public receive_message = (msg: ClientMessage, client_id: number) => {
    console.log(msg);

    if (msg.type === "ClientLobbyMessage") {
      if (msg.msg.type === "ClientLeaveLobby") {
        let ws: WebsocketClient | undefined = this.websocket_clients.get(client_id);
        let player_info: LobbyPlayerInformation | undefined = this.players.get(client_id);

        if (ws && player_info) {
          this.server_app.auth_handler.add_authenticated_client(ws, player_info.name);
          this.remove_player(client_id);
        }
      } else if (msg.msg.type === "ClientStartGame") {
        if (client_id === this.host_id) {
          console.log("Starting game " + this.id + "!");
        }
      }
    } else {
      console.error("LobbyWebsocketHandler received a message of type " + msg.type);
    }
  };

  public on_client_close = (id: number) => {
    this.remove_player(id);
  };

  public add_player(client: WebsocketClient, name: string) {
    this.players.set(client.get_id(), { id: client.get_id(), name });
    if (this.players.size === 1) {
      this.host_id = client.get_id();
    }
    this.update_players_lobby_information(client.get_id());
  }

  public remove_player(id: number) {
    this.players.delete(id);
    this.websocket_clients.delete(id);

    if (this.players.size === 0 || this.websocket_clients.size === 0) {
      this.delete_lobby();
      return;
    } else if (id === this.host_id) {
      for (let [id, player] of this.players.entries()) {
        this.host_id = id;
        break;
      }
    }

    this.update_players_lobby_information();
  }

  private delete_lobby(put_clients_in_auth_handler: boolean = false) {
    this.websocket_clients.forEach((ws, id) => {
      ws.remove_websocket_observer(this.id);
      if (put_clients_in_auth_handler) {
        let player_info: LobbyPlayerInformation | undefined = this.players.get(id);
        if (player_info) {
          this.server_app.auth_handler.add_authenticated_client(ws, player_info.name);
        }
      }
    });
    this.websocket_clients.clear();
    this.lobby_handler.remove_lobby(this.id);
  }

  private update_players_lobby_information(exclude_player: number = -1) {
    this.players.forEach((player) => {
      let ws: WebsocketClient | undefined = this.websocket_clients.get(player.id);
      if (player.id !== exclude_player && ws) {
        ws.send({
          type: "ServerLobbyMessage",
          msg: {
            type: "ServerUpdateClientLobbyInformation",
            lobby: this.get_lobby_information(),
          },
        });
      }
    });
  }

  public get_lobby_information(): LobbyInformation {
    let players: LobbyPlayerInformation[] = [];
    this.players.forEach((player) => {
      players.push(player);
    });
    return {
      id: this.id,
      name: this.name,
      host_id: this.host_id,
      players: players,
    };
  }
}

export class LobbyWebsocketHandler {
  private readonly lobby_websocket_map: Map<number, LobbyWebsocket> = new Map<number, LobbyWebsocket>();

  constructor(private readonly server_app: ServerApp) {}

  public add_new_lobby(name: string = "New Game"): LobbyWebsocket {
    let lobby_id: number = get_next_id();
    let new_lobby_websocket: LobbyWebsocket = new LobbyWebsocket(lobby_id, name, this.server_app, this);
    this.lobby_websocket_map.set(lobby_id, new_lobby_websocket);

    return new_lobby_websocket;
  }

  public remove_lobby(lobby_id: number) {
    this.lobby_websocket_map.delete(lobby_id);
  }

  public get_lobby_websocket(lobby_id: number): LobbyWebsocket | undefined {
    return this.lobby_websocket_map.get(lobby_id);
  }
}
