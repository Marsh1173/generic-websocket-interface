import { LobbyInformation } from "./LobbyApi";


export interface ClientJoinLobby {
    type: "ClientJoinLobby";
    lobby_id: number;
}
export interface ClientCreateLobby {
    type: "ClientCreateLobby";
}
  
export interface ServerAddClientToLobby {
    type: "ServerAddClientToLobby";
    lobby: LobbyInformation;
}
export interface ServerErrorAddClientToLobby {
    type: "ServerErrorAddClientToLobby";
    msg: string;
}
  
export interface ServerBrowserMessage {
    type: "ServerBrowserMessage";
    msg: ServerAddClientToLobby | ServerErrorAddClientToLobby;
}
export interface ClientBrowserMessage {
    type: "ClientBrowserMessage";
    msg: ClientJoinLobby | ClientCreateLobby;
}
  