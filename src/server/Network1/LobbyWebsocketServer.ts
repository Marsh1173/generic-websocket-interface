import { ServerApp } from "./App";
import { LobbyClient } from "./LobbyClient";
import { WebsocketServer } from "./WebsocketServer";
import { WebSocket } from "ws";

export class LobbyWebsocketServer extends WebsocketServer<LobbyClient> {
  constructor(public readonly name: string, public readonly id: number, server_app: ServerApp) {
    super(server_app, "Lobby server " + id);
  }
  protected on_open_connection(ws: WebSocket): void {
    throw new Error("Method not implemented.");
  }
}
