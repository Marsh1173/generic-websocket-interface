import { PORT, ServerApp } from "../App";
const express = require("express");
import { Application } from "express-ws";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import { WebSocket, Server } from "ws";
import { get_next_id } from "../../../model/Misc/GetNextId";
import { UnauthenticatedWebsocketClient } from "../WebsocketClients/UnauthenticatedWebsocketClient";

export class WebsocketServer {
  private server: http.Server | https.Server;
  private port: number = PORT;
  private url: string;
  private socket: Server;

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
    this.server.listen(this.port, () => {
      console.log("Listening on " + this.url);
    });
  }

  private on_connect(ws: WebSocket) {
    let id: number = get_next_id();
    let new_websocket_client = new UnauthenticatedWebsocketClient(ws, this, id);
    new_websocket_client.add_websocket_observer(this.server_app.auth_handler);
    console.log("Connected to " + id);
  }

  public log_client_close(msg: string) {
    console.log("Disconnected from " + msg);
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
