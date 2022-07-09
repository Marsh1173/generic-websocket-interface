const express = require("express");
import * as path from "path";
import { Application } from "express-ws";
import { AuthenticatorWebsocketHandler } from "./WebsocketHandlers/AuthenticatorWebsocketHandler";
import { WebsocketServer } from "./WebsocketHandlers/WebsocketServer";
import { get_next_id } from "../../model/Misc/GetNextId";
import { LobbyWebsocketHandler } from "./WebsocketHandlers/LobbyWebsocketHandler";
import { GameWebsocketHandler } from "./WebsocketHandlers/GameWebsocketHandler";
import { SERVER_CONFIG } from "../Config";
import { BrowserWebsocketHandler } from "./WebsocketHandlers/BrowserWebsocketHandler";

export const PORT: number = 3000;
export const GAME_LOBBY_LIMIT: number = 10;
export const CLIENT_INACTIVITY_TIMEOUT_SECONDS: number = 120;

export interface ServerAppInterface {
  readonly websocket_server: WebsocketServer;
  readonly auth_handler: AuthenticatorWebsocketHandler;
  readonly browser_handler: BrowserWebsocketHandler;
  readonly lobby_handler: LobbyWebsocketHandler;
  readonly game_handler: GameWebsocketHandler;
}

export class ServerApp implements ServerAppInterface {
  private readonly app: Application;

  public readonly websocket_server: WebsocketServer;
  public readonly auth_handler: AuthenticatorWebsocketHandler;
  public readonly browser_handler: BrowserWebsocketHandler;
  public readonly lobby_handler: LobbyWebsocketHandler;
  public readonly game_handler: GameWebsocketHandler;

  private readonly is_development: boolean;

  constructor() {
    this.app = express();
  
    this.is_development = SERVER_CONFIG.is_development;
    
    this.websocket_server = new WebsocketServer(this, this.app, this.is_development);
    this.auth_handler = new AuthenticatorWebsocketHandler(get_next_id(), this);
    this.browser_handler = new BrowserWebsocketHandler(get_next_id(), this);
    this.lobby_handler = new LobbyWebsocketHandler(this);
    this.game_handler = new GameWebsocketHandler(this);
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
      response.send({ json_data: this.lobby_handler.get_lobbies_json() });
    });
  }
}
