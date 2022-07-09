import { ClientMessage } from "../../../model/Api/Api";
import { LobbyInformation, LobbyPlayerInformation } from "../../../model/Api/LobbyApi";
import { get_next_id } from "../../../model/Misc/GetNextId";
import { ServerAppInterface } from "../App";
import { AuthWebsocketClientInterface } from "../WebsocketClients/AuthWebsocketClient";
import { AuthenticatedWebsocketHandler } from "./WebsocketHandler";

export class LobbyWebsocket extends AuthenticatedWebsocketHandler {
  private host_id: number = -1;
  private clients: Map<number, AuthWebsocketClientInterface> = new Map<number, AuthWebsocketClientInterface>();

  constructor(
    public readonly id: number,
    private readonly name: string,
    private readonly server_app: ServerAppInterface,
    private readonly lobby_handler: LobbyWebsocketHandler
  ) {
    super(id);
  }

  public receive_message = (msg: ClientMessage, client_id: number) => {

    if (msg.type && msg.msg.type && msg.type === "ClientLobbyMessage") {
      let player:  AuthWebsocketClientInterface | undefined = this.clients.get(client_id);
      if (player) {
        if (msg.msg.type === "ClientLeaveLobby") {
          this.move_client_to_browser(player);
          
        } else if (msg.msg.type === "ClientStartGame") {
          let start_errors: string | undefined = this.attempt_start_game(player);
          if(start_errors) {
            player.send({
              type: "ServerLobbyMessage",
              msg: {
                type: "ServerLobbyError",
                msg: start_errors
              }
            })
          } else {
            this.start_game();
          }
        }
      }
    } else if (msg.type) {
      console.error("LobbyWebsocketHandler received a message of type " + msg.type);
    }
  };

  public on_client_close = (id: number) => {
    this.remove_player(id);
  };

  public add_player(client: AuthWebsocketClientInterface) {

    client.add_websocket_observer(this);
    this.clients.set(client.get_id(), client);
    if (this.clients.size === 1) {
      this.host_id = client.get_id();
    }

    this.update_players_lobby_information(client.get_id());

  }

  private move_client_to_browser(client: AuthWebsocketClientInterface) {
    client.remove_websocket_observer(this.id);
    this.server_app.browser_handler.add_authenticated_client(client);
    
    client.send({
      type: "ServerLobbyMessage",
      msg: {
        type: "ServerMoveClientToBrowser"
      }
    })

    this.remove_player(client.get_id())
  }

  private remove_player(id: number) {
    this.clients.delete(id);

    if (this.clients.size === 0) {
      this.lobby_handler.remove_lobby(this.id)
      return;
    }
    
    if (id === this.host_id) {
      for (let [id, player] of this.clients.entries()) {
        this.host_id = id;
        break;
      }
    }

    this.update_players_lobby_information();
  }

  public move_clients_to_browser() {
    this.clients.forEach((player) => {
      this.move_client_to_browser(player)
    });
    this.clients.clear();
  }

  private update_players_lobby_information(exclude_player?: number) {
    this.clients.forEach((player) => {
      if (!exclude_player || player.get_id() !== exclude_player) {
        player.send({
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
    this.clients.forEach((client) => {
      players.push({
        name: client.get_name(),
        id: client.get_id()
      });
    });
    return {
      id: this.id,
      name: this.name,
      host_id: this.host_id,
      players: players,
    };
  }

  private attempt_start_game(player:  AuthWebsocketClientInterface): string | undefined {

    if (player.get_id() !== this.host_id) {
      return "You must be the host to start the game.";
    }

    return undefined;
  }

  private start_game() {
    console.log("Starting game " + this.id + "!");
  }
}

export class LobbyWebsocketHandler {
  private readonly lobby_websocket_map: Map<number, LobbyWebsocket> = new Map<number, LobbyWebsocket>();

  constructor(private readonly server_app: ServerAppInterface) {}

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
      lobby.move_clients_to_browser();
    }
  }

  public get_lobby(lobby_id: number): LobbyWebsocket | undefined {
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
