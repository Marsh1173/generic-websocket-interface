import { ClientMessage } from "../../../model/Api/Api";
import { ServerAppInterface } from "../App";
import { AuthenticatedWebsocketHandler } from "./WebsocketHandler";

export class GameWebsocket extends AuthenticatedWebsocketHandler {
    public receive_message: (msg: ClientMessage, client_id: number) => void;
    public on_client_close: (id: number) => void;

}
export class LoadingGameWebsocket extends AuthenticatedWebsocketHandler {
    public receive_message: (msg: ClientMessage, client_id: number) => void;
    public on_client_close: (id: number) => void;

}

export class GameWebsocketHandler {
    private readonly game_websocket_map: Map<number, GameWebsocket> = new Map<number, GameWebsocket>();
    private readonly loading_game_websocket_map: Map<number, LoadingGameWebsocket> = new Map<number, LoadingGameWebsocket>();
    
    constructor(private readonly server_app: ServerAppInterface) {}
}