import { ServerApp } from "./App";
import { LobbyClient } from "./LobbyClient";
import { WebsocketServer } from "./WebsocketServer";
import { WebSocket } from "ws";

export class GameWebsocketServer extends WebsocketServer<LobbyClient> {
  constructor(public readonly id: number, server_app: ServerApp) {
    super(server_app, "Game server " + id);
  }
  protected on_open_connection(ws: WebSocket): void {
    throw new Error("Method not implemented.");
  }
}
