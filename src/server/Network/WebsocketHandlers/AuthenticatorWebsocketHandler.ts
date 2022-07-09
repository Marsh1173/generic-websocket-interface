import { ClientMessage } from "../../../model/Api/Api";
import { AuthFailure, AuthSuccess, UserDBAccessor } from "../../Database/UserDBAccessor";
import { UserModel } from "../../Database/UserModel";
import { ServerAppInterface } from "../App";
import { AuthWebsocketClient, AuthWebsocketClientInterface } from "../WebsocketClients/AuthWebsocketClient";
import { UnauthenticatedWebsocketClientInterface } from "../WebsocketClients/UnauthenticatedWebsocketClient";
import { WebsocketHandler } from "./WebsocketHandler";

export class AuthenticatorWebsocketHandler extends WebsocketHandler {
  private readonly pending_clients: Map<number, UnauthenticatedWebsocketClientInterface> = new Map<number, UnauthenticatedWebsocketClientInterface>();

  constructor(public readonly id: number, private readonly server_app: ServerAppInterface) {
    super(id);
  }

  public receive_message = (msg: ClientMessage, client_id: number) => {

    let websocket_client: UnauthenticatedWebsocketClientInterface | undefined = this.pending_clients.get(client_id);
    if (msg.type && msg.msg.type && msg.type === "ClientAuthMessage" && websocket_client) {
        
      if(msg.msg.type === "ClientLoginMessage") {
        let authenticate_results: AuthSuccess | AuthFailure = this.on_client_attempt_authenticate(msg.msg.name, msg.msg.password);
        if(authenticate_results.success) {
          this.client_authenticate(client_id, authenticate_results, websocket_client);
          websocket_client.send({
            type: "ServerAuthMessage",
            msg: {
              type: "ServerSuccessfulLogin",
              user_data: authenticate_results.user,
              msg: authenticate_results.msg
            }
          });
        } else {
          websocket_client.send({
            type: "ServerAuthMessage",
            msg: {
              type: "ServerBadLogin",
              msg: authenticate_results.msg
            }
          })
        }

      } else if (msg.msg.type === "ClientRegisterMessage") {
        let register_results : AuthSuccess | AuthFailure = this.on_client_attempt_register(msg.msg.name, msg.msg.password);
        if(register_results.success) {
          this.client_authenticate(client_id, register_results, websocket_client);
          websocket_client.send({
            type: "ServerAuthMessage",
            msg: {
              type: "ServerSuccessfulLogin",
              user_data: register_results.user,
              msg: register_results.msg
            }
          });
        } else {
          websocket_client.send({
            type: "ServerAuthMessage",
            msg: {
              type: "ServerBadLogin",
              msg: register_results.msg
            }
          })
        }
      }

    } else if (msg.type && msg.type !== "ClientAuthMessage") {
      console.error("AuthWebsocketHandler received a message of type " + msg.type);
    }
  };

  public on_client_close = (id: number) => {
    this.pending_clients.delete(id);
  };

  private on_client_attempt_authenticate(name: string, password: string): AuthSuccess | AuthFailure {
    let db_accessor: UserDBAccessor = new UserDBAccessor();
    return db_accessor.validate_user(name, password)
  }

  private on_client_attempt_register(name: string, password: string): AuthSuccess | AuthFailure {
    let db_accessor: UserDBAccessor = new UserDBAccessor();
    let id: number = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    let user_data: UserModel = {
      name, encoded_password: password, user_id: id
    }
    return db_accessor.register_user(user_data)
  }

  private client_authenticate(pending_id: number, authenticate_results: AuthSuccess, websocket_client: UnauthenticatedWebsocketClientInterface) {
    let authenticated_client: AuthWebsocketClientInterface = new AuthWebsocketClient(authenticate_results.user, websocket_client.get_websocket(), this.server_app.websocket_server);
    this.server_app.browser_handler.add_authenticated_client(authenticated_client);
    
    websocket_client.remove_websocket_observer(this.id);
    this.pending_clients.delete(pending_id);
  }
}
