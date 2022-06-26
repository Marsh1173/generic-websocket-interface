import { LobbyInformation } from "./LobbyApi";

export interface ClientAuthHandshakeInformation {
  type: "ClientAuthHandshakeInformation";
  name: string;
}
export interface ServerAuthHandshakeInformation {
  type: "ServerAuthHandshakeInformation";
  id: number;
}

export interface ServerAuthMessage {
  type: "ServerAuthMessage";
  msg: ServerAuthHandshakeInformation;
}
export interface ClientAuthMessage {
  type: "ClientAuthMessage";
  msg: ClientAuthHandshakeInformation;
}

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

export interface ServerBrowserMessage {
  type: "ServerBrowserMessage";
  msg: ServerAddClientToLobby;
}
export interface ClientBrowserMessage {
  type: "ClientBrowserMessage";
  msg: ClientJoinLobby | ClientCreateLobby;
}
