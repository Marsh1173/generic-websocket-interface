import { IMessageBuffer, MessageBuffer } from "../../model/utils/MessageBuffer";
import { ClientConfig } from "../utils/ClientConfig";
import { ServerMessage } from "./api/ClientApi";
import { IClient } from "./Client";

export interface IServerTalker extends IMessageBuffer<IClient<any>> {
  send: (msg: any) => void;
  force_close: () => void;
}

export class ServerTalker
  extends MessageBuffer<string, IClient<any>>
  implements IServerTalker
{
  private wss: WebSocket;

  constructor(
    private readonly on_open: (server_talker: IServerTalker) => void
  ) {
    super();
    this.wss = this.open_websocket();
  }

  private open_websocket(): WebSocket {
    let wss: WebSocket = new WebSocket(new ClientConfig().get().ws_url());

    wss.onclose = (ev: CloseEvent) => {
      this.on_unable_to_connect();
    };

    wss.onopen = () => {
      console.log("Websocket connection succeeded");

      wss.onclose = (ev: CloseEvent) => {
        this.on_close();
      };

      wss.onerror = (error) => {
        console.error("WebSocket error:");
        console.error(error);
      };

      wss.onmessage = (msg: MessageEvent) => {
        try {
          this.on_receive_message(msg.data);
        } catch (err) {
          console.error(err);
        }
      };

      this.on_open(this);
      wss.onopen = () => {};
    };

    return wss;
  }

  public force_close() {
    this.wss.close();
  }

  private on_close() {
    console.error("Websocket connection closed");
    this.observer?.on_server_talker_close(
      "You have been disconnected. Try refreshing."
    );

    this.wss.onerror = () => {};
  }

  private on_unable_to_connect() {
    this.observer?.on_server_talker_close("Could not connect.");
  }

  /* MESSAGE SENDING */
  public send(msg: any) {
    if (this.wss.readyState === this.wss.OPEN) {
      this.wss.send(JSON.stringify(msg));
    } else {
      console.error("ERROR: TRIED TO SEND TO A CLOSED WEBSOCKET");
    }
  }

  /* MESSAGE RECEIVING (mostly implemented in the BufferedMessageReceiver class) */
  protected process_message(msg: string, observer: IClient<any>): void {
    try {
      let server_msg: ServerMessage = JSON.parse(msg) as ServerMessage;
      observer.receive_message(server_msg);
    } catch (e) {
      console.error("Error parsing server message:");
      console.error(e);
    }
  }
}
