import { ClientAuthMessage, ServerAuthMessage } from "./AuthApi";
import { ClientLobbyMessage, ServerLobbyMessage } from "./LobbyApi";

export type ServerMessage = ServerLobbyMessage | ServerAuthMessage;
export type ClientMessage = ClientLobbyMessage | ClientAuthMessage;
