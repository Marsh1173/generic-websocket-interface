const express = require("express");
import { Application } from "express-ws";
import { WebsocketListener } from "../network/WebsocketListener";
import { IServerListener, ServerListener } from "../network/ServerListener";
import {
  AuthenticationService,
  IAuthenticationService,
} from "../authentication/AuthenticationService";
import { UserDao } from "../database/users/UserDao";
import { DB } from "../database/utils/DB";
import { IAuthMenuService, AuthMenuService } from "../authmenu/AuthMenuService";

export class ServerApp {
  private readonly server_listener: IServerListener;
  public readonly websocket_listener: WebsocketListener;
  private readonly app: Application;

  public readonly authentication_service: IAuthenticationService;
  public readonly auth_menu_service: IAuthMenuService;

  public readonly user_dao: UserDao;

  constructor() {
    //database
    let db = DB.init();
    this.user_dao = new UserDao(db);

    //network listeners
    this.app = express();
    this.websocket_listener = new WebsocketListener(this, this.app);
    this.server_listener = new ServerListener(this.app, this);
    this.server_listener.start_server_listener();

    //services
    this.authentication_service = new AuthenticationService(this);
    this.auth_menu_service = new AuthMenuService(this);
  }
}
