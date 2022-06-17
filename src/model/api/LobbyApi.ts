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
  is_host: boolean;
}

export interface ServerLobbyMessage {
  type: "ServerLobbyMessage";
}
export interface ClientLobbyMessage {
  type: "ClientLobbyMessage";
}
