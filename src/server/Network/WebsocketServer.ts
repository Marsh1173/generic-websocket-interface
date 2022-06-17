import { PORT, ServerApp } from "./App";
const express = require("express");
import * as path from "path";
import { Application } from "express-ws";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import { AuthenticatorWebsocketHandler } from "./WebsocketHandlers/AuthenticatorWebsocketHandler";
import { WebSocket, Server } from "ws";
import { WebsocketClient } from "./WebsocketClient";
import { get_next_id } from "../../model/misc/GetNextId";

export class WebsocketServer {
  private server: http.Server | https.Server;
  private port: number = PORT;
  private url: string;
  private socket: Server;

  public readonly clientMap: Map<number, WebsocketClient>;

  constructor(
    private readonly server_app: ServerApp,
    private readonly app: Application,
    private readonly is_development: boolean
  ) {
    [this.server, this.port, this.url] = this.create_server();
    this.socket = new WebSocket.Server({ server: this.server });

    this.socket.on("connection", (ws) => {
      this.on_connect(ws);
    });
  }

  public start_websocket_listener() {
    this.server.listen(this.port, function () {
      console.log("Listening on " + this.url);
    });
  }

  private on_connect(ws: WebSocket) {
    let id: number = get_next_id();
    let new_websocket_client = new WebsocketClient(ws, this.server_app.get_auth_websocket_handler(), this, id);
    this.clientMap.set(id, new_websocket_client);
    console.log("Connected to " + id);
  }

  public on_client_close(id: number) {
    this.clientMap.delete(id);
    console.log("Disconnected from " + id);
  }

  public create_server(): [http.Server | https.Server, number, string] {
    let server: http.Server | https.Server;
    let url: string;
    let port: number = PORT;

    if (this.is_development) {
      server = this.create_local_server();
      url = "localhost:" + port.toString();
    } else {
      server = this.create_remote_server();
      url = "natehroylance.com:" + port.toString();
    }

    return [server, port, url];
  }

  private create_local_server(): http.Server {
    return http.createServer(this.app);
  }

  private create_remote_server(): https.Server {
    return https.createServer(
      {
        cert: fs.readFileSync("/etc/letsencrypt/live/server.natehroylance.com/cert.pem"),
        key: fs.readFileSync("/etc/letsencrypt/live/server.natehroylance.com/privkey.pem"),
      },
      this.app
    );
  }
}
