import WebSocket from "ws";
import {
  IMessageBuffer,
  MessageBuffer,
} from "../../../model/utils/MessageBuffer";
import { HasId, Id, uuid } from "../../../model/utils/Id";
import {
  IServerConfig,
  ServerConfig,
} from "../../../tools/server/server-config";
import { User } from "./User";
import { UserTimeout } from "./UserTimeout";

export interface IClientTalker extends HasId, IMessageBuffer<User<any, any>> {
  send: (data: any) => void;
  force_close(): void;
}

export class ClientTalker
  extends MessageBuffer<string, User<any, any>>
  implements IClientTalker
{
  private readonly user_timeout: UserTimeout | undefined = undefined;
  protected readonly config: IServerConfig;
  public readonly id: Id = uuid();

  constructor(protected readonly ws: WebSocket) {
    super();

    this.config = new ServerConfig().get();

    console.log("Connected to " + this.id);

    ws.on("message", (msg: string) => {
      this.on_receive_message(String(msg));
    });

    ws.onclose = () => this.on_close();

    if (this.config.user_timeout_limit) {
      this.user_timeout = new UserTimeout(
        this,
        this.id,
        this.config.user_timeout_limit
      );
    }
  }

  public send(data: any) {
    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error("ERROR: TRIED TO SEND TO A CLOSED WEBSOCKET");
      console.log("ERROR: TRIED TO SEND TO A CLOSED WEBSOCKET");
      console.log("Message:");
      console.log(data.toString());
    }
  }

  protected on_close() {
    this.user_timeout?.stop_timeout_timer();
    this.observer?.on_client_talker_close(this.id);
  }

  /* MESSAGE RECEIVING (mostly implemented in the MessageBuffer class) */
  protected process_message(msg: string, observer: User<any, any>): void {
    if (observer.receive_message(msg)) {
      this.user_timeout?.reset_timeout_timer();
    } else {
      this.force_close();
    }
  }

  public force_close(): void {
    this.ws.close();
  }
}
