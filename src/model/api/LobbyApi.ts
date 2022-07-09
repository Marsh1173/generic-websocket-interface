import { UserModel } from "../../server/Database/UserModel";

export interface LobbyListInformation {
  lobbies: { name: string; player_count: number; id: number }[];
}

export interface LobbyInformation {
  id: number;
  name: string;
  host_id: number;
  players: LobbyPlayerInformation[];
}

export interface LobbyPlayerInformation {
  name: string,
  id: number,
}

export interface ClientLeaveLobby {
  type: "ClientLeaveLobby";
}
export interface ClientStartGame {
  type: "ClientStartGame";
}

export interface ServerUpdateClientLobbyInformation {
  type: "ServerUpdateClientLobbyInformation";
  lobby: LobbyInformation;
}

export interface ServerMoveClientToBrowser {
  type: "ServerMoveClientToBrowser";
}

export interface ServerLobbyError {
  type: "ServerLobbyError";
  msg: string;
}

export interface ServerLobbyMessage {
  type: "ServerLobbyMessage";
  msg: ServerUpdateClientLobbyInformation | ServerMoveClientToBrowser | ServerLobbyError;
}
export interface ClientLobbyMessage {
  type: "ClientLobbyMessage";
  msg: ClientLeaveLobby | ClientStartGame;
}
