const express = require("express");
import * as path from "path";
import { Application } from "express-ws";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import { AuthenticatorWebsocketHandler } from "./WebsocketHandlers/AuthenticatorWebsocketHandler";
import { WebSocket, Server } from "ws";
import { WebsocketServer } from "./WebsocketServer";

export const PORT: number = 3000;
export const GAME_LOBBY_LIMIT: number = 10;
export const CLIENT_INACTIVITY_TIMEOUT_SECONDS: number = 120;

export class ServerApp {
  private readonly app: Application;

  private readonly websocket_server: WebsocketServer;
  private readonly auth_handler: AuthenticatorWebsocketHandler;
  // private readonly lobby_handler: LobbyHandler;
  // private readonly game_handler: GameHandler;

  constructor(private readonly is_development: boolean = false) {
    this.app = express();

    // this.lobby_handler = new LobbyHandler(this);
    // this.game_handler = new GameHandler(this);

    this.auth_handler = new AuthenticatorWebsocketHandler();
    this.websocket_server = new WebsocketServer(this, this.app, this.is_development);
  }

  public init() {
    this.start_get_bundle_api_listener();
    this.start_get_lobbies_api_listener();
    this.websocket_server.start_websocket_listener();
  }

  private start_get_bundle_api_listener() {
    this.app.use(express.static(path.join(__dirname, "../../../public")));
    this.app.get("/bundle.js", (request, response) => {
      response.sendFile(path.join(__dirname, "../../../dist/client/bundle.js"));
    });
  }

  private start_get_lobbies_api_listener() {
    this.app.get("/lobbies", (request, response) => {
      // response.send({ json_data: this.lobby_handler.get_lobbies_json() });
    });
  }

  public get_auth_websocket_handler(): AuthenticatorWebsocketHandler {
    return this.auth_handler;
  }
}
