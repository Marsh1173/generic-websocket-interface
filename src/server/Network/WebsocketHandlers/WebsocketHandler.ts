import { ClientMessage } from "../../../model/api/Api";
import { WebsocketClientHandler } from "../WebsocketClient";

export abstract class WebsocketHandler implements WebsocketClientHandler {
  public abstract receive_message: (msg: ClientMessage) => void;
  public abstract on_client_close: (id: number) => void;
}

export abstract class AuthenticatedWebsocketHandler extends WebsocketHandler {
  public abstract receive_message: (msg: ClientMessage) => void;
  public abstract on_client_close: (id: number) => void;
}
