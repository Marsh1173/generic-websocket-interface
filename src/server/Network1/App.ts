const express = require("express");
import * as path from "path";
import { Application } from "express-ws";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import { GameHandler } from "./GameHandler";
import { LobbyHandler } from "./LobbyHandler";
import { AuthWebsocketServer } from "./AuthWebsocketServer";

const LOWEST_PORT: number = 3000;
export const WEBSOCKET_LIMIT: number = 10;

export class ServerApp {
  private readonly app: Application;

  private readonly auth_server: AuthWebsocketServer;
  private readonly lobby_handler: LobbyHandler;
  private readonly game_handler: GameHandler;

  constructor(private readonly is_development: boolean = false) {
    this.app = express();

    this.lobby_handler = new LobbyHandler(this);
    this.game_handler = new GameHandler(this);
    this.auth_server = new AuthWebsocketServer(this);
  }

  public init() {
    let auth_server_start_promise: Promise<boolean> = this.auth_server.start();
    auth_server_start_promise.then(() => {
      this.start_get_bundle_api_listener();
      this.start_get_lobbies_api_listener();
      this.start_create_lobby_api_listener();
      this.start_join_lobby_api_listener();
    });
  }

  private start_get_bundle_api_listener() {
    this.app.use(express.static(path.join(__dirname, "../../../public")));
    this.app.get("/bundle.js", (request, response) => {
      response.sendFile(path.join(__dirname, "../../../dist/client/bundle.js"));
    });
  }

  private start_get_lobbies_api_listener() {
    this.app.get("/lobbies", (request, response) => {
      response.send({ json_data: this.lobby_handler.get_lobbies_json() });
    });
  }

  private start_create_lobby_api_listener() {
    this.app.get("/start-lobby", (request, response) => {
      console.log(request);
      response.send({ json_data: "creating lobby" });
    });
  }

  private start_join_lobby_api_listener() {
    this.app.get("/join-lobby", (request, response) => {
      response.send({ json_data: this.lobby_handler.client_attempt_join_lobby(0, 1) });
    });
  }

  public create_server(): [http.Server | https.Server, number, string] {
    let server: http.Server | https.Server;
    let url: string;
    let port: number = this.get_next_unused_port();

    if (this.is_development) {
      server = this.create_local_server();
      url = "localhost:" + port.toString();
    } else {
      server = this.create_remote_server();
      url = "server.natehroylance.com:" + port.toString();
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

  private get_next_unused_port(): number {
    let port: number = LOWEST_PORT;
    while (true) {
      if (!this.game_handler.if_port_in_use(port) && !this.lobby_handler.if_port_in_use(port)) {
        return port;
      }
      port++;
    }
  }
}
