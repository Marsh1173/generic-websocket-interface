import { WebSocket } from "ws";
import { get_next_id } from "../../model/misc/GetNextId";
import { ServerApp } from "./App";
import { AuthClient } from "./AuthClient";
import { WebsocketServer } from "./WebsocketServer";

export interface AuthenticatedClientInformation {
  name: string;
  id: number;
}

export class AuthWebsocketServer extends WebsocketServer<AuthClient> {
  protected server_name: string = "Auth server";

  constructor(server_app: ServerApp) {
    super(server_app, "Auth server");
  }

  protected on_open_connection(ws: WebSocket): void {
    let id: number = get_next_id();
    let auth_client: AuthClient = new AuthClient(id, ws, this);
    this.client_map.set(id, auth_client);

    auth_client.send({ type: "ServerAuthHandshakeInformation", id });

    console.log(this.server_name + " connected to client " + id);
  }
}
