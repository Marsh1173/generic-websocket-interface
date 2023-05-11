import { ServerApp } from "../application/ServerApp";
import { AuthMenuUserMap } from "./user/AuthMenuUserMap";

export interface IAuthMenuService {
  readonly server_app: ServerApp;
  readonly auth_menu_user_map: AuthMenuUserMap;
}

export class AuthMenuService implements IAuthMenuService {
  public readonly auth_menu_user_map: AuthMenuUserMap;

  constructor(public readonly server_app: ServerApp) {
    this.auth_menu_user_map = new AuthMenuUserMap(this);
  }
}
