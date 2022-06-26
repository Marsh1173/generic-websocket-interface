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
  id: number;
  name: string;
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

export interface ServerLobbyMessage {
  type: "ServerLobbyMessage";
  msg: ServerUpdateClientLobbyInformation | ServerMoveClientToBrowser;
}
export interface ClientLobbyMessage {
  type: "ClientLobbyMessage";
  msg: ClientLeaveLobby | ClientStartGame;
}
