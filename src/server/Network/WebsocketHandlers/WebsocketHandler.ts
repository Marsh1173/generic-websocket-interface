import { ClientMessage } from "../../../model/Api/Api";
import { WebsocketClientObserver } from "../WebsocketClients/WebsocketClient";

export abstract class WebsocketHandler implements WebsocketClientObserver {
  constructor(public readonly id: number) {}
  public abstract receive_message: (msg: ClientMessage, client_id: number) => void;
  public abstract on_client_close: (id: number) => void;
}

export abstract class AuthenticatedWebsocketHandler extends WebsocketHandler {}
