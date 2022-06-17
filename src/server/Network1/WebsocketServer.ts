import { ServerApp } from "./App";
import { WebsocketClient } from "./WebsocketClient";
import * as https from "https";
import * as http from "http";
import { WebSocket, Server } from "ws";
import { get_next_id } from "../../model/misc/GetNextId";

export abstract class WebsocketServer<Client extends WebsocketClient<any, any>> {
  public readonly client_map: Map<number, Client> = new Map<number, Client>();

  public readonly port: number;
  public readonly url: string;
  protected readonly server: http.Server | https.Server;
  private readonly socket: Server;

  constructor(protected readonly server_app: ServerApp, protected server_name: string) {
    [this.server, this.port, this.url] = server_app.create_server();
    this.socket = new WebSocket.Server({ server: this.server });

    this.socket.on("connection", (ws) => {
      this.on_open_connection(ws);
    });
  }

  public async start(): Promise<boolean> {
    await this.server.listen(this.port, () => {
      console.log(this.server_name + " is listening on " + this.url);
    });
    return this.server.listening;
  }

  protected abstract on_open_connection(ws: WebSocket): void;
  public on_close_connection(id: number) {
    this.client_map.delete(id);
    console.log(this.server_name + " diconnected from client " + id);
  }
}
