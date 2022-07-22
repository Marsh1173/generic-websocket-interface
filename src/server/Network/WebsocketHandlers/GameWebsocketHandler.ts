import { ClientMessage } from "../../../model/Api/Api";
import { get_next_id } from "../../../model/Misc/GetNextId";
import { ServerAppInterface } from "../App";
import { AuthWebsocketClientInterface } from "../WebsocketClients/AuthWebsocketClient";
import { AuthenticatedWebsocketHandler } from "./WebsocketHandler";

export class GameWebsocket extends AuthenticatedWebsocketHandler {
    public receive_message = (msg: ClientMessage, client_id: number) => {

    }
    public on_client_close = (id: number) => {
        
    }

}

export class LoadingGameWebsocket extends AuthenticatedWebsocketHandler {
    
    private clients: Map<number, AuthWebsocketClientInterface> = new Map<number, AuthWebsocketClientInterface>();
    private ready_clients: Map<number, "unready" | "ready" | "disconnected"> = new Map<number,  "unready" | "ready" | "disconnected">();

    constructor(id: number, private readonly game_websocket_handler: GameWebsocketHandler, clients: AuthWebsocketClientInterface[]) {
        super(id);

        clients.forEach((client) => {
            this.add_client(client)
        });
    }

    public receive_message = (msg: ClientMessage, client_id: number) => {

        if (msg.type && msg.msg.type && msg.type === "ClientGameLoadingMessage") {
          let client:  AuthWebsocketClientInterface | undefined = this.clients.get(client_id);
          if (client) {
            if (msg.msg.type === "ClientGameReadyMessage") {
              this.on_client_ready(client);
            }
          }
        } else if (msg.type) {
          console.error("LoadingGameWebsocket received a message of type " + msg.type);
        }
    };

    public on_client_close = (id: number) =>  {
        this.clients.delete(id);
        if(this.ready_clients.has(id)) {
            this.ready_clients.set(id, "disconnected");
        }
    }

    public add_client(client: AuthWebsocketClientInterface) {
        this.clients.set(client.get_id(), client);
        this.ready_clients.set(client.get_id(), "unready");

        client.add_websocket_observer(this);

        client.send({
            type: "ServerGameLoadingMessage",
            msg: {
                type: "ServerGameDataMessage"
            }
        });
    }

    private on_client_ready(client: AuthWebsocketClientInterface) {
        this.ready_clients.set(client.get_id(), "ready");

        let if_ready: boolean = true;
        let if_all_disconnected: boolean = true;

        this.ready_clients.forEach((val) => {
            if(val === "unready") {
                if_ready = false;
            }
            if(val !== "disconnected") {
                if_all_disconnected = false;
            }
        });

        if(if_all_disconnected) {
            this.game_websocket_handler.delete_loading_game(this.id);
        } else if (if_ready) {
            this.on_all_clients_ready();
        }
    }

    private on_all_clients_ready() {

        this.clients.forEach((client) => {
            client.send({
                type: "ServerGameLoadingMessage",
                msg: {
                    type: "ServerGameReadyMessage",
                    time_stamp: Date.now(),
                }
            });
            client.remove_websocket_observer(this.id);
        });

        this.game_websocket_handler.start_game(this.id);
    }
}

export class GameWebsocketHandler {
    private readonly game_websocket_map: Map<number, GameWebsocket> = new Map<number, GameWebsocket>();
    private readonly loading_game_websocket_map: Map<number, LoadingGameWebsocket> = new Map<number, LoadingGameWebsocket>();
    
    constructor(private readonly server_app: ServerAppInterface) {}

    public start_loading_game(clients: AuthWebsocketClientInterface[]): LoadingGameWebsocket {
        let loading_game_id: number = get_next_id();
        let new_loading_game_websocket: LoadingGameWebsocket = new LoadingGameWebsocket(loading_game_id, this, clients);

        this.loading_game_websocket_map.set(loading_game_id, new_loading_game_websocket);

        return new_loading_game_websocket;
    }

    public start_game(loading_game_id: number) {
        this.loading_game_websocket_map.delete(loading_game_id);

        // Make game websocket
    }

    public delete_loading_game(loading_game_id: number) {
        this.loading_game_websocket_map.delete(loading_game_id);
    }
}