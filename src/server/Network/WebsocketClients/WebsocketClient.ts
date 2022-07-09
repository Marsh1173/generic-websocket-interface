import WebSocket from "ws";
import { ClientMessage, ServerMessage } from "../../../model/Api/Api";
import { WebsocketServer } from "../WebsocketHandlers/WebsocketServer";

export interface WebsocketClientObserver {
  id: number;
  receive_message: (msg: ClientMessage, client_id: number) => void;
  on_client_close: (id: number) => void;
}

export interface WebsocketClientInterface {
  send: (data: ServerMessage) => void;
  get_id: () => number;
  add_websocket_observer: (new_observer: WebsocketClientObserver) => void;
  remove_websocket_observer: (id: number) => void;
}

export abstract class WebsocketClient implements WebsocketClientInterface {
  protected observers: WebsocketClientObserver[] = [];
  constructor(protected readonly ws: WebSocket, protected websocket_server: WebsocketServer, protected readonly id: number, protected readonly server_name: string) {
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

  protected on_receive_message(msg: ClientMessage) {
    this.observers.forEach((observer) => {
      observer.receive_message(msg, this.id);
    });
  }

  protected on_close() {
    if (this.timeout_handle) clearTimeout(this.timeout_handle);
    this.observers.forEach((observer) => {
      observer.on_client_close(this.id);
    });

    // Sends a message to the server to log the closure
    this.websocket_server.log_client_close("Disconnected from " + this.server_name);
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

  public add_websocket_observer(new_observer: WebsocketClientObserver) {
    this.observers.push(new_observer);
  }
  public remove_websocket_observer(id: number) {
    this.observers = this.observers.filter((observer) => {
      return observer.id !== id;
    });
  }
}
