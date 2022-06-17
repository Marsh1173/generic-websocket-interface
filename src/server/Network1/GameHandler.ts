import { WEBSOCKET_LIMIT } from "./App";
import { GameWebsocketServer } from "./GameWebsocketServer";
import { WebsocketHandler } from "./WebsocketHandler";

export class GameHandler extends WebsocketHandler<GameWebsocketServer> {
  // public client_attempt_start_game(request, response) {
  //   if (this.server_map.size > WEBSOCKET_LIMIT) {
  //     response.send({ error: "Game traffic too high." });
  //   } else {
  //     response.send({ json_data: "test_val" });
  //   }
  // }
}
