import WebSocket from "ws";
import { WebsocketServer } from "./WebsocketServer";

export abstract class WebsocketClient<ServerMessage, ClientMessage> {
  constructor(
    protected readonly ws: WebSocket,
    public readonly id: number,
    protected readonly websocket_server: WebsocketServer<WebsocketClient<ServerMessage, ClientMessage>>
  ) {
    ws.on("message", (msg: string) => {
      this.on_receive_message(JSON.parse(msg));
    });

    ws.onclose = () => this.on_close();

    this.reset_timeout_timer();
  }

  public send(data: ServerMessage) {
    this.ws.send(JSON.stringify(data));
  }

  protected abstract on_receive_message(msg: ClientMessage): void;
  protected on_close() {
    if (this.timeout_handle) clearTimeout(this.timeout_handle);
    this.websocket_server.on_close_connection(this.id);
  }

  protected readonly TIMEOUT_SECONDS: number = 120;
  protected timeout_handle: NodeJS.Timeout | undefined = undefined;
  protected reset_timeout_timer() {
    if (this.timeout_handle) clearTimeout(this.timeout_handle);
    this.timeout_handle = setTimeout(() => {
      console.warn("Timed out after " + this.TIMEOUT_SECONDS.toString() + " seconds: " + this.id.toString());
      this.ws.close();
      this.timeout_handle = undefined;
    }, this.TIMEOUT_SECONDS * 1000);
  }
}
