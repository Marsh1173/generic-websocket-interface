import { ServerApp } from "../App";

export class GameWebsocket {

}

export class GameWebsocketHandler {
    private readonly lobby_websocket_map: Map<number, GameWebsocket> = new Map<number, GameWebsocket>();
    
    constructor(private readonly server_app: ServerApp) {}
}