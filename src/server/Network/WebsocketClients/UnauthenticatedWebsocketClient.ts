import { WebsocketServer } from "../WebsocketHandlers/WebsocketServer";
import { WebsocketClient, WebsocketClientInterface } from "./WebsocketClient";
import WebSocket from "ws";

export interface UnauthenticatedWebsocketClientInterface extends WebsocketClientInterface {
    get_websocket: () => WebSocket;
}

export class UnauthenticatedWebsocketClient extends WebsocketClient implements UnauthenticatedWebsocketClientInterface {

    constructor(ws: WebSocket, websocket_server: WebsocketServer, id: number) {
        super(ws, websocket_server, id, "unathenticated client " + id);
    }

    public get_websocket(): WebSocket {
        return this.ws;
    }

}