import { HasId } from "../../../model/utils/Id";
import { IClientTalker } from "./ClientTalker";
import { UserMap } from "./UserMap";
import { UserId } from "../../../model/user/UserData";
import { JsonParser } from "../jsonvalidation/JsonParser";
import { FailureMsg } from "../../../client/network/api/Failure";
import { SuccessMsg } from "../../../client/network/api/Success";

export abstract class User<UserMsg, ServerMsg> extends HasId {
  protected is_deconstructed: boolean = false;
  protected abstract json_parser: JsonParser<UserMsg>;

  constructor(
    private readonly client_talker: IClientTalker,
    private readonly user_map: UserMap<any>
  ) {
    super();
    this.client_talker.attach_observer(this);
  }

  public receive_message(json: string): boolean {
    try {
      const msg: UserMsg | undefined = this.json_parser.parse(json);
      if (msg) {
        this.process_message(msg);
        return true;
      }
    } catch (err) {
      console.error(err);
    }

    return false;
  }

  public abstract process_message(msg: UserMsg): void;

  public force_close() {
    let user = this.deconstruct();
    user.force_close();
  }

  public on_client_talker_close(id: UserId): void {
    this.user_map.disconnect_user(this.id);
    this.log_disconnection();
  }
  protected abstract log_disconnection(): void;

  protected send(data: ServerMsg) {
    if (this.is_deconstructed) {
      console.error("Tried to send to a deconstructed user wrapper");
    } else {
      this.client_talker.send(data);
    }
  }

  public deconstruct(): IClientTalker {
    this.is_deconstructed = true;
    this.client_talker.remove_observer();
    this.user_map.disconnect_user(this.id);

    return this.client_talker;
  }
}
