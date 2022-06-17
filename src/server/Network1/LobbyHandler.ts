import { LobbyListInformation } from "../../model/api/LobbyApi";
import { WEBSOCKET_LIMIT } from "./App";
import { LobbyWebsocketServer } from "./LobbyWebsocketServer";
import { WebsocketHandler } from "./WebsocketHandler";
import { get_next_id } from "../../model/misc/GetNextId";

export class LobbyHandler extends WebsocketHandler<LobbyWebsocketServer> {
  public get_lobbies_json(): string {
    let lobby_list: LobbyListInformation = { lobbies: [] };
    this.server_map.forEach((val, key) => {
      lobby_list.lobbies.push({
        id: val.id,
        name: val.name,
        player_count: val.client_map.size,
      });
    });
    let jsoned_lobbies = JSON.stringify(lobby_list);
    return jsoned_lobbies;
  }

  public async client_attempt_create_lobby(client_name: string, client_id: number) {
    if (this.server_map.size > WEBSOCKET_LIMIT) {
      return "Lobby traffic too high.";
    } else {
      let websocket_server: LobbyWebsocketServer = new LobbyWebsocketServer(
        client_name + "'s Game",
        get_next_id(),
        this.server_app
      );
      this.server_map.set(websocket_server.id, websocket_server);
      let server_start_promise: Promise<boolean> = websocket_server.start();
      server_start_promise.then((if_succeeded) => {
        console.log(if_succeeded ? "Success!" : "Could not listen"); //should be replaced
        return this.client_attempt_join_lobby(websocket_server.id, client_id);
      });
    }
  }

  public client_attempt_join_lobby(lobby_id: number, client_id: number): string {
    console.log("client " + client_id.toString() + " attempted to join lobby " + lobby_id.toString());
    return "test_val";
  }
}
