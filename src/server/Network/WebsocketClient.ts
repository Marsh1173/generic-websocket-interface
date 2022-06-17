import WebSocket from "ws";
import { ClientMessage, ServerMessage } from "../../model/api/Api";
import { WebsocketServer } from "./WebsocketServer";

export interface WebsocketClientHandler {
  receive_message: (msg: ClientMessage) => void;
  on_client_close: (id: number) => void;
}

export class WebsocketClient {
  constructor(
    private readonly ws: WebSocket,
    private websocket_handler: WebsocketClientHandler,
    private websocket_server: WebsocketServer,
    private readonly id: number
  ) {
    ws.on("message", (msg: string) => {
      this.reset_timeout_timer();
      this.on_receive_message(JSON.parse(msg));
    });

    ws.onclose = () => this.on_close();
    this.reset_timeout_timer();
  }

  public send(data: ServerMessage) {
    this.ws.send(JSON.stringify(data));
  }

  private on_receive_message(msg: ClientMessage) {
    this.websocket_handler.receive_message(msg);
  }

  private on_close() {
    if (this.timeout_handle) clearTimeout(this.timeout_handle);
    this.websocket_handler.on_client_close(this.id);
    this.websocket_server.on_client_close(this.id);
  }

  private readonly TIMEOUT_SECONDS: number = 120;
  private timeout_handle: NodeJS.Timeout | undefined = undefined;
  private reset_timeout_timer() {
    if (this.timeout_handle) clearTimeout(this.timeout_handle);
    this.timeout_handle = setTimeout(() => {
      console.warn("Timed out after " + this.TIMEOUT_SECONDS.toString() + " seconds: " + this.id.toString());
      this.ws.close();
      this.timeout_handle = undefined;
    }, this.TIMEOUT_SECONDS * 1000);
  }

  public get_id(): number {
    return this.id;
  }

  public set_websocket_handler(new_handler: WebsocketClientHandler) {
    this.websocket_handler = new_handler;
  }
}
