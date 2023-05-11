import { ServerApp } from "../application/ServerApp";
import {
  AuthenticatedUserTracker,
  IAuthenticatedUserTracker,
} from "./AuthenticatedUserTracker";
import { UserValidator, IUserValidator } from "./UserValidator";
import { UnauthenticatedUserMap } from "./user/UnauthenticatedUserMap";

export interface IAuthenticationService {
  readonly server_app: ServerApp;
  readonly unauthenticated_user_map: UnauthenticatedUserMap;
  readonly authenticated_user_tracker: IAuthenticatedUserTracker;
  readonly user_validator: IUserValidator;
}

export class AuthenticationService implements IAuthenticationService {
  public readonly unauthenticated_user_map: UnauthenticatedUserMap;
  public readonly authenticated_user_tracker: IAuthenticatedUserTracker;
  public readonly user_validator: IUserValidator;

  constructor(public readonly server_app: ServerApp) {
    this.unauthenticated_user_map = new UnauthenticatedUserMap(this);
    this.authenticated_user_tracker = new AuthenticatedUserTracker();
    this.user_validator = new UserValidator(this);
  }
}
