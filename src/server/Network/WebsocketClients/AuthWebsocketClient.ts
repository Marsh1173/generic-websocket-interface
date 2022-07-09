import { UserModel } from "../../Database/UserModel";
import { WebsocketClient, WebsocketClientInterface } from "./WebsocketClient";
import WebSocket from "ws";
import { WebsocketServer } from "../WebsocketHandlers/WebsocketServer";


export interface AuthWebsocketClientInterface extends WebsocketClientInterface {
    get_name: () => string;
}

export class AuthWebsocketClient extends WebsocketClient implements AuthWebsocketClientInterface {

    constructor(private readonly user_data: UserModel, ws: WebSocket, websocket_server: WebsocketServer) {
        super(ws, websocket_server, user_data.user_id, "user " + user_data.name);
    }

    public get_name(): string {
        return this.user_data.name;
    }
}