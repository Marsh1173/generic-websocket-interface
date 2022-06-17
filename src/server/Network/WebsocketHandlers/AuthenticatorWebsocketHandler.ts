import { ClientMessage } from "../../../model/api/Api";
import { WebsocketHandler } from "./WebsocketHandler";

export class AuthenticatorWebsocketHandler implements WebsocketHandler {
  private readonly pending_clients: Set<number> = new Set<number>();

  public receive_message(msg: ClientMessage) {
    console.log(msg);

    if (msg.type === "ClientAuthMessage") {
    } else {
      console.error("AuthWebsocketHandler received a message of type " + msg.type);
    }
  }
  public on_client_close(id: number) {}
}
