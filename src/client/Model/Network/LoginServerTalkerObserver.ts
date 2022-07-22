import { ServerMessage } from "../../../model/Api/Api";
import { ServerTalkerInterface, ServerTalkerObserverInterface } from "./ServerTalker";
import { get_next_id } from "../../../model/Misc/getNextId";

export class LoginServerTalkerObserver implements ServerTalkerObserverInterface {
    public readonly id: number;
    
    constructor() {
        this.id = get_next_id();
    }
    
    public receive_message = (msg: ServerMessage) => {
        console.log(msg);
    }
    public on_server_talker_close = () => {
        console.log("closed");
    }
}