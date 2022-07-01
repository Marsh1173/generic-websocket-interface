import { ClientMessage } from "../../../model/api/Api";
import { LobbyInformation, LobbyPlayerInformation } from "../../../model/api/LobbyApi";
import { get_next_id } from "../../../model/misc/GetNextId";
import { ServerApp } from "../App";
import { WebsocketClient } from "../WebsocketClient";
import { AuthenticatedWebsocketHandler } from "./WebsocketHandler";

export class LobbyWebsocket extends AuthenticatedWebsocketHandler {
  private host_id: number = -1;
  private players: Map<number, {player_info: LobbyPlayerInformation, ws: WebsocketClient}> = new Map<number, {player_info: LobbyPlayerInformation, ws: WebsocketClient}>();

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
        let player: {player_info: LobbyPlayerInformation, ws: WebsocketClient} | undefined = this.players.get(client_id);

        if (player) {
          this.server_app.auth_handler.add_authenticated_client(player.ws, player.player_info.name);
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
    this.players.set(client.get_id(), { ws: client, player_info: {id: client.get_id(), name} });
    if (this.players.size === 1) {
      this.host_id = client.get_id();
    }
    this.update_players_lobby_information(client.get_id());
  }

  public remove_player(id: number) {
    this.players.delete(id);

    if (this.players.size === 0) {
      this.lobby_handler.remove_lobby(this.id)
      return;
    } else if (id === this.host_id) {
      for (let [id, player] of this.players.entries()) {
        this.host_id = id;
        break;
      }
    }

    this.update_players_lobby_information();
  }

  public clear_lobby(put_clients_in_auth_handler: boolean = false) {
    this.players.forEach((player, id) => {
      player.ws.remove_websocket_observer(this.id);
      if (put_clients_in_auth_handler) {
        this.server_app.auth_handler.add_authenticated_client(player.ws, player.player_info.name);
      }
    });
  }

  private update_players_lobby_information(exclude_player?: number) {
    this.players.forEach((player) => {
      if (!exclude_player || player.player_info.id !== exclude_player) {
        player.ws.send({
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
      players.push(player.player_info);
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
    let lobby: LobbyWebsocket | undefined = this.lobby_websocket_map.get(lobby_id);
    if(lobby) {
      this.lobby_websocket_map.delete(lobby_id);
      lobby.clear_lobby(true);
    }
      
  }

  public get_lobby_websocket(lobby_id: number): LobbyWebsocket | undefined {
    return this.lobby_websocket_map.get(lobby_id);
  }

  public get_lobbies_json(): string {
    let lobby_array: LobbyInformation[] = [];
    this.lobby_websocket_map.forEach((lobby) => {
      lobby_array.push(lobby.get_lobby_information())
    });
    return JSON.stringify(lobby_array);
  }
}
