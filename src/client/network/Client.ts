import { IServerTalker } from "./ServerTalker";
import { ServerMessage } from "./api/ClientApi";
import { FailureMsg } from "./api/Failure";
import { SuccessMsg } from "./api/Success";
import { ViewChanger } from "../main/ViewChanger";
import { GrowlService } from "../growl/GrowlService";

export interface IClient<ServerMsg> {
  receive_message: (msg: ServerMsg) => void;
  on_server_talker_close: (msg: string) => void;
  deconstruct(): IServerTalker;
}

export abstract class Client<UserMsg, ServerMsg> implements IClient<ServerMsg> {
  protected is_deconstructed: boolean = false;
  private readonly view_changer: ViewChanger = new ViewChanger();
  private readonly growler: GrowlService = new GrowlService();

  constructor(private readonly server_talker: IServerTalker) {
    this.server_talker.attach_observer(this);
  }

  public abstract receive_message(msg: ServerMsg): void;

  public on_server_talker_close(msg: string): void {
    this.view_changer.change_state_to_disconnected(msg);
  }

  protected send(msg: UserMsg) {
    if (this.is_deconstructed) {
      console.error("Tried to send to a deconstructed server talker");
    } else {
      this.server_talker.send(msg);
    }
  }

  public deconstruct(): IServerTalker {
    this.is_deconstructed = true;
    this.server_talker.remove_observer();

    return this.server_talker;
  }
}
