import { ServerMessage } from "../../../model/Api/Api";
import { ServerTalkerObserverInterface } from "./ServerTalker";

export abstract class ServerTalkerObserver implements ServerTalkerObserverInterface {
    constructor(public readonly id: number) {

    }
    
    public receive_message = (msg: ServerMessage) => {

    }
    public on_server_talker_close = () => {

    }
}