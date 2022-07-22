import { ServerMessage, ClientMessage } from "../../../model/Api/Api";
import { GLOBAL_INFO } from "../Caches/GlobalInfo";

export interface ServerTalkerObserverInterface {
    readonly id: number;
    receive_message: (msg: ServerMessage) => void;
    on_server_talker_close: () => void;
    on_server_talker_open?: (server_talker: ServerTalkerInterface) => void;
}

export interface ServerTalkerInterface {
  send: (msg: ClientMessage) => void;
  close: () => void;
  add_server_talker_observer: (new_observer: ServerTalkerObserverInterface) => void;
  remove_server_talker_observer: (id: number) => void;
}

export class ServerTalker implements ServerTalkerInterface {
  private readonly wss: WebSocket;
  private observers: ServerTalkerObserverInterface[] = [];

  constructor(observers: ServerTalkerObserverInterface[] = []) {

    observers.forEach((observer) => {
      this.add_server_talker_observer(observer);
    })

    this.wss = new WebSocket(GLOBAL_INFO.url);

    this.wss.onmessage = (msg: MessageEvent) => {
      this.on_receive_message(JSON.parse(msg.data));
    };

    this.wss.onerror = (error) => {
      console.error("WebSocket error:");
      console.error(error);
    };
    this.wss.onopen = () => {
      console.log("Websocket connection succeeded");
      this.observers.forEach((observer) => {
        if(observer.on_server_talker_open) {
          observer.on_server_talker_open(this);
        }
      });

    };
    this.wss.onclose = () => {
        this.on_close();
    };
  }

  public send(msg: ClientMessage) {
    if(this.wss.readyState === this.wss.OPEN) {
        this.wss.send(JSON.stringify(msg));
    } else {
        console.error("ERROR: TRIED TO SEND TO A CLOSED WEBSOCKET");
    }
  }

  public close() {
    this.wss.close();
  }

  private on_close() {
    console.error("Websocket connection closed");
    this.observers.forEach((observer) => {
        observer.on_server_talker_close();
    });
  }

  private on_receive_message(msg: ServerMessage) {
    this.observers.forEach((observer) => {
        observer.receive_message(msg);
    });
  }

  public add_server_talker_observer(new_observer: ServerTalkerObserverInterface) {
    this.observers.push(new_observer);
  }
  public remove_server_talker_observer(id: number) {
    this.observers = this.observers.filter((observer) => {
      return observer.id !== id;
    });
  }
}
